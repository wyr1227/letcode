/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 简单
 */
var twoSum = function(nums, target) {
  const arr = []
  nums.map(item => (target - item)).forEach((item, index) => {
    if (nums.indexOf(item, index + 1) !== -1 && arr.length === 0) {
      arr.push(index,nums.indexOf(item, index + 1))
    } 
  })
  return arr
};

var twoSum1 = function(nums, target) {
  const obj = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    if (obj.hasOwnProperty(nums[i])) {
      return [obj[nums[i]] ,i]
    } else {
      obj[target - nums[i]] = i
    }
  }
  return []
}

console.log(twoSum1([2, 7, 11, 15], 9))
