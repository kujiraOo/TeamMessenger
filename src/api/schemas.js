import {schema} from 'normalizr'

export const user = new schema.Entity('users')

export const group = new schema.Entity('groups')

group.define({
    users: [user],
    managerGroup: group,
    subordinateGroups: [group]
})

user.define({
    groups: [group]
})

export const groupList = [group]