#! /usr/bin/env node
import prettyjson from 'prettyjson';
import JiraApi from 'jira-client';
import TapsterJira from './TapsterJira';
import config from '../config';
import inquirer from 'inquirer';

// Pretty Json options
const jsonOptions = {
    noColor: false
};

// Init JIRAClient
const jr = new JiraApi(config['jira-client-settings']);
const Jira = new TapsterJira(jr);
let projects = Jira.getProjects();
let ticket = {};

// get ticket details from user input, passing in the processor
getTicketDetails(Jira.createIssue);


function getTicketDetails(cb) {
    "use strict";

    let prompts = [];
    projects.then(function (response) {
        "use strict";
        let arr = [];
        for (var i = 0; i < response.length; i++) {
            arr.push({value: response[i].key, name: response[i].name});
        }

        // projects
        prompts.push({
            type   : "list",
            name   : "project",
            message: "Choose JIRA project",
            choices: arr,
            default: config['jira-client-settings']['projectKey']
        });

        // issue types
        prompts.push({
            type   : "list",
            name   : "type",
            message: "Choose type",
            choices: config['jira-issue-types'],
            default: config['jira-client-settings']['defaultIssueType']
        });

        // subject
        prompts.push({
            type   : 'string',
            name   : 'subject',
            message: 'Subject'
        });
        // description
        prompts.push({
            type   : 'string',
            name   : 'description',
            message: 'Description'
        });
        prompts.push({
            type   : 'string',
            name   : 'assignee',
            message: 'assignee',
            default: config['jira-client-settings']['username']
        });

        inquirer.prompt(prompts).then(function (answers) {
            if (answers) {
                Jira.createIssue(answers.type, answers.project, answers.subject, answers.description, (config['jira-default-project-settings']['shouldSetAssignee']) ? answers.assignee : null).then(function (response) {
                    print(response);
                }).catch(err => {
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
    return console.log(prettyjson.render(msg));
}
function errorHandler(err) {
    "use strict";
    return console.log(prettyjson.render(err));
}