/**
 * Notice: 
 * 1.中序遍历二叉搜索树是有序的
 */
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
/**
 * @description 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
 * @param {TreeNode} root
 * @return {boolean}
 * 中等
 */
var isValidBST = function(root) {
  let result = true
  const arr = []
  const traverse = (root) => {
    if (root === null || !result) {
      return null
    }
    traverse(root.left, root.val)
    if (arr.length > 0) {
      if (arr[arr.length - 1] >= root.val) {
        result = false
      } else {
        arr.push(root.val)
      }
    } else {
      arr.push(root.val)
    }
    traverse(root.right, root.val)
  }
  traverse(root)
  return result
};

var isValidBST1 = function(root) {
  let result = true;

  const traverse = (tree, max, min) => {
    if (tree === null || !result) {
      return null
    }
    if (tree.val >= max || tree.val <= min) {
      result = false
      return
    }
    traverse(tree.left, tree.val, min)
    traverse(tree.right, max, tree.val)
  }
  traverse(root, Infinity, -Infinity)

  return result
}

const tree = new TreeNode(2, new TreeNode(1), new TreeNode(3))

console.log(isValidBST(tree))
