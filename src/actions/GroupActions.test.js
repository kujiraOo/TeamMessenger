import * as actions from './GroupActions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as types from '../constants/ActionTypes'
import fetchMock from 'fetch-mock'
import {normalize} from 'normalizr'
import * as schemas from '../api/shemas'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('GroupActions', () => {

    const mockGroupDetailsData = {
        "users": [
            {
                "id": 77,
                "userName": "bobchen",
                "firstName": "Bob",
                "lastName": "Chen"
            }
        ],
        "managerGroup": {
            "id": 14,
            "name": "managers"
        },
        "subordinateGroups": [
            {
                "id": 69,
                "name": "cashiers"
            }
        ],
        "id": 15,
        "name": "cashier leaders"
    }

    const mockGroupItemsData = {
        groups: [
            {"id": 1, "name": "management"},
            {"id": 2, "name": "storage leaders"},
            {"id": 3, "name": "cashier leaders"},
            {"id": 4, "name": "cashiers"},
            {"id": 5, "name": "storage"}
        ]
    }

    fetchMock.get('/api/groups', mockGroupItemsData)
    fetchMock.get('/api/groups/1', mockGroupDetailsData)

    describe('fetchGroupItems', () => {

        it('fetch group items', () => {

            const expectedActions = [
                {type: types.FETCH_GROUP_ITEMS_REQUEST},
                {
                    type: types.UPDATE_GROUPS,
                    groups: normalize(mockGroupItemsData.groups, [schemas.group]).entities.groups
                }
            ]

            const store = mockStore({})

            store.dispatch(actions.fetchGroupItems())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })

    describe('filterGroupsByName', () => {

        it('should return filter by name action', () => {

            expect(actions.filterGroupsByName('some group')).toEqual({
                type: types.SET_GROUPS_BY_NAME_FILTER,
                filterValue: 'some group'
            })
        })
    })

    describe('displayGroupDetails', () => {

        it('should fetch group details and set group details filter value', () => {

            const expectedActions = [
                {type: 'FETCH_GROUP_DETAILS_REQUEST'},
                {type: 'UPDATE_GROUPS', groups: normalize(mockGroupDetailsData, schemas.group).entities.groups},
                {type: 'SELECT_GROUP_DETAILS', groupId: 1}
            ]

            const store = mockStore({})

            store.dispatch(actions.displayGroupDetails(1))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })
})