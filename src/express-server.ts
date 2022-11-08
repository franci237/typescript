import express from 'express'
import { findAllUsers, findById } from './user/user.service'

const PORT = process.env.EXPRESS_PORT || 8081

export function runExpressServer() {
	const app = express()

	app.get('/users/:userId', async (req, res) => {
		const id = req.params.userId
		const user = await findById(id)
		if (user)
			res.send(user)
		else
			res.sendStatus(404)
	})

	app.get('/users', async (req, res) => {
		const users = await findAllUsers()
		res.send(users)
	})

	app.get('/', (req, res) => {
		res.send('Hello World!')
	})

	app.listen(PORT, () => console.log(`Express Server ready at http://localhost:${PORT}`))
}