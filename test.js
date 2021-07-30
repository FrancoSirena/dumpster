function transverseInOrder(node, visit) {
  if (node) {
    transverseInOrder(node.left, visit);
    visit(node);
    transverseInOrder(node.right, visit);
  }
}

function Tree(x) {
  this.value = x;
  this.left = null;
  this.right = null;

}



function transversePreOrder(node, visit) {
  if (node) {
    visit(node);
    transversePreOrder(node.left, visit);
    transversePreOrder(node.right, visit);
  }
}

function transversePostOrder(node, visit) {
  if (node) {
		transversePreOrder(node.left, visit);
    transversePreOrder(node.right, visit);
    visit(node);
  }
}

function restoreBinaryTree(inorder, preorder) {
	if (preorder.length === 0) return null;
   
	// removes the root value from preorder
	const tree = new Tree(preorder.shift());
	
	// look for middle of the current tree, which is the tree root
	const pointer = inorder.indexOf(tree.value);
	// everything to the left is what happens left to the root
	const inorder_left = inorder.slice(0, pointer);
	// the pre operations, as we don't have a pin, we simply use the same size as the inorder
	const preorder_left = preorder.slice(0, inorder_left.length);
	// everything from the root is what happens to the right
	const inorder_right = inorder.slice(pointer + 1);
	// everything after the left pre operations is a right preorder operation
	const preorder_right = preorder.slice(preorder_left.length, preorder_left.length + inorder_right.length);

	// restore the left side of the tree with the left operations
	tree.left = restoreBinaryTree(inorder_left, preorder_left);
	// restore the right side of the tree with the right operations
	tree.right = restoreBinaryTree(inorder_right, preorder_right);
	
	return tree;
}

if (require.main === module) {
  const [b] = process.argv.slice(2);
  if (b === "--run") {
    console.log(
      restoreBinaryTree([6, 5, 8, 7, 2, 1, 3], [1, 2, 5, 6, 7, 8, 3])
    );
    return null;
  }
  const tt = new Tree(5);
	tt.left = new Tree(3)
	tt.left.left = new Tree(1)
	tt.left.right = new Tree(4)
	tt.left.right.right = new Tree(15)
	tt.left.right.left = new Tree(19)
	tt.left.right.left.left = new Tree(22)
	tt.left.right.right.right = new Tree(18)
	tt.left.right.right.right.right = new Tree(25)
	tt.left.right.right.right.left = new Tree(27)
	tt.left.right.right.left = new Tree(21)

	tt.right = new Tree(7)
	tt.right.right = new Tree(2)
	tt.right.right.right = new Tree(34)
	tt.right.right.left = new Tree(35)
	tt.right.right.left.right = new Tree(36)
	tt.right.left = new Tree(11)
	tt.right.left.right = new Tree(12)
	tt.right.left.left = new Tree(31)
	tt.right.left.right.right = new Tree(40)
	tt.right.left.right.left = new Tree(29)
  
	console.log(JSON.stringify(tt))

  let res = [];

  transversePreOrder(tt, (node) => node && res.push(node.value));
  console.log('PRE ', res.map(r => `0${r}`.slice(-2)).join(', '));
	console.log();
  console.log();
  res = [];
  transverseInOrder(tt, (node) => node && res.push(node.value));
  console.log('IN  ', res.map(r => `0${r}`.slice(-2)).join(', '));
  console.log();
  console.log();
	res = [];
  transversePostOrder(tt, (node) => node && res.push(node.value));
  console.log('POST', res.map(r => `0${r}`.slice(-2)).join(', '));
}
