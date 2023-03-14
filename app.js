import { App } from "@slack/bolt";
import { skillsEntryLogModalView } from "./views/skillsEntryLogModal";
import { handleAppHomeOpened } from "./listener/appHomeOpened";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// All the room in the world for your code
app.event("app_home_opened", handleAppHomeOpened);

app.command("/skills", async ({ ack, payload, context }) => {
  // Acknowledge the command request
  ack();

  try {
    const result = await app.client.views.open({
      token: context.botToken,
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: payload.trigger_id,
      // View payload
      view: skillsEntryLogModalView,
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 8000);
  console.log("⚡️ Bolt app is running!");
})();
