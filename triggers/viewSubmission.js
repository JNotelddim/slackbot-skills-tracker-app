const {
  SKILLS_FORM_BLOCKS,
  SKILLS_FORM_BLOCK_INPUTS,
} = require("../views/skillEntryForm");
const { axios } = require("../utils/axios");
const { formatSkillsListResult } = require("../utils/formatSkillsListResult");

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

  try {
    const resp = await axios.post("/createEntry", {
      userId: user,
      ...submittedValues,
    });

    if (resp.status === 200) {
      await client.chat.postMessage({
        channel: user,
        ...{ type: "text", text: resp.data.message },
      });
    } else {
      client.chat.postMessage({
        channel: user,
        text: "Sorry, something went wrong while creating your entry.",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  handleSkillEntryFormViewSubmission,
};
