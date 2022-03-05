// Module imports
import 'dotenv/config'
import {
	Client,
	Intents,
} from 'discord.js'





// Local imports
import { commands } from './commands/index.js'
import { logger } from './helpers/logger.js'
import { reactionRoles } from './reactionRoles.js'





// Create a new client instance
const client = new Client({
	intents: [
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILDS,
	],
	partials: [
		'CHANNEL',
		'MESSAGE',
		'REACTION',
	],
})

// When the client is ready, run this code (only once)
client.once('ready', () => {
	logger.info('Ready!')
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return

	const { commandName } = interaction

	if (commands[commandName]) {
		logger.info(`Executing ${commandName} command...`)
		await commands[commandName].execute(interaction)
		logger.info(`Done.`)
	} else {
		await interaction.reply('Command not recognized.')
	}
})

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (error) {
			logger.error(error)
			return
		}
	}

	if (reactionRoles[reaction.message.id]) {
		const reactionRole = reactionRoles[reaction.message.id]

		const guild = client.guilds.resolve(reaction.message.guildId)
		const guildMember = guild.members.fetch(user)
		const role = guild.roles.resolve(reactionRole.roleID)

		await guildMember.roles.add(role)
	}
})

client.on('messageReactionRemove', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (error) {
			logger.error(error)
			return
		}
	}

	if (reactionRoles[reaction.message.id]?.removeOnUnreact) {
		const allReactions = reaction.message.reactions.cache

		const userHasReactionsOnMessage = allReactions.some(otherReaction => {
			return otherReaction
				.users
				.cache
				.some(reactionUser => reactionUser.id === user.id)
		})

		if (!userHasReactionsOnMessage) {
			const reactionRole = reactionRoles[reaction.message.id]

			const guild = client.guilds.resolve(reaction.message.guildId)
			const guildMember = guild.members.resolve(user.id)
			const role = guild.roles.resolve(reactionRole.roleID)

			await guildMember.roles.remove(role)
		}
	}
})

client.login(process.env.DISCORD_TOKEN)
