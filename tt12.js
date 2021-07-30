const fs = require("fs");

let countA = 0
let countB = 0

function transverse(node, side, visit, c) {
	if (node) {
		c === 'A' && countA++
		c === 'B' && countB++
		visit(node, side)
		transverse(node.left, 'left', visit,c)
		transverse(node.right, 'right', visit,c)
	}
}

function isTreeSymmetric(t) {
	if (!t) {
			return true
	}
	const vv = {}
	const visit = (node, side) => {
			if (!vv[`N${side}${countA}`]) {
				vv[`N${side}${countA}`] = new Set()
			}
			vv[`N${side}${countA}`].add(node.value)
	}
	transverse(t.left, 'right', visit, 'A')
	const visitL = (node, side) => {
			const inv = side === 'right' ? 'left': 'right'
			console.log(vv, `N${inv}${countB}`, node.value)
			if (!vv[`N${inv}${countB}`].has(node.value)) {
					console.log(vv, `N${inv}${countB}`, node.value)
					throw new Error('Not Equal')
			}
	}
	try {
			transverse(t.right, 'left',  visitL, 'B')
			console.log(countB, countA)
			return countB === countA
	} catch (e) {
			console.log(e)
			return false
	}
}


function handle(t, s) {

	console.log(t.value)
	transverse(t.left, 'left', (node, side, size) => {
		const c = side === 'right'? '\\' :  '/'
		console.log(' '.repeat(countA), c, node.value)
	}, 'A' )

	console.log()
	console.log()
	console.log(t.value)
	transverse(t.right, 'right', (node, side, size) => {
		const c = side === 'right'? '\\' :  '/'
		console.log(' '.repeat(countB), c, node.value)
	}, 'B' )

}

if (require.main === module) {
	const b = process.argv.slice(2)
  const f = fs.readFileSync("./test-8.json");
  const json = JSON.parse(f.toString());
	if (b.includes('--print')) {
		console.log(b)
		console.log(handle(json.input.t))
	}
  // console.log(isTreeSymmetric(json.input.t, json.input.s));
}
