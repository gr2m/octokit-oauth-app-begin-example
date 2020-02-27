const { resetToken } = require("@octokit/oauth-app");

exports.handler = async function http(request) {
  const token = (request.headers.authorization || "").substr("token ".length);
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
    const result = await resetToken({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      token
    });

    return { headers, body: JSON.stringify(result) };
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

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Server error"
      })
    };
  }
};
