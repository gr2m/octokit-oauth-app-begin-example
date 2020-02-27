const { getAuthorizationUrl } = require("@octokit/oauth-app");

// HTTP function
exports.handler = async function http(req) {
  const queryParams = req.queryStringParameters || {};

  const url = await getAuthorizationUrl({
    clientId: process.env.CLIENT_ID,
    state: queryParams.state,
    scopes: queryParams.scopes ? queryParams.scopes.split(",") : [],
    allowSignup: queryParams.allowSignup === "true" ? true : false,
    redirectUrl: queryParams.redirectUrl
  });

  return {
    statusCode: 302,
    headers: { location: url }
  };
};
