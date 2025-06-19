const { cmd } = require('../command');
const { getUptime, formatRAM } = require('../lib/functions');

cmd({
  pattern: 'menu',
  react: "📜"
  desc: 'Bot menu and commands list',
  category: 'main',
  filename: __filename,
}, async (conn, m) => {
  const uptime = await getUptime(); // Get bot uptime
  const ramUsage = formatRAM();     // Get RAM usage (optional)
  const platform = 'Replit';        // You can dynamically detect it if needed
  const version = '1.0.0';          // Your bot version

  const menu = `*☺ ANGLE-X - WH BOT MENU 👇*

> Uptime: ${uptime}
> RAM Usage: ${ramUsage}
> Platform: ${platform}
> Version: ${version}
> Owner: 🔒

📌 Now you can access not only fun but powerful tools from this WhatsApp bot.

📢 Official Group: https://chat.whatsapp.com/DgkRi449IO565xc2UZGcvA 
📦 Repo: not connected

Reply with a number to view command category 📘

1️⃣ || Main Commands  
2️⃣ || Group Commands  
3️⃣ || Movie Commands  
4️⃣ || Download Commands  
5️⃣ || Convert Commands   

*• ANGLE-X MENU •*`;

  await conn.sendMessage(m.from, {
    image: { url: 'https://raw.githubusercontent.com/Thinura-Nethz/HELP/refs/heads/main/ChatGPT%20Image%20Jun%2015%2C%202025%2C%2004_55_04%20PM.png' }, // Optional menu image
    caption: menu,
  }, { quoted: m });
});
