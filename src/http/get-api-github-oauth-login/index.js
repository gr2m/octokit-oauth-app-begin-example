const { getAuthorizationUrl } = require("@octokit/oauth-app");

// HTTP function
exports.handler = async function http(req) {
  const queryParams = req.queryStringParameters || {};

  const url = await getAuthorizationUrl({
    clientId: "b6a71ec237ebde279c52",
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
