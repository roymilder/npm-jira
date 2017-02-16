# Create JIRA issues from the CLI

A Node.js wrapper for performing jira actions from the cli


## Setup
Create a config.json file in the src directory
```$xslt
{
  "jira-client-settings": {
    "protocol": "https",
    "host": "tapster.atlassian.net",
    "username": "", // your jira username
    "password": "", // your jira password
    "apiVersion": "2",
    "strictSSL": true
  },
  "jira-default-project-settings": {
    "projectKey": "", // default project key
    "defaultIssueType": "Task" // default issue type, i.e. Task or Bug
  },
  "jira-issue-types": [
    "Task",
    "Bug"
  ]
}
```

## Run from cli
It's possible to have the module acting as a cli command.

```$xslt
$sudo npm link
```

After that you can use:
```$xslt
$jira
```

## NVM
If node/npm is installed with the wrong permissions (and you're unable to run npm link), remove node and reinstall using NVM.

See: http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo

nvm @ github: https://github.com/creationix/nvm
