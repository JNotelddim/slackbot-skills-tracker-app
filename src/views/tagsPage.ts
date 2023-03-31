import { View } from "@slack/bolt";

import { TagItem, TagsResponse } from "../triggers";

export const TAGS_LIST_VIEW_ID = "tags_list_view";
export const TAGS_LIST_NEXT_PAGE_BTN = "tags_list_next_page_btn";
export const TAGS_LIST_FIRST_PAGE_BTN = "tags_list_first_page_btn";

export const getTagsPageView = ({
  response,
  isFirstPage = true,
}: {
  response: TagsResponse["data"];
  isFirstPage: boolean;
}): View => {
  const { items: tags, hasMore } = response;
  const lastTag = tags.length > 0 ? tags[tags.length - 1] : undefined;

  let actions = [];

  if (!isFirstPage) {
    actions.push({
      type: "button",
      text: {
        type: "plain_text",
        text: "First Page",
      },
      action_id: TAGS_LIST_FIRST_PAGE_BTN,
    });
  }

  if (hasMore) {
    actions.push({
      type: "button",
      text: {
        type: "plain_text",
        text: "Next",
      },
      value: lastTag?.["skill-tag-key"],
      action_id: TAGS_LIST_NEXT_PAGE_BTN,
    });
  }

  /**
   * TODOs:
   * - dynamic text at top of view based on whether or not more pages exist
   *
   * __
   * also in endpoint, add a total count: https://stackoverflow.com/questions/27316643/how-to-get-item-count-from-dynamodb
   */

  return {
    type: "modal",
    // View identifier
    callback_id: TAGS_LIST_VIEW_ID,
    title: {
      type: "plain_text",
      text: "Existing Tags",
    },
    blocks: [
      {
        type: "section",
        text: { type: "plain_text", text: `Showing ${tags.length} tags.` },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: tags.map((tag) => tag.originalTag).join("\n"),
        },
      },

      {
        type: "divider",
      },
      {
        type: "actions",
        elements: actions,
      },
    ],
  };
};
