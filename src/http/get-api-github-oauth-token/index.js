const { checkToken } = require("@octokit/oauth-app");

exports.handler = async function http(request) {
  const token = (request.headers.authorization || "").substr("token ".length);
  if (!token) {
    return {
      statusCode: 400,
      body: {
        error: '"Authorization" header is required'
      }
    };
  }

  try {
    const body = await checkToken({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      token
    });

    return { body };
  } catch (error) {
    if (error.status === 404) {
      return {
        statusCode: 400,
        body: {
          error: "Invalid authentication"
        }
      };
    }

    console.error(error);

    return {
      statusCode: 500,
      body: {
        error: "Server error"
      }
    };
  }
};
