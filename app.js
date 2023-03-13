const { App, AwsLambdaReceiver } = require("@slack/bolt");
const { skillsEntryLogModalView } = require("./views/skillsEntryLogModal");
const { handleAppHomeOpened } = require("./listener/appHomeOpened");
const { handleButtonClicked } = require("./actions/buttonClick");

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,

  receiver: awsLambdaReceiver,
  // When using the AwsLambdaReceiver, processBeforeResponse can be omitted.
  // If you use other Receivers, such as ExpressReceiver for OAuth flow support
  // then processBeforeResponse: true is required. This option will defer sending back
  // the acknowledgement until after your handler has run to ensure your handler
  // isn't terminated early by responding to the HTTP request that triggered it.

  // processBeforeResponse: true
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

// Listens for an action from a button click
app.action("button_click", handleButtonClicked);

// Listens to incoming messages that contain "goodbye"
app.message("goodbye", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`See ya later, <@${message.user}> :wave:`);
});

module.exports.handler = async (event, context, callback) => {
  const lambdaHandler = await awsLambdaReceiver.start();
  return lambdaHandler(event, context, callback);
};
