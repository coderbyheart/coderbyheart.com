var version = require('../package.json').version

process.stdout.write(JSON.stringify({
  environment: 'production',
  version
}))
