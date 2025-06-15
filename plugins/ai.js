const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "ai",
    desc: "ai chat.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q,
    isGroup, sender, senderNumber, botNumber2, botNumber,
    pushname, isMe, isOwner, groupMetadata, groupName,
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("❌ Please provide a prompt.");

        // Replace with your actual AI endpoint
        let data = await fetchJson(`https://api.example.com/ai?query=${encodeURIComponent(q)}`);

        // Assuming response is { result: "some text" }
        if (data?.result) {
            reply(data.result);
        } else {
            reply("⚠️ No response from AI.");
        }

    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message || e}`);
    }
});
