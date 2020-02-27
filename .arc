@app
air-daq

@static

@http
get /
get /api/github/oauth/login

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
