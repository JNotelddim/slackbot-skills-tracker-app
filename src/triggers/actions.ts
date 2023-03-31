import { Middleware, SlackActionMiddlewareArgs } from "@slack/bolt";

import { axios } from "../utils";
import { getTagsPageView, TAGS_LIST_VIEW_ID } from "../views";
import { TagsResponse } from "./slashCommand";

export const handleTagsListNextPage: Middleware<
  SlackActionMiddlewareArgs
> = async ({ ack, body, client }) => {
  //   await ack();
  // Get next page of
  console.log("respond");
  // await say("Request approved");
  const user = body.user.id;
  console.log({ body, typename: typeof body, actions: (body as any).actions });

  const lastItemId =
    (body as any).actions && (body as any).actions[0].value
      ? (body as any).actions[0].value
      : undefined;
  console.log({ lastItem: lastItemId });
  const queryString = lastItemId ? `?after=${lastItemId}` : "";
  console.log({ queryString });

  const resp = await axios.get(`/tags${queryString}`);
  const { data } = resp;

  //   await client.views.update({
  //     view_id: TAGS_LIST_VIEW_ID,
  //     view: getTagsPageView((data as TagsResponse).data.items),
  //   });
};

export const handleTagsListFirstPage: Middleware<
  SlackActionMiddlewareArgs
> = async ({ ack, body, client }) => {
  await ack();

  const resp = await axios.get(`/tags`);
  const { data } = resp;

  await client.views.update({
    view_id: TAGS_LIST_VIEW_ID,
    view: getTagsPageView((data as TagsResponse).data.items),
  });
};
