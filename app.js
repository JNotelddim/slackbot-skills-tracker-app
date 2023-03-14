const { App, AwsLambdaReceiver } = require("@slack/bolt");

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
app.command("/skills", handleSkillsCommand);
app.action("button_click", handleButtonClick);
app.message("goodbye", handleGoodbye);

module.exports.handler = async (event, context, callback) => {
  console.log("lambda boltjs handler running");
  console.log({ event });
  console.log({ context });
  console.log({ callback });
  const lambdaHandler = await awsLambdaReceiver.start();
  return lambdaHandler(event, context, callback);
};

/** HANDLER FUNCTIONS **/

const handleAppHomeOpened = async ({ event, client, context }) => {
  try {
    /* view.publish is the method that your app uses to push a view to the Home tab */
    const result = await client.views.publish({
      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view: {
        type: "home",
        callback_id: "home_view",

        /* body of the view */
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Welcome to your _App's Home_* :tada:",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app.",
            },
          },
          {
            type: "actions",
            elements: [
              {
                action_id: "button_click",
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Click me!",
                },
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const handleButtonClick = async ({ body, ack, say }) => {
  await ack();

  await say(`<@${body.user.id}> clicked the button`);
};

const handleSkillsCommand = async ({ ack, payload, context }) => {
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
};

const skillsEntryLogModalView = {
  type: "modal",
  // View identifier
  callback_id: "skills_entry_log_modal",
  title: {
    type: "plain_text",
    text: "Modal title",
  },
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Welcome to a modal with _blocks_",
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "Click me!",
        },
        action_id: "button_click",
      },
    },
    {
      type: "input",
      block_id: "test_input",
      label: {
        type: "plain_text",
        text: "What are your hopes and dreams?",
      },
      element: {
        type: "plain_text_input",
        action_id: "dreamy_input",
        multiline: true,
      },
    },
  ],
  submit: {
    type: "plain_text",
    text: "Submit",
  },
};

const handleGoodbye = async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`See ya later, <@${message.user}> :wave:`);
};
