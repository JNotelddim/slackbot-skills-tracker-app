const SKILLS_FORM_VIEW_ID = "skill_entry_form_view";

const SKILLS_FORM_BLOCKS = {
  title: "title_block",
  description: "description_block",
  startDate: "startDate_block",
  endDate: "endDate_block",
  tags: "tags_block",
};

const SKILLS_FORM_BLOCK_INPUTS = {
  title: "plain-text-input-title",
  description: "plain-text-input-description",
  startDate: "datepicker-start-date",
  endDate: "datepicker-end-date",
  tags: "plain-text-input-tags",
};

const today = new Date().toISOString();
const trimmedToday = today.slice(0, today.indexOf("T"));

const skillEntryFormView = {
  type: "modal",
  // View identifier
  callback_id: SKILLS_FORM_VIEW_ID,
  title: {
    type: "plain_text",
    text: "Skills Log Entry Modal",
  },
  blocks: [
    {
      block_id: "header_block",
      type: "header",
      text: {
        type: "plain_text",
        text: "Submit a Skills Log Entry",
        emoji: true,
      },
    },
    {
      block_id: "subheader_block",
      type: "section",
      text: {
        type: "plain_text",
        text: "Try to think about what you've learnt and what skills you've strengthened in this timeframe. When you submit this form, the result will be logged with your account. In the 'tags' field, try to distill those skills into keywords and fill them in like this: \"communication, planning, react-js, react-native\".",
        emoji: true,
      },
    },
    {
      block_id: SKILLS_FORM_BLOCKS.title,
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: SKILLS_FORM_BLOCK_INPUTS.title,
      },
      label: {
        type: "plain_text",
        text: "Title",
        emoji: true,
      },
    },
    {
      block_id: SKILLS_FORM_BLOCKS.description,
      type: "input",
      element: {
        type: "plain_text_input",
        multiline: true,
        action_id: SKILLS_FORM_BLOCK_INPUTS.description,
      },
      label: {
        type: "plain_text",
        text: "Description",
        emoji: true,
      },
    },
    {
      block_id: SKILLS_FORM_BLOCKS.startDate,
      type: "input",
      element: {
        type: "datepicker",
        initial_date: trimmedToday,
        placeholder: {
          type: "plain_text",
          text: "Select a date",
          emoji: true,
        },
        action_id: SKILLS_FORM_BLOCK_INPUTS.startDate,
      },
      label: {
        type: "plain_text",
        text: "Start Date",
        emoji: true,
      },
    },
    {
      block_id: SKILLS_FORM_BLOCKS.endDate,
      type: "input",
      element: {
        type: "datepicker",
        initial_date: trimmedToday,
        placeholder: {
          type: "plain_text",
          text: "Select a date",
          emoji: true,
        },
        action_id: SKILLS_FORM_BLOCK_INPUTS.endDate,
      },
      label: {
        type: "plain_text",
        text: "End Date",
        emoji: true,
      },
    },
    {
      block_id: SKILLS_FORM_BLOCKS.tags,
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: SKILLS_FORM_BLOCK_INPUTS.tags,
      },
      label: {
        type: "plain_text",
        text: "Keywords / Tags",
        emoji: true,
      },
    },
  ],
  submit: {
    type: "plain_text",
    text: "Submit",
  },
};

module.exports = {
  skillEntryFormView,
  SKILLS_FORM_VIEW_ID,
  SKILLS_FORM_BLOCKS,
  SKILLS_FORM_BLOCK_INPUTS,
};
