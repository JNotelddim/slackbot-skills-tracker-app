import { App } from "@slack/bolt";
import { config } from "dotenv";
config();

import {
  handleSkillsCommand,
  handleSkillEntryFormViewSubmission,
} from "./triggers";
import { handleTagsListNextPage } from "./triggers/actions";
import {
  SKILLS_FORM_VIEW_ID,
  TAGS_LIST_FIRST_PAGE_BTN,
  TAGS_LIST_NEXT_PAGE_BTN,
} from "./views";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.command("/skills", handleSkillsCommand);
app.view(SKILLS_FORM_VIEW_ID, handleSkillEntryFormViewSubmission);
app.action(TAGS_LIST_NEXT_PAGE_BTN, handleTagsListNextPage);
app.action(TAGS_LIST_FIRST_PAGE_BTN, handleTagsListNextPage);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
