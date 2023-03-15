const {
  SKILLS_FORM_BLOCKS,
  SKILLS_FORM_BLOCK_INPUTS,
} = require("../views/skillEntryForm");

const handleSkillEntryFormViewSubmission = async ({
  ack,
  body,
  view,
  client,
  logger,
}) => {
  // Acknowledge the view_submission request
  await ack();

  const user = body["user"]["id"];
  // TODO convert values of shape: {type, value} / {type, selectedDate} => string
  const submittedValues = {
    title:
      view.state.values[SKILLS_FORM_BLOCKS.title][
        SKILLS_FORM_BLOCK_INPUTS.title
      ].value,
    description:
      view.state.values[SKILLS_FORM_BLOCKS.description][
        SKILLS_FORM_BLOCK_INPUTS.description
      ].value,
    startDate:
      view.state.values[SKILLS_FORM_BLOCKS.startDate][
        SKILLS_FORM_BLOCK_INPUTS.startDate
      ].selected_date,
    endDate:
      view.state.values[SKILLS_FORM_BLOCKS.endDate][
        SKILLS_FORM_BLOCK_INPUTS.endDate
      ].selected_date,

    tags: view.state.values[SKILLS_FORM_BLOCKS.tags][
      SKILLS_FORM_BLOCK_INPUTS.tags
    ].value,
  };
  //   console.log({ submittedValues });

  // TODO: POST submittedValues to REST API
  let results = "yes!";

  // Message to send user
  let msg = "";

  if (results) {
    // DB save was successful
    msg = "Your submission was successful.";
  } else {
    msg = "There was an error with your submission.";
  }

  // Message the user
  try {
    await client.chat.postMessage({
      channel: user,
      text: msg,
    });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  handleSkillEntryFormViewSubmission,
};
