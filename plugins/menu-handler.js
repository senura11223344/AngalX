const { cmd } = require('../command');

cmd({
  pattern: "*",
  react: "✅",
  desc: "Handle plain number replies to menu",
  category: "system",
  filename: __filename
},
async (conn, mek, m, {
  body, quoted, reply
}) => {
  try {
    // Check if it's a reply to a message and that message had an image (menu)
    if (!quoted || !quoted.message || !quoted.message.imageMessage) return;

    const msg = body.trim();

    // Only match plain numbers
    if (!/^[1-6]$/.test(msg)) return;

    switch (msg) {
      case "1":
        return reply(`📘 *Main Commands:*\n\n• .menu\n• .ping\n• .help\n• .runtime`);
      case "2":
        return reply(`👥 *Group Commands:*\n\n• .add\n• .kick\n• .promote\n• .demote`);
      case "3":
        return reply(`🎬 *Movie Commands:*\n\n• .movie\n• .tvshow\n• .trailer`);
      case "4":
        return reply(`📥 *Download Commands:*\n\n• .ytmp3\n• .ytmp4\n• .fb`);
      case "5":
        return reply(`🔄 *Convert Commands:*\n\n• .toimg\n• .sticker\n• .tomp3`);
      case "6":
        return reply(`🤖 *AI Commands:*\n\n• .ai\n• .gpt\n• .img2txt`);
    }

  } catch (err) {
    console.log(err);
    reply("❌ Error handling menu reply.");
  }
});
