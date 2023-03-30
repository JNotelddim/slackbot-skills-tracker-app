import {
  Middleware,
  SlackCommandMiddlewareArgs,
  SlashCommand,
} from "@slack/bolt";
import { WebClient } from "@slack/web-api";

import { skillEntryFormView } from "../views";
import {
  axios,
  formatSkillsListResult,
  formatTagSearchResults,
} from "../utils";

/**
 * `/skills add` - present the skills entry modal for the user to fill out.
 */
const handleSkillsAdd = async (client: WebClient, body: SlashCommand) => {
  let result;

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
const handleSkillsList = async (client: WebClient, body: SlashCommand) => {
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
const handleSkillsSearch = async (client: WebClient, body: SlashCommand) => {
  const user = body.user_id;
  const searchText = body.text.split(" ").slice(1).join(",");

  try {
    const resp = await axios.get(`/search?tags=${searchText}`);
    const { data } = resp;

    const response = await formatTagSearchResults(data.data, client);

    await client.chat.postMessage({
      channel: user,
      ...response,
    });
  } catch (e) {
    console.log(e);
  }
};

const handleSkillsTags = async (client: WebClient, body: SlashCommand) => {
  const user = body.user_id;

  try {
    const resp = await axios.get(`/tags`);
    const { data } = resp;
    console.log({ resp, data });

    await client.chat.postMessage({
      channel: user,
      text: `Looked up tags, maybe found results?`,
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
export const handleSkillsCommand: Middleware<
  SlackCommandMiddlewareArgs
> = async ({ ack, body, client }) => {
  await ack();

  // Why json.parse, json.stringify????
  // Oh right, it's because at runtime it's "body: [Object: null prototype] {" so the properties aren't accessible.
  const parsedBody: SlashCommand = JSON.parse(JSON.stringify(body));
  const user = parsedBody.user_id;
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
    case "tags":
      handleSkillsTags(client, parsedBody);
      break;
    default:
      await client.chat.postMessage({
        channel: user,
        text: "Arg not recognized, did you mean to use one of these: 'add', 'list', 'search'?",
      });
      break;
  }
};
