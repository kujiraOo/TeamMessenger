import {group} from './schemas'
import {normalize} from 'normalizr'

describe('groups api', () => {

    it('should normalize groups details response', () => {

        const groupDetailsData = {
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

        expect(normalize(groupDetailsData, group)).toEqual(
            {
                entities: {
                    groups: {
                        15: {
                            "id": 15,
                            "name": "cashier leaders",
                            managerGroup: 14,
                            subordinateGroups: [69],
                            users: [77]
                        },
                        14: {
                            "id": 14,
                            "name": "managers"
                        },
                        69: {
                            "id": 69,
                            "name": "cashiers"
                        },
                    },
                    users: {
                        77: {
                            "id": 77,
                            "userName": "bobchen",
                            "firstName": "Bob",
                            "lastName": "Chen"
                        }
                    }
                },
                result: 15
            }
        )
    })
})