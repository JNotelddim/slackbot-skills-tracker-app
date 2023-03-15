const { App } = require("@slack/bolt");
require("dotenv").config();

const { handleSkillsCommand } = require("./triggers/slashCommand");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.command("/skills", handleSkillsCommand);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
