import { IncomingMessage, ServerResponse } from 'node:http'
import url from 'node:url'
import { readRequestBody } from '../util/read-request-body'
import { User } from './user.model'
import { addUser, deleteUser, findAllUsers, findById, patchUser, updateUser } from './user.service'

export async function doGet(req: IncomingMessage, res: ServerResponse) {
	if (!req.url) return res.end()

	const parsedUrl = url.parse(req.url, true)
	const pathname = parsedUrl.pathname
	const [, , id] = pathname?.split('/') ?? []

	if (id) {
		const user = await findById(id)
		if (user) {
			res.writeHead(200, {
				'Content-Type': 'application/json'
			})
			res.end(JSON.stringify(user))
		} else {
			res.writeHead(404)
			res.end()
		}
	} else {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		})
		const users = await findAllUsers()
		res.end(JSON.stringify(users))
	}
}

export async function doPost(req: IncomingMessage, res: ServerResponse) {
	if (!req.url) return res.end()

	try {
		const inputUser = await readRequestBody<User>(req)
		const user = await addUser(inputUser)
		res.writeHead(201, {
			'Content-Type': 'application/json'
		})
		res.end(JSON.stringify(user))
	} catch (error) {
		res.writeHead(500)
		res.end((error as Error).message)
	}
}

export async function doPut(req: IncomingMessage, res: ServerResponse) {
	if (!req.url) return res.end()

	const parsedUrl = url.parse(req.url, true)
	const pathname = parsedUrl.pathname
	const [, , id] = pathname?.split('/') ?? []

	try {
		const inputUser = await readRequestBody<User>(req)
		const user = await updateUser(id, inputUser)
		res.writeHead(200, {
			'Content-Type': 'application/json'
		})
		res.end(JSON.stringify(user))
	} catch (error) {
		res.writeHead(500)
		res.end((error as Error).message)
	}
}

export async function doPatch(req: IncomingMessage, res: ServerResponse) {
	if (!req.url) return res.end()

	const parsedUrl = url.parse(req.url, true)
	const pathname = parsedUrl.pathname
	const [, , id] = pathname?.split('/') ?? []

	try {
		const inputUser = await readRequestBody<User>(req)
		const user = await patchUser(id, inputUser)
		res.writeHead(200, {
			'Content-Type': 'application/json'
		})
		res.end(JSON.stringify(user))
	} catch (error) {
		res.writeHead(500)
		res.end((error as Error).message)
	}
}

export async function doDelete(req: IncomingMessage, res: ServerResponse) {
	if (!req.url) return res.end()

	const parsedUrl = url.parse(req.url, true)
	const pathname = parsedUrl.pathname
	const [, , id] = pathname?.split('/') ?? []

	try {
		await deleteUser(id)
		res.writeHead(204)
		res.end()
	} catch (error) {
		res.writeHead(500)
		res.end((error as Error).message)
	}
}