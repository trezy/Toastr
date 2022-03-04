// Module imports
import 'dotenv/config'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'





// Local imports
import { commands } from '../src/commands/index.js'





try {
	const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)

	await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), {
		body: Object.values(commands).map(commandObject => {
			return commandObject.command.toJSON()
		}),
	})
	console.log('Successfully registered application commands.')
} catch (error) {
	console.error(error)
}
