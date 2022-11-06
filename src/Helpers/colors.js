export const hexcodeToRGBA = (hexcode, alpha = 1.0) => {
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i

	const replacedHexcode = hexcode.replace(shorthandRegex, (m, r, g, b) => {
		return r + r + g + g + b + b
	})

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
		replacedHexcode
	)

	if (result) {
		const red = parseInt(result[1], 16)
		const green = parseInt(result[2], 16)
		const blue = parseInt(result[3], 16)

		return `rgba(${red}, ${green}, ${blue}, ${alpha})`
	}

	return hexcode
}
