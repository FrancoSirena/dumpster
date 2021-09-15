const assert = require('assert')
/*

Islands in ocean

1 0 0 0 0 0
1 1 0 0 0 0
0 0 0 0 0 0


putIsland(x, y) -> current number of island

putIsland(0,0) -> 1
putIsland(1,1) -> 2
putIsland(1, 0) -> 2
//putIsland(0,1) -> 1
 

*/


let islands = new Map()

function assertEqual(x, y) {
    console.log('Trying', x, y)
    assert.equal(x, y)
}

function putIsland(x, y) {
    let temp = new Set()
    let key = `${y}y_${x}x`
    let xRKey = `${y}y_${x+1}x`
    let xLKey = `${y}y_${x-1}x`
    let yTKey = `${y-1}y_${x}x`
    let yBKey = `${y+1}y_${x}x`

    // Checks if any of the neighbors is an island
    // If finds it, deletes the island and connects the island + connected the newly added island
    for (const n of [xRKey, xLKey, yTKey, yBKey]) {
        if (islands.get(n)) {
            temp = new Set([...temp, n, ...islands.get(n)])
            islands.delete(n)
        }
    }

    // Checks if we have any the neighbors is already connected
    // If finds it, deletes the island and connects the island + connected the newly added island
    for (const [k, val] of islands.entries()) {
        for (const n of [xRKey, xLKey, yTKey, yBKey]) {
            if (val.has(n)) {
                temp = new Set([...temp, k, ...val])
                islands.delete(k)
            }
        }
    }
    
    islands.set(key, temp)

    return islands.size
}

assertEqual(putIsland(0, 4), 1)
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 1 0 0 0 0 0

assertEqual(putIsland(0, 2), 2)
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 1 0 0 0 0 0
// 0 0 0 0 0 0
// 1 0 0 0 0 0

assertEqual(putIsland(0, 3), 1)
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 1 0 0 0 0 0
// 1 0 0 0 0 0
// 1 0 0 0 0 0

assertEqual(putIsland(1, 2), 1)
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 1 1 0 0 0 0
// 1 0 0 0 0 0
// 1 0 0 0 0 0


assertEqual(putIsland(3, 0), 2)
// 0 0 0 1 0 0
// 0 0 0 0 0 0
// 1 1 0 0 0 0
// 1 0 0 0 0 0
// 1 0 0 0 0 0


assertEqual(putIsland(5, 0), 3)
// 0 0 0 1 0 1
// 0 0 0 0 0 0
// 1 1 0 0 0 0
// 1 0 0 0 0 0
// 1 0 0 0 0 0

assertEqual(putIsland(4, 0), 2)
// 0 0 0 1 1 1
// 0 0 0 0 0 0
// 1 1 0 0 0 0
// 1 0 0 0 0 0
// 1 0 0 0 0 0

assertEqual(putIsland(4, 1), 2)
// 0 0 0 1 1 1
// 0 0 0 0 1 0
// 1 1 0 0 0 0
// 1 0 0 0 0 0
// 1 0 0 0 0 0

assertEqual(putIsland(4, 2), 2)
// 0 0 0 1 1 1
// 0 0 0 0 1 0
// 1 1 0 0 1 0
// 1 0 0 0 0 0
// 1 0 0 0 0 0

assertEqual(putIsland(4, 4), 3)
// 0 0 0 1 1 1
// 0 0 0 0 1 0
// 1 1 0 0 1 0
// 1 0 0 0 0 0
// 1 0 0 0 1 0

assertEqual(putIsland(4, 3), 2)
// 0 0 0 1 1 1
// 0 0 0 0 1 0
// 1 1 0 0 1 0
// 1 0 0 0 1 0
// 1 0 0 0 1 0

assertEqual(putIsland(3, 2), 2)
// 0 0 0 1 1 1
// 0 0 0 0 1 0
// 1 1 0 1 1 0
// 1 0 0 0 1 0
// 1 0 0 0 1 0

assertEqual(putIsland(2, 2), 1)
// 0 0 0 1 1 1
// 0 0 0 0 1 0
// 1 1 1 1 1 0
// 1 0 0 0 1 0
// 1 0 0 0 1 0

assertEqual(putIsland(0, 0), 2)
// 1 0 0 1 1 1
// 0 0 0 0 1 0
// 1 1 1 1 1 0
// 1 0 0 0 1 0
// 1 0 0 0 1 0

assertEqual(putIsland(0, 1), 1)
// 1 0 0 1 1 1
// 1 0 0 0 1 0
// 1 1 1 1 1 0
// 1 0 0 0 1 0
// 1 0 0 0 1 0

assertEqual(putIsland(2, 4), 2)
// 1 0 0 1 1 1
// 1 0 0 0 1 0
// 1 1 1 1 1 0
// 1 0 0 0 1 0
// 1 0 1 0 1 0

islands = new Map()
for (let i = 0; i < 10000; i += 2) {
    putIsland(0, i)
}

assertEqual(putIsland(0, 500), 5000)

for (let i = 0; i < 10000; i++) {
    putIsland(i, 1)
}

assertEqual(putIsland(0, 500), 4999)
