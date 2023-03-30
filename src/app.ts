import { App } from "@slack/bolt";
import { config } from "dotenv";

import {
  handleSkillsCommand,
  handleSkillEntryFormViewSubmission,
} from "./triggers";
import { SKILLS_FORM_VIEW_ID } from "./views";

config();

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.command("/skills", handleSkillsCommand);
app.view(SKILLS_FORM_VIEW_ID, handleSkillEntryFormViewSubmission);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
