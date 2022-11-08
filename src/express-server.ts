import express from 'express'
import { findAllUsers, findById } from './user/user.service'

const PORT = process.env.EXPRESS_PORT || 8081

export function runExpressServer() {
	const app = express()

	const urlLogger: express.RequestHandler = (req, res, next) => {
		console.log('Request URL', req.url)
		next()
	}

	const typeLogger: express.RequestHandler = (req, res, next) => {
		console.log('Request Type', req.method)
		next()
	}

	const authChecker: express.RequestHandler = (req, res, next) => {
		if (!req.headers['authorization'])
			res.sendStatus(401)
		else
			next()
	}

	// const loggers = [urlLogger, typeLogger]

	const userIdValidator: express.RequestHandler = (req, res, next) => {
		console.log('M1', req.params.userId)
		if (req.params.userId === '0') {
			res.sendStatus(400)
		} else
			next()
	}

	app.put('/users/:userId', urlLogger, userIdValidator, async (req, res) => {
		console.log('Devo aggiornare', req.params.userId)
		res.sendStatus(200)
	})

	app.get('/users/:userId', urlLogger, userIdValidator, async (req, res) => {
		const id = req.params.userId
		const user = await findById(id)
		
		if (user)
			res.send(user)
		else
			res.sendStatus(404)
	})

	app.get('/users', urlLogger, async (req, res) => {
		const users = await findAllUsers()
		res.send(users)
	})

	app.get('/', (req, res) => {
		res.send('Hello World!')
	})

	const errorMiddleware: express.ErrorRequestHandler = (err, req, res, next) => {
		if (res.headersSent) {
			next(err)
		} else {
			res.status(500)
			console.error(err.stack)
			res.send('Qualcosa è andato storto')
		}
	}
	app.use(errorMiddleware)

	app.listen(PORT, () => console.log(`Express Server ready at http://localhost:${PORT}`))
}