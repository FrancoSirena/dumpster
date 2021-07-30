const assert = require('assert')

function handler(str) {
	let sizes = [1, str.length-2, 1]
	const res = new Set()

	let move = 1

	while (true) {
		const a = str.substr(0, sizes[0])
		const b = str.substr(sizes[0], sizes[1])
		const c = str.substr(sizes[1] + sizes[0], sizes[2])
		
		if (`${a}${b}` !== `${b}${c}`) {
			res.add(`${a}-${b}-${c}`)
		}

		sizes[move]--
		sizes[move-1]++

		if (sizes[move] === 0) {
			if (move === 2) {
				break
			}
			sizes = [1, 1, str.length-2]
			move = 2
		}
	}
	return res.size
}



if (require.main === module) {
	assert.strictEqual(handler('francosir'), 13)
	assert.strictEqual(handler('xxx'), 0)
	assert.strictEqual(handler('franfran'), 11)
	assert.strictEqual(handler('xzxzx'), 5)
	assert.strictEqual(handler('aiushdiuahdiahsiudhauisdhuiahduiahiudhauhduihaiushuiahuihadsdjkjxcxc'), 131)
}