const skillEntryForm = {
  type: "modal",
  // View identifier
  callback_id: "skills_log_entry_modal",
  title: {
    type: "plain_text",
    text: "Skills Log Entry Modal",
  },
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Submit a Skills Log Entry",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "Try to think about what you've learnt and what skills you've strengthened in this timeframe. When you submit this form, the result will be logged with your account. In the 'tags' field, try to distill those skills into keywords and fill them in like this: \"communication, planning, react-js, react-native\".",
        emoji: true,
      },
    },
    {
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: "plain_text_input-action",
      },
      label: {
        type: "plain_text",
        text: "Title",
        emoji: true,
      },
    },
    {
      type: "input",
      element: {
        type: "plain_text_input",
        multiline: true,
        action_id: "plain_text_input-action",
      },
      label: {
        type: "plain_text",
        text: "Description",
        emoji: true,
      },
    },
    {
      type: "input",
      element: {
        type: "datepicker",
        initial_date: "1990-04-28",
        placeholder: {
          type: "plain_text",
          text: "Select a date",
          emoji: true,
        },
        action_id: "datepicker-action",
      },
      label: {
        type: "plain_text",
        text: "Start Date",
        emoji: true,
      },
    },
    {
      type: "input",
      element: {
        type: "datepicker",
        initial_date: "1990-04-28",
        placeholder: {
          type: "plain_text",
          text: "Select a date",
          emoji: true,
        },
        action_id: "datepicker-action",
      },
      label: {
        type: "plain_text",
        text: "End Date",
        emoji: true,
      },
    },
    {
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: "plain_text_input-action",
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
  skillEntryForm,
};
