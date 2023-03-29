/**
 *
 */
const formatTagSearchResults = (result) => {
  const response = {
    text: "",
    blocks: [],
  };
  const { entries } = result;

  if (!entries || !entries.length) {
    response.text = `Sorry, no entries found given the tags you searched for.`;
  } else {
    // TODO: use pagination data and update to be "showing x of y."
    response.text = `Found ${entries.length} entries.`;
    response.blocks = entries.map((entry) => {
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
            text: `*User:*\n${entry.userId}`,
          },
        ],
      };
    });
  }

  return response;
};

module.exports = {
  formatTagSearchResults,
};
