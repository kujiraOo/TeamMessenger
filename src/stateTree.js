
//This is the shape of our state 'trees' in the store. 
//Think of this as our database, but for the front-end

const state = {
	authentication: {
		isFetching
		responseFromServer
		loggedin
		isHR,
		id,
		userName,
		firstName,
		lastName,
		subGroups: [],
		superGroups: []
	}
	tasks: {
		isFetching
		isStale
		data: [{
			id,
			status,
			title,
			content,
			sender: {username, firstName, lastName},
			senderGroup: {id, name},
			targetUsers: [{id, userName, firstName, lastName}],
			targetGroup: {id, name},
			deadline,
			fetchControl: {
				detailed: true || false
				lastFetched
			}
		}]
	}
	issues: {
		isFetching
		isStale
		data: [
		{
			id,
			status,
			sender: {id, userName, firstName, lastName}
			senderGroup: {id, name}
			targetGroup: {id, name}
			title
			content
			fetchControl: {
				detailed: true || false,
				lastfetched
			}
		}]
	}
	users: {
		isFetching,
		isStale,
		data: {
			isFetching,
			isStale,
			users: [
		{
			id, 
			userName, 
			lastName, 
			firstName,
			detailed:
		}
		]
		},
		groupList: {
			groups:[{
			id,
			name,
			size,
			users: []
			subGroups: []
			superGroups: []
			detailed
		}],
	}
	filter: [{
		target,
		flag: [{type, value}]
	}]
	groups: 
	[
	{
		"users": [
		{
			"id": 69,
			"userName": "bobchen",
			"firstName": "Bob",
			"lastName": "Chen"
		}
		],
		"superGroup": {
			"id": 69,
			"name": "cashiers"
		},
		"subGroups": [
		{
			"id": 69,
			"name": "cashiers"
		}
		],
		"id": 69,
		"name": "cashiers"
	}
	]
}
export const todos = createReducer([], {
  [ActionTypes.ADD_TODO](state, action) {
    let text = action.text.trim()
    return [ ...state, text ]
  }
})
function createReducer(initialState, handlers) {
	return (state = initialState, action) => {
		if (handlers.hasOwnProperty(action.type)) //if the set of reducers can handle the action, handle it
			return handlers[action.type](state,action)
		return state //else just do nothing!
	}
}
//handlers look like this
{
	ADD_TODO: addtodo(state, action)
	REMOVE_TODO: removetodo(state, action)
}
//=> handlers[ADD_TODO] == addtodo