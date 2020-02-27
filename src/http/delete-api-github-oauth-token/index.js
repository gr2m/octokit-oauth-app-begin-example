const arc = require("@architect/functions");
const { deleteToken } = require("@octokit/oauth-app");

exports.handler = async function http(request) {
  try {
    const body = arc.http.helpers.bodyParser(request);
    await deleteToken({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      state: body.state,
      code: body.code
    });

    return {
      statusCode: 200
    };
  } catch (error) {
    const headers = {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0"
    };

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
