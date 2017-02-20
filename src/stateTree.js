
//This is the shape of our state 'trees' in the store. 
//Think of this as our database, but for the front-end

const state = {
	authentication: {
		isFetching
		responseFromServer
		loggedin
	}
	userInfo: {
		isHR,
		id,
		userName,
		firstName,
		lastName,
		subGroups: [],
		superGroups: []
	}
	tasklist: {
		isFetching
		isStale
		tasks: [{
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
	issueList: {
		isFetching
		isStale
		issues: [
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
	management: {
		userList: {
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
			isFetching,
			isStale
	}
}