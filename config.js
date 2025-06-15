const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "6ZUy1D5R#rxVn7v9QpCCk0e0WzItxoSIVCgf-4kXdOIRtu-8Iass",
ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/Thinura-Nethz/AngalX-Helper/refs/heads/main/ChatGPT%20Image%20Jun%2015%2C%202025%2C%2004_55_04%20PM.png?token=GHSAT0AAAAAADEHELJS7IVTOVR5WUNBVU2C2COVYQQ",
ALIVE_MSG: process.env.ALIVE_MSG || "Hey, I'm Angal-X Multi-Deveice (MD) Whatsapp Bot.. Now I'm Alive And Ready To Assist You😘",
};
