// Local imports
import {
	client,
	q,
} from './fauna.js'





export function getFortuneByIndex(index) {
	const functionRef = q.Function('getFortuneByIndex')

	return client.query(q.Call(functionRef, index))
}

export function getFortuneCount() {
	const functionRef = q.Function('getFortuneCount')

	return client.query(q.Call(functionRef))
}

export async function getRandomFortune() {
	const fortuneCount = await getFortuneCount()

	const index = Math.floor(Math.random() * fortuneCount)

	const fortune = await getFortuneByIndex(index)

	return fortune
}
