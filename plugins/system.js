const config = require('../config');
const { cmd, commands } = require('../command');
const os = require('os');

// Convert uptime to readable format
function formatRuntime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h} hours, ${m} minutes, ${s} seconds`;
}

cmd({
  pattern: "system",
  react:"📲",
  alias: ["status"],
  desc: "Check System Uptime, RAM Usage, CPU Info, and Host Info",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
  from, reply
}) => {
  try {
    const totalMem = os.totalmem() / 1024 / 1024;
    const usedMem = process.memoryUsage().heapUsed / 1024 / 1024;
    const cpuModel = os.cpus()[0].model;

    let status = `
 ───────────────────────
 ♠ *AngalX System Status* ♠ 
 ───────────────────────
│ ⏳ *System Uptime:* ${formatRuntime(process.uptime())}
│ 🗂 *RAM Useage:* ${usedMem.toFixed(2)}MB / ${totalMem.toFixed(0)}MB
│ 🧠 *CPU Type*: ${cpuModel}
│ ⚙ *Host:* ${os.hostname()}
│ ♦ *Owner:* Thinura_Nethz
 
`.trim();

    return reply(status);
  } catch (e) {
    console.error(e);
    return reply("❌ Error: " + e.message);
  }
});
