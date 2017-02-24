import groups from './groups'

describe('Reducers: groups', () => {

    const initialState = {
        byId: {}
    }

    it('should provide initial state', () => {

        expect(groups(undefined, {})).toEqual(initialState)
    })

    it('should handle FETCH_GROUP_ITEMS_SUCCESS action', () => {

        expect(groups(initialState, {type: 'FETCH_GROUP_ITEMS_SUCCESS', groupItems: {
            1: {name: 'cashiers'},
            2: {name: 'storage'}
        }})).toEqual(
            {
                byId: {
                    1: {name: 'cashiers'},
                    2: {name: 'storage'}
                }
            }
        )
    })
})