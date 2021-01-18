function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 * 困难
 */
var recoverTree = function(root) {
  let preNode;
  let back = false
  let backTree, backVal;
  const traverse = (root) => {
    if (root === null) {
      return null
    }
    traverse(root.left)
    if (!preNode) {
      preNode = root
    } else if (preNode.val > root.val) {
      if (back) {
        backTree.val = preNode.val;
        preNode.val = backVal
      }
      const mid = preNode.val
      preNode.val = root.val
      root.val = mid
      backTree = root
      backVal = mid
      back = true
    } else if (!back) {
      preNode = root
    }
    traverse(root.right)
  }
  traverse(root)
};

const recoverTree1 = function(root) {
  const traverse = (root) => {
    if (root === null) {
      return null
    }
    traverse(root.left)
    traverse(root.right)
  }
}
