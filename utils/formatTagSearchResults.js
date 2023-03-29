/**
 *
 */
const formatTagSearchResults = async (result, client) => {
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
    response.blocks = await Promise.all(
      entries.map(async (entry) => {
        const userInfoResult = await client.users.info({ user: entry.userId });

        let userName = "N/A";
        if (userInfoResult.ok) {
          userName = userInfoResult.user.real_name;
        }

        const formattedDate = new Date(entry.createdAt).toDateString();

        return Promise.resolve({
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Title:*\n${entry.title}`,
            },
            {
              type: "mrkdwn",
              text: `*User:*\n${userName}`,
            },
            {
              type: "mrkdwn",
              text: `*DateCreated:*\n${formattedDate}`,
            },
          ],
        });
      })
    );
  }

  return response;
};

module.exports = {
  formatTagSearchResults,
};
