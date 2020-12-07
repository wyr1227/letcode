/**
 * Notice:
 * 1: 二叉树的(前|中|后)序遍历
 */

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 * 中等
 */
var inorderTraversal = function(root) {
  const result = []
  const traverse = (node) => {
    if (!node) {
      return
    }
    traverse(node.left)
    if (node.val !== null && node.val !== undefined) {
      result.push(node.val)
    }
    traverse(node.right)
  }
  traverse(root)
  return result
};

var inorderTraversal1 = function(root) {
  const result = []
  let rootNode = root
  const stag = []
  while(rootNode || stag.length > 0) {
    if (rootNode) {
      stag.push(rootNode)
      rootNode = rootNode.left
    } else {
      rootNode = stag.pop()
      if (rootNode.val !== null && rootNode.val !== undefined) {
        result.push(rootNode.val)
      }
      rootNode = rootNode.right
    }
  }
  return result
}

