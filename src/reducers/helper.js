import _ from 'lodash/array'
export function updateObject(oldObject = {}, newValues) {
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    //return Object.assign({}, oldObject, newValues);
    let state = {...oldObject, ...newValues};
    return state;
}
export function updateItemInArray(array, itemId, mutator) {
    const updatedItems = array.map(item => {
        if(item.id !== itemId) {
            // Since we only want to update one item, preserve all others as they are now
            return item;
        }

        // Use the provided callback to create an updated item
        const updatedItem = mutator(item);
        return updatedItem;
    });

    return updatedItems;
}
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
/************************COMMON REDUCER**************************/

export function startFetching(state = {isFetching: false}, action) {
    return updateObject(state, {isFetching: true})
}
export function receiveServerStatus(state = {isFetching: true, fetchstatus: 0}, action) {
    const {response} = action.payload
    return updateObject(state, {isFetching: false, fetchstatus: response})
}

/***** higher order *****/
export function makePatchEntityById(detailed) {
    return (state, action) => {
        /*  action = {
            type: SOMETYPE //type matching has been delegated outside. We are interested in the payload only
            payload: {
                //patching data is here
                //some where in this mess is the id field
                id: 'someid'
            }
        } */
        const {id} = action.payload //this is the destructing syntax of ES6
        return updateObject(state, {
            [id] : {...action.payload, detailed}
        })
    }
}
export function addEntitiesById(state, action) {
    //state = {}, action.payload = [...entities]
    let {payload} = action
    let newState = updateObject(state, {});
    let patchEntityById = makePatchEntityById(false); //i think this is the only way the entity have shallow details
    payload.forEach((entity) => {newState = updateObject(newState, patchEntityById(state, {payload: entity}))})
    return newState;
}
export function deleteEntityById(state, action) {
    //state = {}, action.request = {userId, id}
    let newState = updateObject(state, {});
    if (delete newState[action.request.id]) return newState;
    else {
        console.log('Error while deleting entity');
        return state
    }
}
export function deleteEntityAllIds(state, action) {
    //state = [], action = {type, payload: undefined, request: {id, userId}}
    let index = state.indexOf(action.request.id);
    if (index == -1) return state;
    let newState = state.map((elem) => {return elem});
    newState.splice(index, 1);
    return newState;
}
export function addEntityAllIds(state, action) {
    //state = [], action.payload = {id}
    let newState = state.map((id) => {return id});
    return _.uniq([...newState, action.payload.id])
}
export function addEntitiesAllIds(state, action) {
    let newState = state.map((id) => {return id});
    let {payload} = action
    newState = payload.map((entity)=>{return entity.id})
    return _.uniq(newState) //if we push multiple time, the array will not get dupilcations!
}