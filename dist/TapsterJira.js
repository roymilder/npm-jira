#! /usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _prettyjson = require('prettyjson');

var _prettyjson2 = _interopRequireDefault(_prettyjson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TapsterJira = function () {

    /**
     * @constructor
     * @function
     * @param {Jira} Jira jira client
     */
    function TapsterJira(Jira) {
        _classCallCheck(this, TapsterJira);

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


    _createClass(TapsterJira, [{
        key: 'createIssue',
        value: function createIssue(type, project, subject, description, assignee) {

            var parameters = { fields: {} };
            parameters.fields.project = { key: project };
            parameters.fields.issuetype = { name: type };
            parameters.fields.summary = subject;
            parameters.fields.description = description;

            if (assignee) {
                parameters.fields.assignee = { name: assignee };
            }

            console.log(_prettyjson2.default.render('Creating issue'));

            return this.Jira.addNewIssue(parameters);
        }

        /**
         * @name projects
         * @function
         * Returns all the projects
         * @return {*}
         */

    }, {
        key: 'getProjects',
        value: function getProjects() {
            return this.Jira.listProjects();
        }
    }]);

    return TapsterJira;
}();

exports.default = TapsterJira;
//# sourceMappingURL=TapsterJira.js.map