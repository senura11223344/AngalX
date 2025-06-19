const { cmd } = require('../command');

cmd({
  pattern: ".*",
  react: "✅",
  desc: "Handle Menu Replies (Only plain numbers)",
  category: "system",
  filename: __filename
},
async (conn, mek, m, {
  body, quoted, reply
}) => {
  try {
    // Check if this message is a reply to a menu message
    if (!quoted || !quoted.message) return;

    const caption = quoted.message?.imageMessage?.caption || quoted.message?.extendedTextMessage?.text || "";
    if (!caption.includes("ANGLE-X - BOT MENU")) return;

    // Get clean number from message body
    const msg = body.trim();

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

      default:
        return; // Do nothing for invalid input
    }

  } catch (err) {
    console.log(err);
    reply("❌ Error handling menu reply.");
  }
});
