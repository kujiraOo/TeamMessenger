import * as types from '../constants/ActionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {fetchTasks, fetchTask} from './TaskActions'
import {normalize} from 'normalizr'
import {task as taskSchema} from '../api/schemas'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Actions: TaskActions', () => {

    describe('Fetches tasks related data and dispatches actions to the store', () => {

        describe('Fetching from GET /tasks success', () => {

            const tasksData = [
                {
                    "content": "Please send me detailed report on quality of raw material",
                    "created": "2017-03-06T15:58:18+02:00",
                    "deadline": "2017-11-05T08:15:30+02:00",
                    "id": 1,
                    "recipientGroup": {
                        "id": 2,
                        "name": "Raw Material Operator",
                        "status": "ACTIVE"
                    },
                    "recipients": [
                        {
                            "firstName": "Ope",
                            "id": 7,
                            "lastName": "Rator",
                            "status": "ACTIVE",
                            "userName": "operator2"
                        },
                        {
                            "firstName": "Matti",
                            "id": 6,
                            "lastName": "Pekkonen",
                            "status": "HR_MANAGER",
                            "userName": "operator1"
                        }
                    ],
                    "sender": {
                        "firstName": "Arseni",
                        "id": 3,
                        "lastName": "Kurilov",
                        "status": "ACTIVE",
                        "userName": "arseniKu"
                    },
                    "senderGroup": {
                        "id": 1,
                        "name": "Salad Line Manager",
                        "status": "ACTIVE"
                    },
                    "status": "IN_PROGRESS",
                    "title": "Report"
                },
                {
                    "content": "Today your area receives new worker. What is your opinion about him?",
                    "created": "2017-03-06T16:00:20+02:00",
                    "deadline": "2017-11-05T08:15:30+02:00",
                    "id": 2,
                    "recipientGroup": {
                        "id": 2,
                        "name": "Raw Material Operator",
                        "status": "ACTIVE"
                    },
                    "recipients": [
                        {
                            "firstName": "Matti",
                            "id": 6,
                            "lastName": "Pekkonen",
                            "status": "HR_MANAGER",
                            "userName": "operator1"
                        }
                    ],
                    "sender": {
                        "firstName": "Dang",
                        "id": 2,
                        "lastName": "Nguyen",
                        "status": "ACTIVE",
                        "userName": "dangNg"
                    },
                    "senderGroup": {
                        "id": 1,
                        "name": "Salad Line Manager",
                        "status": "ACTIVE"
                    },
                    "status": "IN_PROGRESS",
                    "title": "Report employee progress"
                },
                {
                    "content": "Today your area receives new worker. What is your opinion about him?",
                    "created": "2017-03-06T16:00:50+02:00",
                    "deadline": "2017-11-05T08:15:30+02:00",
                    "id": 3,
                    "recipientGroup": {
                        "id": 4,
                        "name": "Trimming Operator",
                        "status": "ACTIVE"
                    },
                    "recipients": [
                        {
                            "firstName": "Ope",
                            "id": 10,
                            "lastName": "Rator",
                            "status": "ACTIVE",
                            "userName": "operator3"
                        },
                        {
                            "firstName": "Ope",
                            "id": 11,
                            "lastName": "Rator",
                            "status": "ACTIVE",
                            "userName": "operator4"
                        }
                    ],
                    "sender": {
                        "firstName": "Dang",
                        "id": 2,
                        "lastName": "Nguyen",
                        "status": "ACTIVE",
                        "userName": "dangNg"
                    },
                    "senderGroup": {
                        "id": 1,
                        "name": "Salad Line Manager",
                        "status": "ACTIVE"
                    },
                    "status": "IN_PROGRESS",
                    "title": "Report employee progress"
                },
                {
                    "content": "Today your area receives new worker. What is your opinion about him?",
                    "created": "2017-03-06T16:01:14+02:00",
                    "deadline": "2017-11-05T08:15:30+02:00",
                    "id": 4,
                    "recipientGroup": {
                        "id": 6,
                        "name": "Hygiene Operator",
                        "status": "ACTIVE"
                    },
                    "recipients": [
                        {
                            "firstName": "Ope",
                            "id": 14,
                            "lastName": "Rator",
                            "status": "ACTIVE",
                            "userName": "operator5"
                        },
                        {
                            "firstName": "Ope",
                            "id": 15,
                            "lastName": "Rator",
                            "status": "ACTIVE",
                            "userName": "operator6"
                        }
                    ],
                    "sender": {
                        "firstName": "Dang",
                        "id": 2,
                        "lastName": "Nguyen",
                        "status": "ACTIVE",
                        "userName": "dangNg"
                    },
                    "senderGroup": {
                        "id": 1,
                        "name": "Salad Line Manager",
                        "status": "ACTIVE"
                    },
                    "status": "IN_PROGRESS",
                    "title": "Report employee progress"
                },
                {
                    "content": "Today your area receives new worker. What is your opinion about him?",
                    "created": "2017-03-06T16:01:44+02:00",
                    "deadline": "2017-11-05T08:15:30+02:00",
                    "id": 5,
                    "recipientGroup": {
                        "id": 2,
                        "name": "Raw Material Operator",
                        "status": "ACTIVE"
                    },
                    "recipients": [
                        {
                            "firstName": "Ope",
                            "id": 7,
                            "lastName": "Rator",
                            "status": "ACTIVE",
                            "userName": "operator2"
                        },
                        {
                            "firstName": "Matti",
                            "id": 6,
                            "lastName": "Pekkonen",
                            "status": "HR_MANAGER",
                            "userName": "operator1"
                        }
                    ],
                    "sender": {
                        "firstName": "Dang",
                        "id": 2,
                        "lastName": "Nguyen",
                        "status": "ACTIVE",
                        "userName": "dangNg"
                    },
                    "senderGroup": {
                        "id": 1,
                        "name": "Salad Line Manager",
                        "status": "ACTIVE"
                    },
                    "status": "IN_PROGRESS",
                    "title": "Report on new employee"
                },
                {
                    "content": "Please report progress of your moring shift",
                    "created": "2017-03-06T16:02:47+02:00",
                    "deadline": "2017-11-05T08:15:30+02:00",
                    "id": 6,
                    "recipientGroup": {
                        "id": 2,
                        "name": "Raw Material Operator",
                        "status": "ACTIVE"
                    },
                    "recipients": [
                        {
                            "firstName": "Ope",
                            "id": 7,
                            "lastName": "Rator",
                            "status": "ACTIVE",
                            "userName": "operator2"
                        },
                        {
                            "firstName": "Matti",
                            "id": 6,
                            "lastName": "Pekkonen",
                            "status": "HR_MANAGER",
                            "userName": "operator1"
                        }
                    ],
                    "sender": {
                        "firstName": "Arseni",
                        "id": 3,
                        "lastName": "Kurilov",
                        "status": "ACTIVE",
                        "userName": "arseniKu"
                    },
                    "senderGroup": {
                        "id": 1,
                        "name": "Salad Line Manager",
                        "status": "ACTIVE"
                    },
                    "status": "IN_PROGRESS",
                    "title": "Report progress"
                },
                {
                    "content": "You break the machine this morning, report to me what happened",
                    "created": "2017-03-06T16:03:40+02:00",
                    "deadline": "2017-11-05T08:15:30+02:00",
                    "id": 7,
                    "recipientGroup": {
                        "id": 2,
                        "name": "Raw Material Operator",
                        "status": "ACTIVE"
                    },
                    "recipients": [
                        {
                            "firstName": "Ope",
                            "id": 7,
                            "lastName": "Rator",
                            "status": "ACTIVE",
                            "userName": "operator2"
                        },
                        {
                            "firstName": "Matti",
                            "id": 6,
                            "lastName": "Pekkonen",
                            "status": "HR_MANAGER",
                            "userName": "operator1"
                        }
                    ],
                    "sender": {
                        "firstName": "Arseni",
                        "id": 3,
                        "lastName": "Kurilov",
                        "status": "ACTIVE",
                        "userName": "arseniKu"
                    },
                    "senderGroup": {
                        "id": 1,
                        "name": "Salad Line Manager",
                        "status": "ACTIVE"
                    },
                    "status": "IN_PROGRESS",
                    "title": "Deport Error"
                },
                {
                    "content": "Because we have a lot of request comming in today, active all salad line and move at the fastest speed possible",
                    "created": "2017-03-06T16:14:42+02:00",
                    "deadline": "2017-11-05T08:15:30+02:00",
                    "id": 11,
                    "recipientGroup": {
                        "id": 2,
                        "name": "Raw Material Operator",
                        "status": "ACTIVE"
                    },
                    "recipients": [
                        {
                            "firstName": "Ope",
                            "id": 7,
                            "lastName": "Rator",
                            "status": "ACTIVE",
                            "userName": "operator2"
                        },
                        {
                            "firstName": "Matti",
                            "id": 6,
                            "lastName": "Pekkonen",
                            "status": "HR_MANAGER",
                            "userName": "operator1"
                        }
                    ],
                    "sender": {
                        "firstName": "Arseni",
                        "id": 3,
                        "lastName": "Kurilov",
                        "status": "ACTIVE",
                        "userName": "arseniKu"
                    },
                    "senderGroup": {
                        "id": 1,
                        "name": "Salad Line Manager",
                        "status": "ACTIVE"
                    },
                    "status": "IN_PROGRESS",
                    "title": "Active all line"
                }
            ]

            fetchMock.getOnce('/tasks', {body: tasksData})

            it('should fetch data and dispatch appropriate actions', () => {

                const store = mockStore({})

                const expectedActions = [
                    {
                        type: 'FETCH_TASKS_REQUEST'
                    },
                    {
                        type: 'FETCH_TASKS_SUCCESS',
                        statusCode: 200
                    },
                    {
                        type: 'RECEIVE_TASKS',
                        tasks: normalize(tasksData, [taskSchema]).entities.tasks
                    },
                    {
                        type: 'UPDATE_GROUPS',
                        groups: normalize(tasksData, [taskSchema]).entities.groups
                    },
                    {
                        type: 'UPDATE_USERS',
                        users: normalize(tasksData, [taskSchema]).entities.users
                    }
                ]

                return store.dispatch(fetchTasks())
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions)
                    })
            })
        })

        describe('Fetching from GET /tasks failure', () => {

            fetchMock.getOnce('/tasks', {status: 403})

            it('should dispatch failure actions', () => {

                const store = mockStore({})

                const expectedActions = [
                    {
                        type: 'FETCH_TASKS_REQUEST'
                    },
                    {
                        type: 'FETCH_TASKS_FAILURE',
                        statusCode: 403
                    }
                ]

                return store.dispatch(fetchTasks())
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions)
                    })
            })
        })

        describe('Fetching from GET /tasks success', () => {

            const taskData = {
                "content": "Please send me detailed report on quality of raw material",
                "created": "2017-03-06T15:58:18+02:00",
                "deadline": "2017-11-05T08:15:30+02:00",
                "id": 1,
                "recipientGroup": {
                    "id": 2,
                    "name": "Raw Material Operator",
                    "status": "ACTIVE"
                },
                "recipients": [
                    {
                        "firstName": "Ope",
                        "id": 7,
                        "lastName": "Rator",
                        "status": "ACTIVE",
                        "userName": "operator2"
                    },
                    {
                        "firstName": "Matti",
                        "id": 6,
                        "lastName": "Pekkonen",
                        "status": "HR_MANAGER",
                        "userName": "operator1"
                    }
                ],
                "sender": {
                    "firstName": "Arseni",
                    "id": 3,
                    "lastName": "Kurilov",
                    "status": "ACTIVE",
                    "userName": "arseniKu"
                },
                "senderGroup": {
                    "id": 1,
                    "name": "Salad Line Manager",
                    "status": "ACTIVE"
                },
                "status": "IN_PROGRESS",
                "title": "Report"
            }

            fetchMock.getOnce('/tasks/1', {body: taskData})

            it('should fetch data and dispatch appropriate actions', () => {

                const store = mockStore({})

                const expectedActions = [
                    {
                        type: 'FETCH_TASK_REQUEST'
                    },
                    {
                        type: 'FETCH_TASK_SUCCESS',
                        statusCode: 200
                    },
                    {
                        type: 'RECEIVE_TASKS',
                        tasks: normalize(taskData, taskSchema).entities.tasks
                    },
                    {
                        type: 'UPDATE_GROUPS',
                        groups: normalize(taskData, taskSchema).entities.groups
                    },
                    {
                        type: 'UPDATE_USERS',
                        users: normalize(taskData, taskSchema).entities.users
                    }
                ]

                return store.dispatch(fetchTask(1))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions)
                    })
            })
        })

        // describe('Fetching from GET /tasks failure', () => {
        //
        //     fetchMock.getOnce('/tasks', {status: 403})
        //
        //     it('should dispatch failure actions', () => {
        //
        //         const store = mockStore({})
        //
        //         const expectedActions = [
        //             {
        //                 type: 'FETCH_TASKS_REQUEST'
        //             },
        //             {
        //                 type: 'FETCH_TASKS_FAILURE',
        //                 statusCode: 403
        //             }
        //         ]
        //
        //         return store.dispatch(fetchTasks())
        //             .then(() => {
        //                 expect(store.getActions()).toEqual(expectedActions)
        //             })
        //     })
        // })
    })
})