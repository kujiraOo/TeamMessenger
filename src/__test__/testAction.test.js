//import * as action from '../actions/helper'
import * as taskactions from '../actions/taskactions'
import * as issueactions from '../actions/issueactions'
import * as ga from '../actions/groupanduseraction'
import {fetchLoginData} from '../actions/loginactions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import _ from 'lodash/array'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)


describe('task fetching', ()=> {
	afterEach(()=>{nock.cleanAll()})
	//set up mock server
	const db = nock('http://localhost:3000')

	//now dispatch our async actions
	it('should dispatch async task fetching actions', ()=>{
		//set up
		const store = mockStore({})
		const data = {
				tasks: [{
					id: 69,
					status: "DONE",
					title: 'Have fun',
					sender: 23,
					senderGroup: 69,
					targetUsers: [5, 100, 62],
					targetGroup: 42,
					deadline: "1994-11-05T08:15:30+02:00"
				}]
			}
		db.get('/api/tasks').reply(200, {body: data})
		const expectedActions = [{
			type: 'REQUEST_TASKS',
			payload : {
				userId: 70
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_TASKS',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_TASKS',
			payload: data,
			request: {userId: 70}
		}]
		//test
		return store.dispatch(taskactions.fetchTasks(70))
		.then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	it('should fetch tasks detail', ()=>{
		const store = mockStore({})
		const data = {
					description: "Some long and boring description of things to do, that gonna annoy any human bein on Earth",
					id: 69,
					status: "DONE",
					title: 'Have fun',
					sender: 23,
					senderGroup: 69,
					targetUsers: [5, 100, 62],
					targetGroup: 42,
					deadline: "1994-11-05T08:15:30+02:00"
				}
		db.get(`/api/tasks/${69}`).reply(200, {body: data})
		const expectedActions = [{
			type: 'REQUEST_TASK_DETAIL',
			payload : {
				userId: 70,
				id: 69
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_TASK_DETAIL',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_TASK_DETAIL',
			payload: data,
			request: {userId: 70, id: 69}
		}]
		//naw lets test!
		return store.dispatch(taskactions.fetchTaskDetail(69, 70)).then(() => expect(store.getActions()).toEqual(expectedActions))
	})
	it('should create new task', () => {
		//setup
		const store = mockStore({})
		const entity = {
				description: "Some long and boring description of things to do, that gonna annoy any human bein on Earth",
				status: "DONE",
				title: 'Have fun',
				sender: 23,
				senderGroup: 69,
				targetUsers: [5, 100, 62],
				targetGroup: 42,
				deadline: "1994-11-05T08:15:30+02:00"
		}
		const serverRep = Object.assign({}, entity, {id: 69})
		db.post(`/api/tasks`).reply(200, {body: serverRep})
		const expectedActions = [{
			type: 'REQUEST_POST_TASK',
			payload : {
				userId: 70,
				entity
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_POST_TASK',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_POST_TASK',
			payload: serverRep,
			request: {userId: 70, entity}
		}]
		//test
		return store.dispatch(taskactions.postTask(70, entity)).then(()=> {expect(store.getActions()).toEqual(expectedActions)})
	})
	it('should be able to modify the task given the id', () => {
		//setup
		const store = mockStore({})
		const entity = {
				targetUsers: [5, 100]
		}
		const serverRep = Object.assign({}, {
				description: "Some long and boring description of things to do, that gonna annoy any human bein on Earth",
				status: "DONE",
				title: 'Have fun',
				sender: 23,
				senderGroup: 69,
				targetUsers: [5, 100, 62],
				targetGroup: 42,
				deadline: "1994-11-05T08:15:30+02:00"}, entity)
		db.put(`/api/tasks/${69}`).reply(200, {body: serverRep})
		const expectedActions = [{
			type: 'REQUEST_MODIFY_TASK',
			payload : {
				userId: 70,
				id: 69,
				entity
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_MODIFY_TASK',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_MODIFY_TASK',
			payload: serverRep,
			request: {userId: 70, entity, id: 69}
		}]
		//test
		return store.dispatch(taskactions.modifyTask(70, 69, entity)).then(()=> {expect(store.getActions()).toEqual(expectedActions)})
	})
	it('should reject modification if the user is not authorized', ()=> {
		//setup
		const store = mockStore({})
		const entity = {
				targetUsers: [5, 100]
		}
		db.put(`/api/tasks/${69}`).reply(403)
		const expectedActions = [{
			type: 'REQUEST_MODIFY_TASK',
			payload : {
				userId: 70,
				id: 69,
				entity
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_MODIFY_TASK',
			payload: {
				response: 403,
				extra: undefined
			}
		}]
		//test
		return store.dispatch(taskactions.modifyTask(70, 69, entity)).then(()=> {expect(store.getActions()).toEqual(expectedActions);})
	})
	it('should complete the task',() => {
		//setup
		const initial = {
				description: "Some long and boring description of things to do, that gonna annoy any human bein on Earth",
				status: "NOT_DONE",
				title: 'Have fun',
				sender: 23,
				senderGroup: 69,
				targetUsers: [5, 100, 62],
				targetGroup: 42,
				deadline: "1994-11-05T08:15:30+02:00" }
		const store = mockStore(initial)
		const entity = {
				status: "DONE"
		}
		const serverRep = Object.assign({}, initial, entity)
		db.put(`/api/tasks/${69}`).reply(200, {body: serverRep})
		const expectedActions = [{
			type: 'REQUEST_COMPLETE_TASK',
			payload : {
				userId: 70,
				id: 69,
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_COMPLETE_TASK',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_COMPLETE_TASK',
			payload: serverRep,
			request: {userId: 70, id: 69}
		}]
		//test
		return store.dispatch(taskactions.completeTask(70, 69)).then(()=> {expect(store.getActions()).toEqual(expectedActions)})
	})
	it('should dispatch delete actions', () => {
		const initial = {
				description: "Some long and boring description of things to do, that gonna annoy any human bein on Earth",
				status: "NOT_DONE",
				title: 'Have fun',
				sender: 23,
				senderGroup: 69,
				targetUsers: [5, 100, 62],
				targetGroup: 42,
				deadline: "1994-11-05T08:15:30+02:00" }
		const store = mockStore(initial)
		db.delete(`/api/tasks/${69}`).reply(200)
		const expectedActions = [{
			type: 'REQUEST_DELETE_TASK',
			payload : {
				userId: 70,
				id: 69,
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_DELETE_TASK',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_DELETE_TASK',
			payload: undefined,
			request: {userId: 70, id: 69}
		}]
		//test
		return store.dispatch(taskactions.deleteTask(70, 69)).then(()=> {expect(store.getActions()).toEqual(expectedActions)})
	})
})
describe('issue fetching', ()=> {
	afterEach(()=>{nock.cleanAll()})
	//set up mock server
	const db = nock('http://localhost:3000')

	//now dispatch our async actions
	it('should fetch issue enmasses', () => {
		//set up
		const store = mockStore({})
		const data = {
				issues: [{
					id: 69,
					status: "NOT_HANDLED",
					title: 'Have fun',
					sender: 23,
					senderGroup: 69,
					targetGroup: 42,
					deadline: "1994-11-05T08:15:30+02:00",
					title: "A thing is broken, please save the world"
				}]
			}
		db.get('/api/issues').reply(200, {body: data})
		const expectedActions = [{
			type: 'REQUEST_ISSUES',
			payload : {
				userId: 70
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_ISSUES',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_ISSUES',
			payload: data,
			request: {userId: 70}
		}]
		//test
		return store.dispatch(issueactions.fetchIssues(70))
		.then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	it('should fetch issue detail', ()=> {
		const store = mockStore({})
		const data = {
					id: 69,
					status: "NOT_HANDLED",
					title: 'Have fun',
					sender: 23,
					senderGroup: 69,
					targetGroup: 42,
					deadline: "1994-11-05T08:15:30+02:00",
					title: "A thing is broken, please save the world"
				}
		db.get(`/api/issues/${69}`).reply(200, {body: data})
		const expectedActions = [{
			type: 'REQUEST_ISSUE_DETAIL',
			payload : {
				userId: 70,
				id: 69
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_ISSUE_DETAIL',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_ISSUE_DETAIL',
			payload: data,
			request: {userId: 70, id: 69}
		}]
		//naw lets test!
		return store.dispatch(issueactions.fetchIssueDetail(70, 69)).then(() => expect(store.getActions()).toEqual(expectedActions))
	})
	it('should create new issue', ()=> {
		//setup
		const store = mockStore({})
		const entity = {
				description: "Some long and boring description of things to do, that gonna annoy any human bein on Earth",
				status: "DONE",
				title: 'Have fun',
				sender: 23,
				senderGroup: 69,
				targetUsers: [5, 100, 62],
				targetGroup: 42,
				deadline: "1994-11-05T08:15:30+02:00"
		}
		const serverRep = Object.assign({}, entity, {id: 69})
		db.post(`/api/issues`).reply(200, {body: serverRep})
		const expectedActions = [{
			type: 'REQUEST_CREATE_ISSUE',
			payload : {
				userId: 70,
				entity
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_CREATE_ISSUE',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_CREATE_ISSUE',
			payload: serverRep,
			request: {userId: 70, entity}
		}]
		//test
		return store.dispatch(issueactions.postIssue(70, entity)).then(()=> {expect(store.getActions()).toEqual(expectedActions)})
	})
	it('should modify issue detail', ()=> {
		//setup
		const store = mockStore({})
		const entity = {
				title: "BITCH PLEASE"
		}
		const serverRep = Object.assign({}, {
				description: "Some long and boring description of things to do, that gonna annoy any human bein on Earth",
				status: "DONE",
				title: "BITCH PLEASE",
				sender: 23,
				senderGroup: 69,
				targetUsers: [5, 100, 62],
				targetGroup: 42,
				deadline: "1994-11-05T08:15:30+02:00"}, entity)
		db.put(`/api/issues/${69}`).reply(200, {body: serverRep})
		const expectedActions = [{
			type: 'REQUEST_MODIFY_ISSUE',
			payload : {
				userId: 70,
				id: 69,
				entity
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_MODIFY_ISSUE',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_MODIFY_ISSUE',
			payload: serverRep,
			request: {userId: 70, entity, id: 69}
		}]
		//test
		return store.dispatch(issueactions.modifyIssue(70, 69, entity)).then(()=> {expect(store.getActions()).toEqual(expectedActions)})
	})
	it('should handle issue', ()=> {
		//setup
		const initial = {
				description: "Some long and boring description of things to do, that gonna annoy any human bein on Earth",
				status: "NOT_HANDLED",
				title: 'Have fun',
				sender: 23,
				senderGroup: 69,
				targetGroup: 42,
				deadline: "1994-11-05T08:15:30+02:00" }
		const store = mockStore(initial)
		const entity = {
				status: "DONE"
		}
		const serverRep = Object.assign({}, initial, entity)
		db.put(`/api/issues/${69}`).reply(200, {body: serverRep})
		const expectedActions = [{
			type: 'REQUEST_HANDLE_ISSUE',
			payload : {
				userId: 70,
				id: 69,
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_HANDLE_ISSUE',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_HANDLE_ISSUE',
			payload: serverRep,
			request: {userId: 70, id: 69}
		}]
		//test
		return store.dispatch(issueactions.handleIssue(70, 69)).then(()=> {expect(store.getActions()).toEqual(expectedActions)})
	})
	it('should delete issue', ()=> {
		const initial = {
				description: "Some long and boring description of things to do, that gonna annoy any human bein on Earth",
				status: "NOT_DONE",
				title: 'Have fun',
				sender: 23,
				senderGroup: 69,
				targetUsers: [5, 100, 62],
				targetGroup: 42,
				deadline: "1994-11-05T08:15:30+02:00" }
		const store = mockStore(initial)
		db.delete(`/api/issues/${69}`).reply(200)
		const expectedActions = [{
			type: 'REQUEST_DELETE_ISSUE',
			payload : {
				userId: 70,
				id: 69,
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_DELETE_ISSUE',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_DELETE_ISSUE',
			payload: undefined,
			request: {userId: 70, id: 69}
		}]
		//test
		return store.dispatch(issueactions.deleteIssue(70, 69)).then(()=> {expect(store.getActions()).toEqual(expectedActions)})
	})
})
describe('group fetching', ()=> {
	//setup nock!
	const db = nock('http://localhost:3000')
	afterEach(()=>{nock.cleanAll()})
	//tests
	it('should fetch group entities', ()=> {
		//set up
		const store = mockStore({})
		const data = {
				groups: [{
					id: 69,
					name: 'The incredibles'
				},
				{
					id: 100,
					name: 'The nerds'
				}
				]
			}
		db.get('/api/groups').reply(200, {body: data})
		const expectedActions = [{
			type: 'REQUEST_GROUPS',
			payload : {
				userId: 70
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_GROUPS',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_GROUPS',
			payload: data,
			request: {userId: 70}
		}]
		//test
		return store.dispatch(ga.fetchGroups(70))
		.then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	it('should fetch group information', ()=> {
		const store = mockStore({})
		const data = {
					id: 69,
					name: "the incredibles",
					user: [70, 71, 72],
					subGroup: [43, 27],
					superGroup: [12],
				}
		db.get(`/api/groups/${69}`).reply(200, {body: data})
		const expectedActions = [{
			type: 'REQUEST_GROUP_DETAIL',
			payload : {
				userId: 70,
				id: 69
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_GROUP_DETAIL',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_GROUP_DETAIL',
			payload: data,
			request: {userId: 70, id: 69}
		}]
		//naw lets test!
		return store.dispatch(ga.fetchGroupDetail(70, 69)).then(() => expect(store.getActions()).toEqual(expectedActions))
	})
	it('should post new group', ()=> {
		const store = mockStore({})
		const entity = {
					name: "the ubermen",
					user: [701, 712, 72],
					subGroup: [434, 217],
					superGroup: [112]
				}
		const serverRep = Object.assign({}, entity, {id: '34'})
		db.post(`/api/groups`).reply(200, {body: serverRep})
		const expectedActions = [{
			type: 'REQUEST_CREATE_GROUP',
			payload : {
				userId: 70,
				entity
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_CREATE_GROUP',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_CREATE_GROUP',
			payload: serverRep,
			request: {userId: 70, entity}
		}]
		return store.dispatch(ga.createGroup(70, entity)).then(()=> {expect(store.getActions()).toEqual(expectedActions)})
	})
	it('should modify task', ()=> {
		const store = mockStore({})
		const data = {
					id: 69,
					name: "the ubermen",
					user: [701, 712, 72],
					subGroup: [434, 217],
					superGroup: [112]
				}
		const entity = {subGroup: [222, 333]}
		const afterChange = Object.assign({}, data, entity)
		db.put(`/api/groups/${69}`).reply(200, {body: afterChange})
		const expectedActions = [{
			type: 'REQUEST_MODIFY_GROUP',
			payload : {
				userId: 70,
				id: 69,
				entity
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_MODIFY_GROUP',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_MODIFY_GROUP',
			payload: afterChange,
			request: {userId: 70, entity, id: 69}
		}]
		return store.dispatch(ga.modifyGroup(70, 69, entity)).then(()=> {expect(store.getActions()).toEqual(expectedActions)})
	})
	it('should delete group', ()=> {
		const store = mockStore({})
		db.delete(`/api/groups/${69}`).reply(200)
		const expectedActions = [{
			type: 'REQUEST_DELETE_GROUP',
			payload : {
				userId: 70,
				id: 69,
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_DELETE_GROUP',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_DELETE_GROUP',
			payload: undefined,
			request: {userId: 70, id: 69}
		}]
		//test
		return store.dispatch(ga.deleteGroup(70, 69)).then(()=> {expect(store.getActions()).toEqual(expectedActions)})
	})
})
describe('user fetching', () => {
	const db = nock('http://localhost:3000')
	afterEach(()=>{nock.cleanAll()})
	//now test the damn user
	it('should fetch user info enmass', () => {
		const store = mockStore({})
		const data = {
				users: [{
					id: 69,
					//other info
				},
				{
					id: 100,
					//other info
				}
				]
			}
		db.get('/api/users').reply(200, {body: data})
		const expectedActions = [{
			type: 'REQUEST_USERS',
			payload : {
				userId: 70
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_USERS',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_USERS',
			payload: data,
			request: {userId: 70}
		}]
		//test
		return store.dispatch(ga.fetchUsers(70))
		.then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	it('should fetch user details', () => {
		const store = mockStore({})
		const data = {data : 'data'}
		const userId = 23
		const id = 10
		db.get(`/api/users/${id}`).reply(200, {body: data})
		const expectedActions = [{
			type: 'REQUEST_USER_DETAIL',
			payload : {
				userId,
				id
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_USER_DETAIL',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_USER_DETAIL',
			payload: data,
			request: {userId, id}
		}]
		//test
		return store.dispatch(ga.fetchUserDetail(userId, id)).then(() => expect(store.getActions()).toEqual(expectedActions))
	})
	it('should create new user', () => {
		const store = mockStore({})
		const data = {data : 'data'}
		const userId = 23
		db.post(`/api/users`).reply(200, {body: data})
		const expectedActions = [{
			type: 'REQUEST_CREATE_USER',
			payload : {
				userId
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_CREATE_USER',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_CREATE_USER',
			payload: data,
			request: {userId}
		}]
		//test
		return store.dispatch(ga.createUser(userId))
		.then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	it('should modify users', () => {
		const store = mockStore({})
		const userId = 23
		const id = 12
		const entity = {/*entity*/}
		db.put(`/api/users/${id}`).reply(200, {body: entity})
		const expectedActions = [{
			type: 'REQUEST_MODIFY_USER',
			payload : {
				userId,
				id,
				entity
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_MODIFY_USER',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_MODIFY_USER',
			payload: entity,
			request: {userId, id, entity}
		}]
		//test
		return store.dispatch(ga.modifyUser(userId, id, entity)).then(() => {expect(store.getActions()).toEqual(expectedActions)})
	})
	it('should delete user', () => {
		const store = mockStore({state: 'state'})
		const userId = 23
		const id = 12
		db.delete(`/api/users/${id}`).reply(200)
		const expectedActions = [{
			type: 'REQUEST_DELETE_USER',
			payload : {
				userId,
				id
			}
		}, {
			type: 'SERVER_RESPONSE_TO_REQUEST_DELETE_USER',
			payload: {
				response: 200,
				extra: undefined
			}
		}, {
			type: 'RECEIVE_REQUEST_DELETE_USER',
			payload: undefined,
			request: {userId, id}
		}]
		//test
		return store.dispatch(ga.banUser(userId, id)).then(() => {expect(store.getActions()).toEqual(expectedActions)})
	})
})