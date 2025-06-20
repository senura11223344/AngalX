
const { cmd } = require('../command');
const play = require('play-dl');
const fs = require('fs');
const path = require('path');

cmd({
  pattern: "song",
  react: "🎵"
  desc: "Download YouTube songs with play-dl",
  category: "download",
  filename: __filename
},
async (conn, mek, m, { args, reply, from, q }) => {
  try {
    const query = q || args.join(" ");
    if (!query) return reply("🎵 Send a song name or YouTube URL.");

    let video;

    // 🔍 Search if not a URL
    if (!query.includes("youtube.com") && !query.includes("youtu.be")) {
      reply(`🔍 Searching for "${query}"...`);
      const results = await play.search(query, { limit: 1 });
      if (!results.length) return reply("❌ Song not found.");
      video = results[0];
    } else {
      const result = await play.video_basic_info(query);
      video = result.video_details;
    }

    // 🔗 Download audio
    const stream = await play.stream(video.url);
    const title = video.title.replace(/[^\w\s]/gi, "").substring(0, 30);
    const filePath = path.resolve(__dirname, `../temp/${title}.mp3`);

    if (!fs.existsSync(path.resolve(__dirname, '../temp'))) {
      fs.mkdirSync(path.resolve(__dirname, '../temp'));
    }

    const file = fs.createWriteStream(filePath);
    stream.stream.pipe(file);

    file.on('finish', async () => {
      // 📝 Send card
      await conn.sendMessage(from, {
        image: { url: video.thumbnails[0].url },
        caption: `🎶 *${video.title}*\n\n📺 Channel: ${video.channel.name}\n🔗 Link: ${video.url}`
      }, { quoted: mek });

      // 📩 Send MP3
      await conn.sendMessage(from, {
        document: fs.readFileSync(filePath),
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`
      }, { quoted: mek });

      fs.unlinkSync(filePath); // cleanup
    });

  } catch (err) {
    console.log(err);
    reply("❌ Failed to download the song.");
  }
});
