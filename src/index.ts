import http from 'node:http'
import url from 'node:url'

// import { doDelete, doGet, doPatch, doPost, doPut } from './user/user.controller'
import * as userController from './user/user.controller'

const PORT = 8080

http.createServer(async (req, res) => {
	if (!req.url) return res.end()

	const parsedUrl = url.parse(req.url, true)
	const pathname = parsedUrl.pathname
	const [, resource] = pathname?.split('/') ?? []
	const method = req.method?.toUpperCase() ?? ''

	// GET http://localhost:8080/users
	// GET http://localhost:8080/users/1 [id=1]
	// POST http://localhost:8080/users { name: 'Paperoga' }
	if (resource === 'users') {
		if (method === 'GET') {
			await userController.doGet(req, res)
		} else if (method === 'POST') {
			await userController.doPost(req, res)
		} else if (method === 'PUT') {
			// PUT http://localhost:8080/users/:id { name: 'Paperoga' }
			await userController.doPut(req, res)
		} else if (method === 'PATCH') {
			// PATCH http://localhost:8080/users/:id { name: 'Paperoga' }
			await userController.doPatch(req, res)
		} else if (method === 'DELETE') {
			// DELETE http://localhost:8080/users/:id
			await userController.doDelete(req, res)
		} else {
			res.writeHead(405)
			res.end()
		}
	} else {
		res.writeHead(404)
		res.end()
	}
})
	.listen(8080)
	.on('listening', () => console.log(`Server ready at http://localhost:${PORT}`))