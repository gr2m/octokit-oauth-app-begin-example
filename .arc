@app
air-daq

@static

@http
get /api/github/oauth/login
get /api/github/oauth/callback
post /api/github/oauth/token
get /api/github/oauth/token
patch /api/github/oauth/token
delete /api/github/oauth/token
delete /api/github/oauth/grant

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
