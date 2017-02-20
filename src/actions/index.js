import * as loginActions from 'loginactions'
import * as issueActions from 'issueactions'
import * as taskActions from 'taskactions'
import * as managementActions from 'hrmanageractions'

const actions = {
	loginActions,
	issueActions,
	taskActions,
	managementActions
}
export default actions

/*************INFOS**************
List of actions in login actions:
	function fetchLoginData(loginInfo)
List of actions in issue actions:
	function fetchIssues(userId, groupId)
	function fetchIssueDetail(issueId, userId)
	function postIssue(userId, issue)
	function modifyIssue(userId, issueId, issue)
	function handleIssue(userId, issueId)
	function deleteIssue(userId, issueId)
List of actions in task actions:
	function fetchTasks(userId)
	function fetchTaskDetail(taskId, userId)
	function postTask(userId, task)
	function modifyTask(userId, taskId, task)
	function completeTask(userId, taskId)
	function deleteTask(taskId, userId)
List of actions in management actions:
	groups
		function fetchGroups(hruserid)
		function fetchGroupDetail(hruserid, groupId)
		function createGroup(hruserid, groupName)
		function modifyGroup(hruserid, groupId, group)
		function deleteGroup(hruserid, groupId)
	users
		function fetchUsers(hruserId) 
		function fetchUserDetail(hruserid, userId)
		createUser(hruserId, user)
		function modifyUser(hruserId, userId, user)
		banUser(hruserId, userId)