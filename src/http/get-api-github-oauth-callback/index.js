const { createToken } = require("@octokit/oauth-app");

// HTTP function
exports.handler = async function http(req) {
  const queryParams = req.queryStringParameters || {};

  const { token } = await createToken({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    state: queryParams.state,
    code: queryParams.code
  });

  return {
    headers: {
      "content-type": "text/html"
    },
    body: `<h1>Token created successfull</h1>

    <p>Your token is: <strong>${token}</strong>. Copy it now as it cannot be shown again.</p>`
  };
};
