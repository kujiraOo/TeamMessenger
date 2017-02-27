import * as actions from './GroupActions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as types from '../constants/ActionTypes'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('GroupActions', () => {

    fetchMock.get('/api/groups', {
        groups: [
            {"id": 1, "name": "management"},
            {"id": 2, "name": "storage leaders"},
            {"id": 3, "name": "cashier leaders"},
            {"id": 4, "name": "cashiers"},
            {"id": 5, "name": "storage"}
        ]
    })

    describe('fetchGroupItems', () => {

        it('fetch group items', () => {

            const expectedActions = [
                {type: types.FETCH_GROUP_ITEMS_REQUEST},
                {
                    type: types.FETCH_GROUP_ITEMS_SUCCESS,
                    groups: {
                        1: {id: 1, name: 'management'},
                        2: {id: 2, name: 'storage leaders'},
                        3: {id: 3, name: 'cashier leaders'},
                        4: {id: 4, name: 'cashiers'},
                        5: {id: 5, name: 'storage'}
                    }
                }
            ]

            const store = mockStore({ok: []})

            store.dispatch(actions.fetchGroupItems())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })
})