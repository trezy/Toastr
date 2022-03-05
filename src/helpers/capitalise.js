export function capitalise(string) {
	const [firstCharacter, ...rest] = string.split('')

	return [
		firstCharacter.toUpperCase(),
		...rest,
	].join('')
}
