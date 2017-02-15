#! /usr/bin/env node
'use strict';

var _prettyjson = require('prettyjson');

var _prettyjson2 = _interopRequireDefault(_prettyjson);

var _jiraClient = require('jira-client');

var _jiraClient2 = _interopRequireDefault(_jiraClient);

var _TapsterJira = require('./TapsterJira');

var _TapsterJira2 = _interopRequireDefault(_TapsterJira);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Pretty Json options
var jsonOptions = {
    noColor: false
};

// Init JIRAClient
var jr = new _jiraClient2.default(_config2.default['jira-client-settings']);
var Jira = new _TapsterJira2.default(jr);
var projects = Jira.getProjects();
var ticket = {};

// get ticket details from user input, passing in the processor
getTicketDetails(Jira.createIssue);

function getTicketDetails(cb) {
    "use strict";

    var prompts = [];
    projects.then(function (response) {
        "use strict";

        var arr = [];
        for (var i = 0; i < response.length; i++) {
            arr.push({ value: response[i].key, name: response[i].name });
        }

        // projects
        prompts.push({
            type: "list",
            name: "project",
            message: "Choose JIRA project",
            choices: arr,
            default: _config2.default['jira-client-settings']['projectKey']
        });

        // issue types
        prompts.push({
            type: "list",
            name: "type",
            message: "Choose type",
            choices: _config2.default['jira-issue-types'],
            default: _config2.default['jira-client-settings']['defaultIssueType']
        });

        // subject
        prompts.push({
            type: 'string',
            name: 'subject',
            message: 'Subject'
        });
        // description
        prompts.push({
            type: 'string',
            name: 'description',
            message: 'Description'
        });
        prompts.push({
            type: 'string',
            name: 'assignee',
            message: 'assignee',
            default: _config2.default['jira-client-settings']['username']
        });

        _inquirer2.default.prompt(prompts).then(function (answers) {
            if (answers) {
                Jira.createIssue(answers.type, answers.project, answers.subject, answers.description, _config2.default['jira-project-settings']['shouldSetAssignee'] ? answers.assignee : null).then(function (response) {
                    print(response);
                }).catch(function (err) {
                    errorHandler(err.message);
                });
            } else {
                errorHandler('Something went wrong');
            }
        });
    });
}

function print(msg) {
    "use strict";

    return console.log(_prettyjson2.default.render(msg));
}
function errorHandler(err) {
    "use strict";

    return console.log(_prettyjson2.default.render(err));
}
//# sourceMappingURL=index.js.map