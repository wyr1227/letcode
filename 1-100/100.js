function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 * 简单
 */
var isSameTree = function(p, q) {
  const ptree1 = []
  const qtree1 = []
  const traverse = (root, arr) => {
    if (root === null) {
      arr.push(null)
      return null
    }
    arr.push(root.val)
    traverse(root.left, arr)
    traverse(root.right, arr)
  }
  traverse(p, ptree1)
  traverse(q, qtree1)
  return ptree1.length === qtree1.length  && ptree1.toString() === qtree1.toString()
};

var isSameTree1 = function(p, q) {

}
