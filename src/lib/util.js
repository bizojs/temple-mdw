export function copy(text) {
	try {
		navigator.clipboard.writeText(text)
		return { success: true }
	} catch (e) {
		console.error(e)
		return { success: false }
	}
}

export function clickOutside(node, { ignore } = { ignore: false }) {
	const handleClick = (event) => {
        if (ignore && event.target === document.querySelector(ignore)) return
		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent("outclick"))
		}
	}
    const handleEscape = (event) => {
        if (event.key === "Escape") {
            node.dispatchEvent(new CustomEvent("outclick"))
        }
    }
	document.addEventListener("click", handleClick, true)
	document.addEventListener("keyup", handleEscape, true)
	return {
		destroy() {
            document.removeEventListener("keyup", handleEscape, true)
			document.removeEventListener("click", handleClick, true)
		}
	}
}

export const toDateInputValue = (date) => {
	let local = new Date(date)
	local.setMinutes(date.getMinutes() - date.getTimezoneOffset())
	return local.toJSON().slice(0, 10)
}