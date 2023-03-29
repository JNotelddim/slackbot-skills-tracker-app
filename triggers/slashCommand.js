const { axios } = require("../utils/axios");
const { skillEntryFormView } = require("../views/skillEntryForm");
const { formatSkillsListResult } = require("../utils/formatSkillsListResult");
const { formatTagSearchResults } = require("../utils/formatTagSearchResults");

/**
 * `/skills add` - present the skills entry modal for the user to fill out.
 */
const handleSkillsAdd = async (client, body) => {
  try {
    result = await client.views.open({
      trigger_id: body.trigger_id,
      view: skillEntryFormView,
    });
  } catch (e) {
    console.log(e);
  }
  return result;
};

/**
 * `/skills list` - fetch the user's historical entries and display them.
 */
const handleSkillsList = async (client, body) => {
  const user = body["user_id"];

  try {
    const resp = await axios.get(`/items?userId=${user}`);
    const { data } = resp;
    const response = formatSkillsListResult(data.data);

    await client.chat.postMessage({
      channel: user,
      ...response,
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * `/skills search` - fetch all entries associated with the requested tags
 */
const handleSkillsSearch = async (client, body) => {
  const user = body.user_id;
  const searchText = body.text.split(" ").slice(1).join(",");

  try {
    const resp = await axios.get(`/search?tags=${searchText}`);
    const { data } = resp;

    const response = formatTagSearchResults(data.data);

    await client.chat.postMessage({
      channel: user,
      ...response,
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * `/skills ...` slash-command root handler.
 * There are sub-functions from here because there are various supported args.
 * Eventually, the intended list of supported first args will be:
 * [`add`, `list`, `nudge`, `search`, `help`], but for now, just start simple.
 */
// const handleSkillsCommand = async ({ command, ack, respond }) => {
const handleSkillsCommand = async ({ ack, body, client, logger }) => {
  await ack();

  const parsedBody = JSON.parse(JSON.stringify(body));
  const splitArgs = parsedBody.text.length ? parsedBody.text.split(" ") : [""];
  const firstArg = splitArgs[0];

  switch (firstArg) {
    case "add":
      handleSkillsAdd(client, parsedBody);
      break;
    case "list":
      handleSkillsList(client, parsedBody);
      break;
    case "search":
      handleSkillsSearch(client, parsedBody);
      break;
    default:
      result =
        "Arg not recognized, did you mean to use one of these: 'add', 'list', 'search'?";
      break;
  }
};

module.exports = {
  handleSkillsCommand,
};
