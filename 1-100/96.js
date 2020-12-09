/**
 * @description 给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？
 * @param {number} n
 * @return {number}
 * 中等
 */
var numTrees = function(n) {
  if (n === 1) return 1;
  if (n === 2) return 2
  return (n-1) * 2 + (n-2) * 2
};