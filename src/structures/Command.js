// Module imports
import { SlashCommandBuilder } from '@discordjs/builders'





export class Command {
	/****************************************************************************\
	 * Instance properties
	\****************************************************************************/

	command = null
	options = {}





	/****************************************************************************\
	 * Public methods
	\****************************************************************************/

	#build() {
		this.command = new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
	}

	constructor(options) {
		this.options = options
		this.execute = this.options.execute.bind(this)
		this.#build()
	}

	execute = () => {
		console.error('No execution method set.')
	}





	/****************************************************************************\
	 * Getters
	\****************************************************************************/

	get description() {
		return this.options.description
	}

	get name() {
		return this.options.name
	}
}
