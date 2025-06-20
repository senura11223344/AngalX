const { cmd } = require('../command');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const fs = require('fs');
const path = require('path');

cmd({
  pattern: "song",
  react: "🎵",
  desc: "Search and download songs from YouTube",
  category: "download",
  filename: __filename
},
async (conn, mek, m, { args, reply, from, q }) => {
  try {
    const query = q || args.join(" ");
    if (!query) return reply("🎵 Send a song name or YouTube URL.");

    let url = query;

    // 🔍 Search on YouTube if it's not a link
    if (!query.includes("youtube.com") && !query.includes("youtu.be")) {
      reply(`🔍 Searching for "${query}"...`);
      const searchResults = await ytsr(query, { limit: 1 });
      if (!searchResults.items.length) return reply("❌ Song not found.");
      url = searchResults.items[0].url;
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const channel = info.videoDetails.author.name;
    const views = info.videoDetails.viewCount;
    const duration = info.videoDetails.lengthSeconds;
    const thumb = info.videoDetails.thumbnails?.[info.videoDetails.thumbnails.length - 1]?.url;

    const mins = Math.floor(duration / 60);
    const secs = duration % 60;

    // 📝 Send Song Card
    await conn.sendMessage(from, {
      image: { url: thumb },
      caption: `🎶 *${title}*

📺 Channel: ${channel}
⏱ Duration: ${mins}:${secs.toString().padStart(2, '0')}
👁️ Views: ${Number(views).toLocaleString()}
🔗 Link: ${url}`
    }, { quoted: mek });

    // 🎧 Download MP3
    const safeTitle = title.replace(/[^\w\s]/gi, "").substring(0, 30);
    const filePath = path.resolve(__dirname, `../temp/${safeTitle}.mp3`);

    if (!fs.existsSync(path.resolve(__dirname, '../temp'))) {
      fs.mkdirSync(path.resolve(__dirname, '../temp'));
    }

    const stream = ytdl(url, { filter: 'audioonly' });
    const file = fs.createWriteStream(filePath);
    stream.pipe(file);

    file.on('finish', async () => {
      await conn.sendMessage(from, {
        document: fs.readFileSync(filePath),
        mimetype: 'audio/mpeg',
        fileName: `${safeTitle}.mp3`
      }, { quoted: mek });

      fs.unlinkSync(filePath); // 🧹 Clean temp file
    });

  } catch (err) {
    console.log(err);
    reply("❌ Failed to download the song.");
  }
});
