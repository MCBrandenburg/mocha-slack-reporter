Base = require('mocha').reporters.base
nodeSlack = require('node-slack')
class Slack
  constructor:(runner, options)->
    passes = 0
    failures = 0
    slack = new nodeSlack options.reporterOptions.team, options.reporterOptions.token
    runner.on "pass", (test)->
      passes++
      messageOptions = {
        username: "PASS: " + test.fullTitle(),
        text: test.fullTitle(),
        channel: options.reporterOptions.channel,
      }

      if options.reporterOptions.passIcon then messageOptions.icon_emoji = options.reporterOptions.passIcon

      slack.send(messageOptions)
      return

    runner.on "fail", (test,err)->
      failures++
      messageOptions = {
        username: "FAIL: "  + test.fullTitle(),
        text: err.message,
        channel: options.reporterOptions.channel,
      }

      if options.reporterOptions.failicon then messageOptions.icon_emoji = options.reporterOptions.failicon

      slack.send(messageOptions)
      return

    runner.on "end", ->
      messageOptions = {
        username:  " Tests Completed",
        text: "Passed: #{passes} Failed: #{failures}",
        channel: options.reporterOptions.channel,
      }

      if options.reporterOptions.endIcon then messageOptions.icon_emoji = options.reporterOptions.endIcon

      slack.send(messageOptions)
      return

module.exports = Slack