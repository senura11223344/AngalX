const { cmd } = require('../command');

cmd({
  pattern: "1",
  react: false,
  desc: "Reply handler for menu option 1",
  category: "system",
  filename: __filename
},
async (conn, mek, m, { body, quoted, reply }) => {
  try {
    if (
      !quoted || !quoted.message ||
      !quoted.message.imageMessage || !quoted.message.imageMessage.caption
    ) return;

    const caption = quoted.message.imageMessage.caption;
    if (!caption.includes("ANGLE-X - BOT MENU")) return;

    return reply(`📘 *Main Commands:*\n\n• .menu\n• .ping\n• .help\n• .system`);
  } catch (e) {
    console.log(e);
  }
});
