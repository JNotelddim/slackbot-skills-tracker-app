const { skillEntryFormView } = require("../views/skillEntryForm");

/**
 * When the user enters `/skills add`, we want to offer them the log entry modal.
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
 * To start, I'll just support `/skills add` and `/skills list`.
 * Any of the other intended supported commands (`nudge`, `search`, `help`)
 * will come later.
 */
// const handleSkillsCommand = async ({ command, ack, respond }) => {
const handleSkillsCommand = async ({ ack, body, client, logger }) => {
  await ack();

  const parsedBody = JSON.parse(JSON.stringify(body));
  console.log({ parsedBody });

  switch (parsedBody.text) {
    case "add":
      result = handleSkillsAdd(client, parsedBody);
      break;
    case "list":
      result = "Displaying a list.";
      break;
    default:
      result =
        "Arg not recognized, did you mean to use one of these: ['add', 'list']?";
      break;
  }

  // await respond(`${result}`);
};

module.exports = {
  handleSkillsCommand,
};
