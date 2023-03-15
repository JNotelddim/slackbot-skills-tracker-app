const { skillEntryFormView } = require("../views/skillEntryForm");
const { formatSkillsListResult } = require("../utils/formatSkillsListResult");

/**
 * `/skills add` - present the skills entry modal for the user to fill out.
 */
const handleSkillsAdd = async (client, body) => {
  let result;
  try {
    // Call views.open with the built-in client
    result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: skillEntryFormView,
    });

    result = "Thanks for submitting your entry!";
  } catch (e) {
    console.log(e);
    result =
      "Sorry, something went wrong. Please try again or contact an administrator.";
  }

  return result;
};

/**
 * `/skills list` - fetch the user's historical entries and display them.
 */
const handleSkillsList = async (client, body) => {
  let result;
  const user = body["user_id"];

  try {
    //TODO: fetch list
    result = [
      {
        id: "1",
        title: "Example Entry",
        description:
          "This is an example entry, it would be the most recently created based on the ordering.",
        startDate: "2023-03-01",
        endDate: undefined,
        tags: ["react", "javascript", "nodejs", "communication"],
        createdAt: "2023-03-15",
      },
    ];

    response = formatSkillsListResult(result);

    await client.chat.postMessage({
      channel: user,
      ...response,
    });
  } catch (e) {
    // logger.
    console.log(e);
  }
};

/**
 * `/skills ...` slash-command root handler.
 * There are sub-functions from here because there are various supported args.
 * Eventually, the intended list of supported first args will be:
 * []`add`, `list`, `nudge`, `search`, `help`], but for now, just start simple.
 */
// const handleSkillsCommand = async ({ command, ack, respond }) => {
const handleSkillsCommand = async ({ ack, body, client, logger }) => {
  await ack();

  const parsedBody = JSON.parse(JSON.stringify(body));
  // console.log({ parsedBody });

  switch (parsedBody.text) {
    case "add":
      handleSkillsAdd(client, parsedBody);
      break;
    case "list":
      handleSkillsList(client, parsedBody);
      break;
    default:
      result =
        "Arg not recognized, did you mean to use one of these: ['add', 'list']?";
      break;
  }
};

module.exports = {
  handleSkillsCommand,
};
