import {group, task} from './schemas'
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

    it('should normalize GET /tasks response', () => {

        const taskData = {
            "content": "Please send me detailed report on quality of raw material",
            "created": "2017-03-06T15:58:18+02:00",
            "deadline": "2017-11-05T08:15:30+02:00",
            "id": 1,
            "recipientGroup": {
                "id": 2,
                "name": "Raw Material Operator",
                "status": "ACTIVE"
            },
            "recipients": [
                {
                    "firstName": "Ope",
                    "id": 7,
                    "lastName": "Rator",
                    "status": "ACTIVE",
                    "userName": "operator2"
                },
                {
                    "firstName": "Matti",
                    "id": 6,
                    "lastName": "Pekkonen",
                    "status": "HR_MANAGER",
                    "userName": "operator1"
                }
            ],
            "sender": {
                "firstName": "Arseni",
                "id": 3,
                "lastName": "Kurilov",
                "status": "ACTIVE",
                "userName": "arseniKu"
            },
            "senderGroup": {
                "id": 1,
                "name": "Salad Line Manager",
                "status": "ACTIVE"
            },
            "status": "IN_PROGRESS",
            "title": "Report"
        }

        expect(normalize(taskData, task)).toEqual({
            entities: {
                tasks: {
                    1: {
                        "content": "Please send me detailed report on quality of raw material",
                        "created": "2017-03-06T15:58:18+02:00",
                        "deadline": "2017-11-05T08:15:30+02:00",
                        "id": 1,
                        "recipientGroup": 2,
                        "recipients": [7, 6],
                        "sender": 3,
                        "senderGroup": 1,
                        "status": "IN_PROGRESS",
                        "title": "Report"
                    }
                },
                users: {
                    7: {
                        "firstName": "Ope",
                        "id": 7,
                        "lastName": "Rator",
                        "status": "ACTIVE",
                        "userName": "operator2"
                    },
                    6: {
                        "firstName": "Matti",
                        "id": 6,
                        "lastName": "Pekkonen",
                        "status": "HR_MANAGER",
                        "userName": "operator1"
                    },
                    3: {
                        "firstName": "Arseni",
                        "id": 3,
                        "lastName": "Kurilov",
                        "status": "ACTIVE",
                        "userName": "arseniKu"
                    }
                },
                groups: {
                    2: {
                        "id": 2,
                        "name": "Raw Material Operator",
                        "status": "ACTIVE"
                    },
                    1: {
                        "id": 1,
                        "name": "Salad Line Manager",
                        "status": "ACTIVE"
                    }
                }
            },
            result: 1
        })
    })
})