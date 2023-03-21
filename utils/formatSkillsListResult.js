/**
 * Some users may not have entries yet, so we want to ensure the empty case
 * is handled.
 * If there are entries, we want to format them to show the relevant data to the user.
 */
const formatSkillsListResult = (result) => {
  const response = {
    text: "",
    blocks: [],
  };

  if (!result || !result.length) {
    response.text = "Sorry, no entries found.";
  } else {
    // TODO: use pagination data and update to be "showing x of y."
    response.text = `Found ${result.length} entries.`;
    response.blocks = result.map((entry) => {
      return {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Title:*\n${entry.title}`,
          },
          {
            type: "mrkdwn",
            text: `*DateCreated:*\n${entry.createdAt}`,
          },
          {
            type: "mrkdwn",
            text: `*Description:*\n${entry.description}`,
          },
          {
            type: "mrkdwn",
            text: `*StartDate:*\n${entry.startDate}`,
          },
          {
            type: "mrkdwn",
            text: `*Tags:*\n${entry.tags.join(", ")}`,
          },
        ],
      };
    });
  }

  return response;
};

module.exports = {
  formatSkillsListResult,
};
