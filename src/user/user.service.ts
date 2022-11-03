import { USERS } from './user.db'
import { User } from './user.model'

export async function findAllUsers() {
	return USERS
}

export async function findById(id: string | number) {
	if (typeof id === 'string')
		id = parseInt(id)

	return USERS.find(user => user.id === id)
}

export async function addUser(user: User) {
	// user.id = USERS.length
	// USERS.push(user)

	const newUser = {
		...user,
		id: USERS.length + 1
	}

	USERS.push(newUser)

	return newUser
}

export async function updateUser(id: string | number, user: User) {
	if (typeof id === 'string')
		id = parseInt(id)

	const index = USERS.findIndex(user => user.id === id)
	const updatedUser = {
		...user,
		id
	}

	// TODO .splice 
	USERS[index] = updatedUser

	return updatedUser
}

export async function patchUser(id: string | number, user: User) {
	if (typeof id === 'string')
		id = parseInt(id)

	const index = USERS.findIndex(user => user.id === id)
	const originalUser = USERS[index]

	const updatedUser = {
		...originalUser,
		...user,
		id
	}

	// TODO .splice 
	USERS[index] = updatedUser

	return updatedUser
}