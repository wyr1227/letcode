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
  const traverse = (root, val, type) => {
    if (root === null || !result) {
      return null
    }
    traverse(root.left, root.val, 'left')
    if (type === 'left') {
      if (val <= root.val) result = false
    } else if (type === 'right') {
      console.log(val, root.val)
      if (val >= root.val) result = false
    }
    traverse(root.right, root.val, 'right')
  }
  traverse(root)
  return result
};
const tree = new TreeNode(2, new TreeNode(1), new TreeNode(3))

console.log(isValidBST(tree))