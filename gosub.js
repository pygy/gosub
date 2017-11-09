#!/usr/bin/env node

// the first two args are the paths for
// - the NodeJS binary
// - this very script
var command = process.argv.slice(2)

// the npm_config_user_agent looks like "npm/x.y.z ..." or "yarn/x.y.z ..."
command.unshift(process.env.npm_config_user_agent.replace(/\/.*/, '') + " run")

var child = require('child_process').exec(command.join(' '))

child.stdout.pipe(process.stdout)

child.stderr.pipe(process.stderr)

child.on('exit', function (code) {
  process.exit(code)
})
