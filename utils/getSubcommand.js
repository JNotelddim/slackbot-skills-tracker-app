/**
 * Gets the word after the `/skills` command, and returns it.
 * (ie, 'add' or 'list')
 */
const getSubcommandFromCommand = (command) => {
  if (!command || !command.text || !command.text.length) {
    return undefined;
  }

  const words = command.text.split(" ");

  const subcommand = words[0];
  return subcommand;
};

module.exports = {
  getSubcommandFromCommand,
};
