import fs from 'node:fs/promises'
import path from 'node:path'

import { User } from './user.model'

const USER_COLLECTION_PATH = path.join('db', 'users.json')

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
}

export async function updateUser(id: string | number, user: User) {
	if (typeof id === 'string')
		id = parseInt(id)
}

export async function patchUser(id: string | number, user: User) {
	if (typeof id === 'string')
		id = parseInt(id)
}

export async function deleteUser(id: string | number) {
	if (typeof id === 'string')
		id = parseInt(id)
}