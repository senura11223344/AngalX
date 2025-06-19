const { cmd } = require('../command');

cmd({
  pattern: ".*",
  react: "✅",
  desc: "Handle Menu Replies",
  category: "system",
  filename: __filename
},
async (conn, mek, m, {
  body, from, reply, quoted
}) => {
  try {
    if (!quoted || !quoted.message || !quoted.message.imageMessage) return;

    switch (body.trim()) {
      case "1":
        return reply(`📘 *Main Commands:*\n• .menu\n• .help\n• .ping`);
      case "2":
        return reply(`👥 *Group Commands:*\n• .kick\n• .add\n• .promote\n• .demote`);
      case "3":
        return reply(`🎬 *Movie Commands:*\n• .movie\n• .tvsearch\n• .trailer`);
      case "4":
        return reply(`📥 *Download Commands:*\n• .ytmp3\n• .ytmp4\n• .fb`);
      case "5":
        return reply(`🔄 *Convert Commands:*\n• .toimg\n• .tomp3\n• .tovideo`);
      case "6":
        return reply(`🤖 *AI Commands:*\n• .ai\n• .gpt\n• .img2txt`);
      default:
        break;
    }
  } catch (err) {
    console.log(err);
    reply(`❌ Error: ${err}`);
  }
});
