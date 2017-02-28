import users from './users'

describe('Reducers: users', () => {

    const initialState = {
        byId: {},
        usersByNameFilter: '',
        selectedUserDetails: null
    }

    it('should provide initial state', () => {

        expect(users(undefined, {})).toEqual(initialState)
    })

    it('should handle UPDATE_USERS action', () => {

        expect(users(initialState, {
            type: 'UPDATE_USERS', users: {
                1: {id: 1, name: 'cashiers'},
                2: {id: 2, name: 'storage'}
            }
        })).toEqual(
            {
                byId: {
                    1: {id: 1, name: 'cashiers'},
                    2: {id: 2, name: 'storage'}
                },
                usersByNameFilter: '',
                selectedUserDetails: null
            }
        )
    })

    it('should handle SET_USERS_BY_NAME_FILTER', () => {

        expect(users(initialState, {type: 'SET_USERS_BY_NAME_FILTER', filterValue: 'some user'}))
            .toEqual(
                {
                    byId: {},
                    usersByNameFilter: 'some user',
                    selectedUserDetails: null
                }
            )
    })
})