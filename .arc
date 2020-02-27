@app
air-daq

@static

@http
get /
get /api/github/oauth/login
get /api/github/oauth/callback

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
