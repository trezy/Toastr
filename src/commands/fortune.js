// Module imports
import { MessageEmbed } from 'discord.js'





// Local imports
import { Command } from '../structures/Command.js'
import { fortunes } from '../../data/fortunes.js'





export default new Command({
	// Meta
	name: 'fortune',
	description: 'Get a fortune from Trezy\'s jar!',

	// Functionality
	execute: async interaction => {
		const fortuneIndex = Math.floor(Math.random() * fortunes.length)
		const fortune = fortunes[fortuneIndex] || {}

		const response = new MessageEmbed
		response.setTitle(`🥠 ${fortune.body}`)
		response.addFields({
			name: 'Lucky Numbers',
			value: fortune.luckyNumbers.join(', '),
			inline: true,
		})
		response.addFields({
			name: 'Opened',
			value: fortune.originallyOpened || 'Before 04 March, 2022',
			inline: true,
		})

		await interaction.reply({
			embeds: [response],
		})
	},
})
