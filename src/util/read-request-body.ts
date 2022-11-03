import { IncomingMessage } from 'node:http'

export function readRequestBody<T>(req: IncomingMessage) {
	return new Promise<T>((resolve, reject) => {
		let data = ''
		req
			.on('data', chunk => data += chunk.toString())
			.on('end', () => {
				resolve(JSON.parse(data) as T)
			})
			// .on('error', error => {
			// 	reject(error)
			// })
			// .on('error', error => reject(error))
			.on('error', reject)
	})
}