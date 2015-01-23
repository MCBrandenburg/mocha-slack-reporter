# mocha-slack-reporter
Mocha reporter that posts to Slack
##Usage
Options
```js
reporterOptions = {
  username: "MCBrandenburg",
  channel: "#test",
  team: "team",
  token: "dhgahsgj",
  failIcon: ":warning:",
  passIcon: ":smile:",
  endIcon: ":bulb:"
}
```
##Running the reporter
```js
mocha.reporter(slackReporter, reporterOptions);
mocha.run(function(failures) {
  process.on("exit", function() {
    process.exit(failures);
  });
});
```
