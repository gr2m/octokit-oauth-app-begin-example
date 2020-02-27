const arc = require("@architect/functions");
const { createToken } = require("@octokit/oauth-app");

exports.handler = async function http(request) {
  const body = arc.http.helpers.bodyParser(request);
  const headers = {
    "content-type": "application/json; charset=utf8",
    "cache-control":
      "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0"
  };

  try {
    const { token, scopes } = await createToken({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      state: body.state,
      code: body.code
    });

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ token, scopes })
    };
  } catch (error) {
    if (/The code passed is incorrect or expired/i.test(error.message)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: error.message
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
