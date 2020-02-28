const { deleteAuthorization } = require("@octokit/oauth-app");

exports.handler = async function http(request) {
  const token = (
    request.headers.authorization ||
    request.headers.Authorization ||
    ""
  ).substr("token ".length);
  const headers = {
    "content-type": "application/json; charset=utf8"
  };

  if (!token) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: '"Authorization" header is required'
      })
    };
  }

  try {
    await deleteAuthorization({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      token
    });

    return { statusCode: 204 };
  } catch (error) {
    if (error.status === 404) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Invalid authentication"
        })
      };
    }

    console.error(error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Server error"
      })
    };
  }
};
