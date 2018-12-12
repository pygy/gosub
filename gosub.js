#!/usr/bin/env node

// the first two args are the paths for
// - the NodeJS binary
// - this very script
var args = process.argv.slice(2)

args.unshift("run")

// the npm_config_user_agent looks like "npm/x.y.z ..." or "yarn/x.y.z ..."
var command = process.env.npm_config_user_agent.replace(/\/.*/, '')

var child = require('child_process').spawn(command, args, {
  stdio: 'inherit',
  env: process.env,
  cwd: process.cwd()
})

child.on('exit', function (code) {
  process.exit(code)
})
