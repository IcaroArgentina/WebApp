import theme from "../../../../Theme/base"

export function successToast(content, list) {
	return {
		id: list.length + 1,
		content: content,
		backgroundColor: "#2EBE16",
	}
}

export function errorToast(content, list) {
	return {
		id: list.length + 1,
		content: content,
		backgroundColor: theme.color.redError,
	}
}
