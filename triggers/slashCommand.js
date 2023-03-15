const { getSubcommandFromCommand } = require("../utils/getSubcommand");
const { skillEntryForm } = require("../views/skillEntryForm");

/**
 * When the user enters `/skills add`, we want to offer them the log entry modal.
 */
const handleSkillsAdd = async ({ command }) => {
  let result;
  try {
    // Call views.open with the built-in client
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: skillEntryForm,
    });

    console.log({ result });
    console.log({ command });

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
const handleSkillsCommand = async ({ command, ack, respond }) => {
  await ack();

  const subcommand = getSubcommandFromCommand(command);
  let result;

  switch (subcommand) {
    case "add":
      result = handleSkillsAdd({ command });
      break;
    case "list":
      result = "Displaying a list.";
      break;
    default:
      result =
        "Arg not recognized, did you mean to use one of these: ['add', 'list']?";
      break;
  }

  await respond(`${result}`);
};

module.exports = {
  handleSkillsCommand,
};
