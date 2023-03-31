import { View } from "@slack/bolt";

import { TagItem } from "../triggers";

export const TAGS_LIST_VIEW_ID = "tags_list_view";
export const TAGS_LIST_NEXT_PAGE_BTN = "tags_list_next_page_btn";
export const TAGS_LIST_FIRST_PAGE_BTN = "tags_list_first_page_btn";

export const getTagsPageView = (tags: Array<TagItem>): View => {
  console.log({ tags });

  /**
   * TODOs:
   * - render list of items
   * - add buttons at button for "next" and "first" page nav
   * - action handlers for ^ buttons which push updates to the view
   * - dynamic text at top of view based on whether or not more pages exist
   *
   * __
   * also in endpoint, add a total count: https://stackoverflow.com/questions/27316643/how-to-get-item-count-from-dynamodb
   */
  const lastTag = tags.length > 0 ? tags[tags.length - 1] : undefined;
  console.log({ lastTag });

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
        text: { type: "plain_text", text: `We found ${tags.length} tags.` },
      },
      {
        type: "divider",
      },
      //   ...
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
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "First Page",
            },
            action_id: TAGS_LIST_FIRST_PAGE_BTN,
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Next",
            },
            value: lastTag?.["skill-tag-key"],
            action_id: TAGS_LIST_NEXT_PAGE_BTN,
          },
        ],
      },
    ],
  };
};
