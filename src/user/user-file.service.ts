import fs from 'node:fs/promises'
import path from 'node:path'

import { User } from './user.model'

const DB_FOLDER = process.env.DB_FOLDER || 'db'
const DB_FILENAME = process.env.DB_FILENAME || 'users.json'
const USER_COLLECTION_PATH = path.join(DB_FOLDER, DB_FILENAME)

async function readFromCollection() {
	const data = await fs.readFile(USER_COLLECTION_PATH)

	return <User[]>JSON.parse(data.toString())
}

async function writeToCollection(users: User[]) {
	return fs.writeFile(USER_COLLECTION_PATH, JSON.stringify(users))
}

export async function findAllUsers() {
	return readFromCollection()
}

export async function findById(id: string | number) {
	if (typeof id === 'string')
		id = parseInt(id)

	const USERS = await readFromCollection()
	return USERS.find(user => user.id === id)
}

export async function addUser(user: User) {
	const USERS = await readFromCollection()
	const newUser = {
		...user,
		id: USERS.length + 1
	}
	USERS.push(newUser)
	await writeToCollection(USERS)

	return newUser
}

export async function updateUser(id: string | number, user: User) {
	if (typeof id === 'string')
		id = parseInt(id)

	const USERS = await readFromCollection()
	const index = USERS.findIndex(user => user.id === id)
	const updatedUser = {
		...user,
		id
	}
	USERS[index] = updatedUser
	await writeToCollection(USERS)

	return updatedUser
}

export async function patchUser(id: string | number, user: User) {
	if (typeof id === 'string')
		id = parseInt(id)

	const USERS = await readFromCollection()
	const index = USERS.findIndex(user => user.id === id)
	const originalUser = USERS[index]
	const updatedUser = {
		...originalUser,
		...user,
		id
	}
	USERS[index] = updatedUser
	await writeToCollection(USERS)

	return updatedUser
}

export async function deleteUser(id: string | number) {
	if (typeof id === 'string')
		id = parseInt(id)

	const USERS = await readFromCollection()
	const index = USERS.findIndex(user => user.id === id)
	USERS.splice(index, 1)

	return writeToCollection(USERS)
}