const fs = require("fs");
//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

function isEqual(node, node2) {
  if (!node && !node2) {
    return true;
  }
  if (!node || !node2) {
    return false;
  }
  if (node.value === node2.value) {
    return isEqual(node.left, node2.left) && isEqual(node.right, node2.right);
  } else {
    return false;
  }
}

function isSubtree(t1, t2) {
  if (!t2) {
    return true;
  }
  let queue = [t1];
  let visited = new Set();
  let pos;
  let equal = false;

  while (true) {
    while (queue.length > 0) {
      const cur = queue[0];

      if (!cur) {
        break;
      }

      if (cur.value === t2.value && !visited.has(cur)) {
				let proceed = false;
				proceed = !cur.left && !t2.left
				proceed = proceed && (!cur.right && !t2.right)
				if (!proceed) {
					proceed = cur.left && t2.left && cur.left.value === t2.left.value
					proceed = proceed && cur.right && t2.right && cur.right.value === t2.right.value
				}
				if (proceed) {
					console.log(cur, t2)
					visited.add(cur);
					break;
				}
				visited.add(cur);
      }
      if (cur.left) {
        queue.push(cur.left);
      }
      if (cur.right) {
        queue.push(cur.right);
      }

      queue.shift();
    }

    pos = queue.shift();
    if (!pos) {
      break;
    }
    equal = isEqual(pos, t2);

		if (equal) {
			break
		}

    queue = [pos];
  }
  return equal;
}

if (require.main === module) {
  const file = fs.readFileSync("./is-sub.json");
  const json = JSON.parse(file.toString());
  console.log(isSubtree(json.input.t1, json.input.t2));
}
