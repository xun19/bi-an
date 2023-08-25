function dropBottom() {
	const h = document.documentElement.scrollHeight || document.body.scrollHeight
	let currentHeight = 0
	let currentTime = 0
	const acceleration = 5
	const id = setInterval(() => {
		currentTime++
		currentHeight += acceleration * currentTime
		window.scrollTo(h, currentHeight)
		if (currentHeight >= h) {
			clearInterval(id)
		}
	}, 10)
}

class Field {

}

export {
	Field,
	dropBottom
}
