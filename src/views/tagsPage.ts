import { View } from "@slack/bolt";

import { TagItem } from "../triggers";

export const TAGS_LIST_VIEW_ID = "tags_list_view";

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

  return {
    type: "modal",
    // View identifier
    callback_id: TAGS_LIST_VIEW_ID,
    title: {
      type: "plain_text",
      text: "Skills Log Entry Modal",
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
    ],
  };
};
