const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "menu",
  react: "📜",
  desc: "Get Menu.",
  category: "main",
  filename: __filename,
},
async (conn, mek, m, {
  from, sender, reply
}) => {
  try {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    const total = process.memoryUsage().heapTotal / 1024 / 1024;

    const menuText = `*📜 ANGLE-X - BOT MENU*

> *Uptime:* ${hours}h ${minutes}m ${seconds}s
> *RAM Usage:* ${used.toFixed(2)}MB / ${total.toFixed(2)}MB
> *Platform:* Replit
> *Version:* 1.0.0

Now you can buy not only movies but everything else from this WhatsApp bot.

📢 *Official Group*: https://chat.whatsapp.com/DgkRi449IO565xc2UZGcvA  
📦 *Repo*: not connected

*All Commands📘*

1️⃣ || *Main Commands*
     • .alive
     • .menu
     • .system
     • .restart

2️⃣ || *Group Commands*  
    • not installed
    • not installed
    • not installed
    • not installed
    
3️⃣ || *Movie Commands* 
    • .movie
    • .tv
    • not installed
    • not installed
      
4️⃣ || *Download Commands* 
    • .song
    • .video
    • .fb
    • .tiktok
    • .insta
    • not installed
    
5️⃣ || *Convert Commands* 
    • not installed
    • not installed
    • not installed
    • not installed


6️⃣ || *AI Commands*
    • .ai


*|• ANGLE-X WH BOT ® •*`;

    await conn.sendMessage(from, {
      image: { url: 'https://raw.githubusercontent.com/Thinura-Nethz/HELP/refs/heads/main/ChatGPT%20Image%20Jun%2015%2C%202025%2C%2004_55_04%20PM.png' },
      caption: menuText,
      footer: 'Reply with number (e.g., 1)',
      contextInfo: {
        mentionedJid: [sender],
        externalAdReply: {
          title: 'ANGLE-X WH BOT',
          body: 'Multi-Device WhatsApp Bot',
          thumbnailUrl: 'https://raw.githubusercontent.com/Thinura-Nethz/HELP/refs/heads/main/ChatGPT%20Image%20Jun%2015%2C%202025%2C%2004_55_04%20PM.png',
          sourceUrl: 'not connected',
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});
