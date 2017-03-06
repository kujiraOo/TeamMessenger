import {fetchLoginData} from './LoginActions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import {normalize} from 'normalizr'
import * as schemas from '../api/schemas'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Actions: LoginActions', () => {

    const mockAuthData = {
        "id": 1,
        "userName": "hruser",
        "lastName": "Chen",
        "firstName": "Bob",
        "status": "HR_MANAGER",
        "groups": [
            {
                "id": 1,
                "name": "management",
                "managerGroup": {
                    "id": 2,
                    "name": "cashier leaders"
                },
                "subordinateGroups": [
                    {
                        "id": 3,
                        "name": "storage leaders"
                    }
                ]
            }
        ]
    }

    describe('in case of success', () => {

        it('should fetch auth data and dispatch auth actions in case of success and redirect to workspace', () => {

            const store = mockStore({})

            fetchMock.getOnce('/auth', {body: mockAuthData, status: 200})

            const expectedActions = [
                {
                    type: 'FETCH_AUTH_REQUEST',
                    loginData: {username: 'hruser'}
                },
                {
                    type: 'FETCH_AUTH_SUCCESS',
                    statusCode: 200
                },
                {
                    type: 'RECEIVE_AUTH',
                    loggedInUserId: 1
                },
                {
                    type: 'UPDATE_USERS',
                    users: normalize(mockAuthData, schemas.user).entities.users
                },
                {
                    type: 'UPDATE_GROUPS',
                    groups: normalize(mockAuthData, schemas.user).entities.groups
                },
                {"payload": {"to": "/workspace"}, "type": "REDIRECTION"}
            ]

            return store.dispatch(fetchLoginData({username: 'hruser'}))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('should dispatch fetch failure action in case of failure', () => {
            const store = mockStore({})

            fetchMock.getOnce('/auth', {status: 403})

            const expectedActions = [
                {
                    type: 'FETCH_AUTH_REQUEST',
                    loginData: {username: 'hruser'}
                },
                {
                    type: 'FETCH_AUTH_FAILURE',
                    statusCode: 403
                }
            ]

            store.dispatch(fetchLoginData({username: 'hruser'}))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })
})

