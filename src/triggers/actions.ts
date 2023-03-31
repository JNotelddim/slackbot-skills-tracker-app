import { Middleware, SlackActionMiddlewareArgs } from "@slack/bolt";

import { axios } from "../utils";
import { getTagsPageView } from "../views";
import { TagsResponse } from "./slashCommand";

export const handleTagsListNextPage: Middleware<
  SlackActionMiddlewareArgs
> = async ({ ack, body, client }) => {
  await ack();
  const user = body.user.id;

  const viewId = (body as any).view.id;

  const lastItemId =
    (body as any).actions && (body as any).actions[0].value
      ? (body as any).actions[0].value
      : undefined;
  const queryString = lastItemId ? `?after=${lastItemId}` : "";

  const resp = await axios.get(`/tags${queryString}`);
  const { data } = resp;

  if (data?.data?.items) {
    await client.views.update({
      view_id: viewId,
      view: getTagsPageView({
        response: (data as TagsResponse).data,
        isFirstPage: false,
      }),
    });
  } else {
    await client.chat.postMessage({
      channel: user,
      text: "No more tags found.",
    });
  }
};

export const handleTagsListFirstPage: Middleware<
  SlackActionMiddlewareArgs
> = async ({ ack, body, client }) => {
  await ack();

  const resp = await axios.get(`/tags`);
  const { data } = resp;

  await client.views.update({
    view_id: (body as any).view.id,
    view: getTagsPageView({
      response: (data as TagsResponse).data,
      isFirstPage: true,
    }),
  });
};
