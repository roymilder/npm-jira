#! /usr/bin/env node
import prettyjson from 'prettyjson';

export default class TapsterJira {

    /**
     * @constructor
     * @function
     * @param {Jira} Jira jira client
     */
    constructor(Jira) {
        this.Jira = Jira;
    }

    /**
     * @name createIssue
     * @function
     * Creates a new jira issue
     * @param {string} type
     * @param {string} project - jira project key
     * @param {string} subject
     * @param {string} description
     * @param {string} assignee
     */
    createIssue(type, project, subject, description, assignee) {

        let parameters = {fields: {}};
        parameters.fields.project = {key: project};
        parameters.fields.issuetype = {name: type};
        parameters.fields.summary = subject;
        parameters.fields.description = description;

        if (assignee) {
            parameters.fields.assignee = {name: assignee};
        }


        console.log(prettyjson.render('Creating issue'));

        return this.Jira.addNewIssue(parameters);

    }


    /**
     * @name projects
     * @function
     * Returns all the projects
     * @return {*}
     */
    getProjects() {
        return this.Jira.listProjects();
    }


}