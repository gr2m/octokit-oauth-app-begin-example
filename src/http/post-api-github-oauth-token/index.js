const arc = require("@architect/functions");
const { createToken } = require("@octokit/oauth-app");

exports.handler = async function http(request) {
  const body = arc.http.helpers.bodyParser(request);

  try {
    const { token, scopes } = await createToken({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      state: body.state,
      code: body.code
    });

    return {
      statusCode: 201,
      body: { token, scopes }
    };
  } catch (error) {
    if (/The code passed is incorrect or expired/i.test(error.message)) {
      return {
        statusCode: 400,
        body: {
          error: error.message
        }
      };
    }

    return {
      statusCode: 500,
      body: {
        error: "Server error"
      }
    };
  }
};
