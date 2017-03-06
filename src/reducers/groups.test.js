import groups from './groups'

describe('Reducers: groups', () => {

    const initialState = {
        byId: {},
        groupsByNameFilter: '',
        selectedGroupDetails: null
    }

    it('should provide initial state', () => {

        expect(groups(undefined, {})).toEqual(initialState)
    })

    it('should handle UPDATE_GROUPS action', () => {

        expect(groups(initialState, {
            type: 'UPDATE_GROUPS', groups: {
                1: {id: 1, name: 'cashiers'},
                2: {id: 2, name: 'storage'}
            }
        })).toEqual(
            {
                byId: {
                    1: {id: 1, name: 'cashiers'},
                    2: {id: 2, name: 'storage'}
                },
                groupsByNameFilter: '',
                selectedGroupDetails: null
            }
        )
    })

    it('should handle SET_GROUPS_BY_NAME_FILTER', () => {

        expect(groups(initialState, {type: 'SET_GROUPS_BY_NAME_FILTER', filterValue: 'some group'}))
            .toEqual(
                {
                    byId: {},
                    groupsByNameFilter: 'some group',
                    selectedGroupDetails: null
                }
            )
    })
})