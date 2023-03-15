const { getSubcommandFromCommand } = require("../utils/getSubcommand");

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
      result = "opening a modal.";
      break;
    case "list":
      result = "displaying a list.";
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
