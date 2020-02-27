@app
air-daq

@static

@http
get /
get /api/github/oauth/login
get /api/github/oauth/callback
post /api/github/oauth/token
get /api/github/oauth/token

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
