import * as actions from './GroupActions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as types from '../constants/ActionTypes'
import fetchMock from 'fetch-mock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('GroupActions', () => {

    fetchMock.get('/api/groups', {groups: []})

    describe('fetchGroupItems', () => {

        it('should do something', () => {

            const expectedActions = [
                {type: types.FETCH_GROUP_ITEMS_REQUEST},
                {type: types.FETCH_GROUP_ITEMS_SUCCESS}
            ]

            const store = mockStore({ ok : [] })

            store.dispatch(actions.fetchGroupItems())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })
})