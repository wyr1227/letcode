/**
 * Notice: *
 */
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
/**
 * @description 给定一个整数 n，生成所有由 1 ... n 为节点所组成的 二叉搜索树 。
 * @param {number} n
 * @return {TreeNode[]}
 * 中等
 */
var generateTrees = function(n) {
  if (n === 0) return []
  return traverse(1, n)
};

const traverse = (start, end) => {
  const resultTree = []
  if (start > end) {
    resultTree.push(null)
    return resultTree
  }
  for (let i = start; i <= end; i++) {
    let leftTree = traverse(start, i - 1)
    let rightTrree = traverse(i + 1, end)
    for (let leftNode of leftTree) {
      for (let rightNode of rightTrree) {
        const curryTree = new TreeNode(i, leftNode, rightNode)
        resultTree.push(curryTree)
      }
    }
  }
  return resultTree
}
