// Module imports
import { SlashCommandBuilder } from '@discordjs/builders'





// Local imports
import { capitalise } from '../helpers/capitalise.js'





export class Command {
	/****************************************************************************\
	 * Instance properties
	\****************************************************************************/

	command = null
	config = {}





	/****************************************************************************\
	 * Public methods
	\****************************************************************************/

	#build() {
		this.command = new SlashCommandBuilder()
		this.command.setName(this.name)
		this.command.setDescription(this.description)

		if (this.options) {
			this.options.forEach(optionConfig => {
				const optionHandler = `add${capitalise(optionConfig.type)}Option`

				this.command[optionHandler](option => {
					option.setName(optionConfig.name)
					option.setDescription(optionConfig.description)

					if (optionConfig.choices) {
						choices.forEach(choice => {
							option.addChoice(...choice)
						})
					}

					if (optionConfig.isRequired) {
						option.setRequired(true)
					}

					return option
				})
			})
		}
	}

	constructor(config) {
		this.config = config
		this.execute = this.config.execute.bind(this)
		this.#build()
	}

	execute = () => {
		console.error('No execution method set.')
	}





	/****************************************************************************\
	 * Getters
	\****************************************************************************/

	get description() {
		return this.config.description
	}

	get name() {
		return this.config.name
	}

	get options() {
		return this.config.options
	}
}
