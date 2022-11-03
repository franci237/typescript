import http from 'node:http'
import fs from 'node:fs/promises'
import url from 'node:url'

const PORT = 8080

http.createServer(async (req, res) => {
	// http://localhost:8080/estate.html
	if (!req.url) return res.end()

	const parsedUrl = url.parse(req.url, true)
	const pathname = parsedUrl.pathname

	try {
		const data = await fs.readFile(`pages${pathname}`)
		res.writeHead(200, {
			'Content-Type': 'text/html'
		})
		res.end(data)
	} catch (err) {
		console.error(`Error reading ${pathname}`, err)
		res.writeHead(500)
		if (err instanceof Error)
			return res.end(err.message)
	}

	// fs.readFile(`pages${pathname}`, (err, data) => {
	// 	if (err) {
	// 		console.error(`Error reading ${pathname}`, err)
	// 		res.writeHead(500)
	// 		return res.end(err.message)
	// 	}

	// 	res.writeHead(200, {
	// 		'Content-Type': 'text/html'
	// 	})
	// 	res.end(data)
	// })
})
	.listen(PORT)
	.on('listening', () => console.log(`Server ready at http://localhost:${PORT}`))