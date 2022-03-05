// Local imports
import eightBall from './8ball.js'
import fortune from './fortune.js'
import ping from './ping.js'





export const commands = [
	eightBall,
	fortune,
	ping,
].reduce((accumulator, command) => {
	accumulator[command.name] = command
	return accumulator
}, {})
