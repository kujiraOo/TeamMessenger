
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

const normalizedTree = {
	authentication: {
		isFetching
		responseFromServer
		loggedin
		isHR,
		id,
		userName,
		firstName,
		lastName,
		subGroups: [id1, id2, id3, id4],
		superGroups: [id1, id2, id3, id4]
	}
	entities: {
		tasks: {
			isFetching: false,
			isStale: false,
			byId: {
				'1' : {
					id: '1',
					status: 'COMPLETED',
					title: 'task number 1',
					content: 'Yo whatsup this is the first task right?',
					sender: senderId,
					senderGroup: senderGroupId,
					targetUsers: [userid, userid2, userid3, ...therest],
					targetGroup: targetGroupId,
					deadline: date,
					detailed: true
				}
			}
			allIds: ['1']
		}
		issues: {
			isFetching: false,
			isState: false,
			byId: {
				'1': {
					id: '1',
					status: 'HANDLED',
					sender: senderId,
					senderGroup: groupId,
					targetGroup: groupId,
					title: 'some title'
					content: 'some content'
					detailed: false
				}
				//other issues
			}
			allIds: ['1']
		}
		groups: {
			isFetching: false,
			isState: false,
			byId: {
				'1': {
					id: '1',
					name: 'group1',
					users: [userid1, userid2, userid 3]
					subGroups: [groupid1, groupid2]
					superGroups: [groupid1]
					detailed: true
				}
				//someother items
				allIds: [id, id, id, id]
			}
		}
		users: {
			isFetching: false,
			isStale: false,
			byId: {
				69: {
					id: 69,
					phoneNumber: "1234567",
					streetAddress: "Somestreet 6 C 66",
					city: "Pompeii",
					postalCode: "02230",
					email: "example@example.com",
					status: "HR_MANAGER",
					userName: "bobchen",
					firstName: "Bob",
					lastName: "Chen",
					managerGroups: [groupid1, groupid2],
					groups: [groupid1, groupid2],
					subordinateGroups: [groupid1, groupid2]
					detailed: true,
				}
				//some other user
			}
			allIds: [id1, id2, id3, id4, ...rest]
		}
	}
}