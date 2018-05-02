(function () {
    const Base = require('mocha').reporters.base;
    const NodeSlack = require('node-slack');

    const Slack = (function () {
        function Slack(runner, options) {
            const slack = new NodeSlack(options.reporterOptions.hook_url);
            let passes = 0;
            let failures = 0;
            let messageOptions = {
                username: '',
                text: '',
                channel: options.reporterOptions.channel,
                icon_emoji: ''
            };

            runner.on("pass", function (test) {
                passes++;
                messageOptions = {
                    username: "PASS: " + test.fullTitle(),
                    text: test.fullTitle(),
                };
                if (options.reporterOptions.passIcon) {
                    messageOptions.icon_emoji = options.reporterOptions.passIcon;
                }else{
                    messageOptions.icon_emoji = '';
                }

                if (!options.reporterOptions.minimal && !options.reporterOptions.failureOnly) {
                    slack.send(messageOptions);
                }
            });

            runner.on("fail", function (test, err) {
                failures++;
                messageOptions = {
                    username: "FAIL: " + test.fullTitle(),
                    text: err.message,
                };
                if (options.reporterOptions.failIcon) {
                    messageOptions.icon_emoji = options.reporterOptions.failIcon;
                }else{
                    messageOptions.icon_emoji = '';
                }

                slack.send(messageOptions);
            });

            runner.once("end", function () {
                messageOptions = {
                    username: " Tests Completed",
                    text: "Passed: " + passes + " Failed: " + failures,
                };
                if (options.reporterOptions.endIcon) {
                    messageOptions.icon_emoji = options.reporterOptions.endIcon;
                }else{
                    messageOptions.icon_emoji = '';
                }

                if (!options.reporterOptions.failureOnly) {
                    slack.send(messageOptions);
                }
            });
        }

        return Slack;

    })();

    module.exports = Slack;

}).call(this);
