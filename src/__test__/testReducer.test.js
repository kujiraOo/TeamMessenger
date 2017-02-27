import * as basic from '../actions/helper'
import actions from '../actions/index'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import _ from 'lodash/array'
import tasks from '../reducers/taskReducer'
import {makePatchEntityById, addEntitiesById, deleteEntityById, deleteEntityAllIds, addEntityAllIds, addEntitiesAllIds} from '../reducers/helper'
const middlewares = [thunk]
const mockStore = configureStore(tasks, middlewares)
describe('common reducers', ()=> {
	const data = [{
		id: 1,
		status: "NOT_DONE",
		title: 'Have fun',
		sender: 70,
		senderGroup: 66,
		targetUsers: [5, 100, 62],
		targetGroup: 42,
		deadline: "1994-11-05T08:15:30+02:00"
	}, 
	{
		id: 2,
		status: "NOT_DONE",
		title: 'Resolve your boredom',
		sender: 43,
		senderGroup: 66,
		targetUsers: [70, 100, 62],
		targetGroup: 42,
		deadline: "1994-11-05T08:15:30+02:00"
	}]
	const initialState = {
			byId: {
				[data[0].id]: Object.assign(data[0], {detailed: false}), [data[1].id]: Object.assign(data[1], {detailed: false})
			},
			allIds: [1,2],
			workspace: {
				creation: {},
				deletion: {},
				fetch: {},
				modification: {}
			}
		}
	const store = mockStore(tasks, initialState)
	//start testing
	it('should have makePatchEntityById return addEntitiesById with a false 3rd argument', () => {
		let byId = {}
		const test = makePatchEntityById(false)
		const action = basic.responseToRequest(basic.requestOperation('TASKS', {}), data[0])
		const expected = {[data[0].id] : Object.assign({}, data[0], {detailed: false})}
		expect(test(byId, action)).toEqual(expected)
	})
	it('should add the entity id into the allIds array', ()=> {
		let allIds = []
		const test = addEntityAllIds
		const action = basic.responseToRequest(basic.requestOperation('TASKS', {}), data[0])
		const expectation = [action.payload.id]
		expect(test(allIds, action)).toEqual(expectation)
	})
	it('should add entities en mass', () => {
		let byId = {}
		const expected = {[data[0].id]: Object.assign(data[0], {detailed: false}), [data[1].id]: Object.assign(data[1], {detailed: false})}
		const action = basic.responseToRequest(basic.requestOperation('TASKS', {}), data)
		expect(addEntitiesById(byId, action)).toEqual(expected);
	})
	it('should update allIds of entity accordingly', ()=> {
		let allIds = []
		const action = basic.responseToRequest(basic.requestOperation('TASKS', {}), data)
		const expectation = [1, 2]
		expect(addEntitiesAllIds(allIds, action)).toEqual(expectation)
	})
	it('should construct the state accordingly when receive the action (multiple fetches all at once)', () => {
		const expectation = initialState
		const action = basic.responseToRequest(basic.requestOperation('TASKS', {}), data)
		expect(tasks(initialState, action)).toEqual(expectation)
	})
	it('should delete entity byId', ()=> {
		const action = basic.responseToRequest(basic.requestOperation('DELETE_TASK', {userId: 70, id: 1}))
		expect(deleteEntityById(initialState.byId, action)[1]).not.toBeDefined()
	})
	it('should delete entity allIds', () => {
		const action = basic.responseToRequest(basic.requestOperation('DELETE_TASK', {userId: 70, id: 1}))
		expect(deleteEntityAllIds(initialState.allIds, action).length).toBe(1)
	})
})
describe('task related reducers', ()=> {
	afterEach(()=>{nock.cleanAll()})
	const db = nock('http://localhost:3000')
	const data = [{
		id: 1,
		status: "NOT_DONE",
		title: 'Have fun',
		sender: 70,
		senderGroup: 66,
		targetUsers: [5, 100, 62],
		targetGroup: 42,
		deadline: "1994-11-05T08:15:30+02:00",
		detailed: false
	}, 
	{
		id: 2,
		status: "NOT_DONE",
		title: 'Resolve your boredom',
		sender: 43,
		senderGroup: 66,
		targetUsers: [70, 100, 62],
		targetGroup: 42,
		deadline: "1994-11-05T08:15:30+02:00",
		detailed: false,
	}]
	const initialState = {
			byId: {
				[data[0].id]: Object.assign(data[0], {detailed: false}), [data[1].id]: Object.assign(data[1], {detailed: false})
			},
			allIds: [1,2],
			workspace: {
				creation: {},
				deletion: {},
				fetch: {},
				modification: {}
			}
		}
	const store = mockStore(initialState)
	//console.log(store.getState())
	//begin tests
	it('should add data into the store', () => {
		db.get('/api/tasks').reply(200, {body: data})
		const action = basic.responseToRequest(basic.requestOperation('TASKS', {userId: 70}), data)
		const test = tasks({}, action)
		//now test
		expect(test).toEqual(initialState)
	})
	it('should add detailed information about the task', ()=> {
		const entity = Object.assign({}, initialState.byId[1], {description: "Some long and boring description of things to do, that gonna annoy any human bein on Earth"})
		const action = basic.responseToRequest(basic.requestOperation('TASK_DETAIL', {userId: 70, id:1}), entity)
		const test = tasks(initialState, action)
		const expectation = {
			byId: {
				[data[0].id]: Object.assign(data[0], {detailed: true, description: "Some long and boring description of things to do, that gonna annoy any human bein on Earth"}), [data[1].id]: Object.assign(data[1], {detailed: false})
			},
			allIds: [1,2],
			workspace: {
				creation: {},
				deletion: {},
				fetch: {},
				modification: {}
			}
		}
		//using tested code
		expect(test).toEqual(expectation)
	})
	it('should create new task', ()=> {
		const entity = {
		title: 'Resolve your boredom',
		sender: 3,
		senderGroup: 26,
		targetUsers: [62],
		targetGroup: 23,
		deadline: "1994-11-05T08:15:30+02:00"
		}
		const serverRep = {
			title: 'Resolve your boredom',
			sender: 3,
			senderGroup: 26,
			targetUsers: [62],
			targetGroup: 23,
			deadline: "1994-11-05T08:15:30+02:00",
			id: 3,
			status: 'NOT_DONE',
			detailed: true
		}
		const action = basic.responseToRequest(basic.requestOperation('POST_TASK', {userId: 70, entity}), serverRep)
		//now call our api
		expect(tasks(initialState, action).byId[3]).toEqual(serverRep)
	})
	it('should delete task (byId field)', ()=> {
		const action = basic.responseToRequest(basic.requestOperation('DELETE_TASK', {userId: 70, id: 1}))
		expect(tasks(initialState, action).byId[1]).not.toBeDefined()
	})
	it('should delete task allIds field', ()=> {
		const action = basic.responseToRequest(basic.requestOperation('DELETE_TASK', {userId: 70, id: 1}))
		expect(tasks(initialState, action).allIds.length).toBe(1)
	})
})