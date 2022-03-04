// Local imports
import { Command } from '../structures/Command.js'





export default new Command({
	// Meta
	name: 'ping',
	description: 'Replies with pong!',

	// Functionality
	execute: async interaction => {
		await interaction.reply('Pong!')
	},
})
