import {schema} from 'normalizr'

export const user = new schema.Entity('users')
export const group = new schema.Entity('groups')
export const task = new schema.Entity('tasks')

group.define({
    users: [user],
    managerGroup: group,
    subordinateGroups: [group]
})

user.define({
    groups: [group]
})

task.define({
    sender: user,
    recipients: [user],
    senderGroup: group,
    recipientGroup: group
})
