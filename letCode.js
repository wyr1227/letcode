/**
 * @description 1.两数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const arr = []
  nums.map(item => (target - item)).forEach((item, index) => {
    if (nums.indexOf(item, index + 1) !== -1 && arr.length === 0) {
      arr.push(index,nums.indexOf(item, index + 1))
    } 
  })
  return arr
}
console.log(twoSum([2, 7, 11, 15], 9))

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @description 2.两数相加
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
var addTwoNumbers = function(l1, l2) {
  let node = new ListNode(0)
  let result = node
  while (l1 || l2) {
    const q1 = l1 ? l1.val : 0
    const q2 = l2 ? l2.val : 0
    const sum = (result.val + q1 + q2) - 10
    l1 = l1 ? l1.next : null
    l2 = l2 ? l2.next : null
    if (sum >= 0) {
      result.val = sum
      if (l1 || l2) result.next = new ListNode(1)
    } else {
      result.val = q1 + q2
      if (l1 || l2) result.next = new ListNode(0)
    }
    result = result.next
  }
  return node
};

// 3. 无重复字符的最长子串
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let arr = ''
  let i = 0
  let max = 0
  let len = s.length
  while(i < len) {
    const index = arr.indexOf(s[i])
    if (index === -1) {
      arr += s[i]
    } else {
      arr = arr.substr(index + 1)
      arr += s[i]
    }
    max = Math.max(max, arr.length)
    i++
  }
  return max
};

// 4. 寻找两个有序数组的中位数
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  let m = nums1.length
  let n = nums2.length
  if (m > n) {
    let temp = nums1
    nums1 = nums2
    nums2 = temp 
    let len = m
    m = n
    n = len
  }
  let iMin = 0
  let iMax = m
  let half = (n + m + 1) /2
  while (iMax >= iMin) {
    let i = Math.floor((iMin + iMax) / 2)
    let j = Math.floor(half - i)
    if (iMax > i && nums1[i] < nums2[j - 1]) {
      iMin = i + 1
    } else if (iMin < i && nums1[i - 1] > nums2[j]) {
      iMax = i - 1
    } else {
      let maxLeft = 0
      if (i === 0) { maxLeft = nums2[j - 1] }
      else if (j == 0)  { maxLeft = nums1[i - 1] }
      else { maxLeft = Math.max(nums1[i-1], nums2[j-1]) }
      if ( (m + n) % 2 === 1 ) {
        return maxLeft; 
      }
      let minRight = 0;
      if (i == m) { minRight = nums2[j]; }
      else if (j == n) { minRight = nums1[i]; }
      else { minRight = Math.min(nums2[j], nums1[i]); }

      return (maxLeft + minRight) / 2.0;
    }
  }
};

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const len = s.length
  const arr = [[true]]
  let max = 0
  let obj = {
    start: 0,
    end: 1,
  }
  if (s.length === 0) {
    return s
  }
  for (let i = 1; i < len ; i++) {
    arr[i] = [true]
    for (let j = 0; j <= i; j++) {
      if (i === j) {
        arr[i][j] =true
      } else if (s[i] === s[j] && (arr[i-1][j+1] || arr[i-1][j+1] == null)) {
        arr[i][j] = true
        max = Math.max(max, i - j)
        if (max === i- j) {
          obj.start = j
          obj.end = max + 1
        }
      } else {
        arr[i][j] = false
      }
    }
  }
  return s.substr(obj.start, obj.end)
};

var longestPalindromeTwo = function (s) {
  const len = s.length
  let max = s[0]
  if (s.length <= 1) return s
  for (let i = 0; i < len; i++) {
    for (let j = i +1; j<len; j++) {
      const str = s.substr(i,j-i+1)
      const restr = str.split('').reverse().join('')
      if (str === restr && str.length > max.length) {
        max = str
      }
    }
  }
  return max
}
var longestPalindromeThree =function(s) {
  if (s.length <= 1) return s
  let start = 0, end = 0
  for (let i = 0, len = s.length; i < len; i++) {
    const maxLen = Math.max(findCenter(s, i, i), findCenter(s, i, i + 1))
    if (maxLen > (end - start)) {
      start = i - Math.floor((maxLen - 1) / 2);
      end = i + Math.floor(maxLen / 2);
    }
  }
  function findCenter(s, L, R) {
    while (L >= 0 && R < s.length && s[L] === s[R]) {
      L -= 1
      R += 1
    }
    return R - L - 1
  }
  return s.substring(start, end + 1);
}

// Z字形变换
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  if (numRows < 2 || s.length < 2) return s
  const arr = []
  let nowLen = 0
  let nowCircle = 0
  let life = 2 * numRows - 2
  while (nowLen < numRows) {
    arr[nowLen] = []
    for (let i = nowLen, j = s.length, n = 0; i < j; n++) {
      if (i < numRows || nowCircle === 0) {
        arr[nowLen].push(s[i])
        if (nowCircle === 0) {
          i += life
        } else {
          i += life - (nowLen * 2)
        }
      } else {
        arr[nowLen].push(s[i])
        if (n % 2 !== 0) {
          i += life - ((numRows - nowLen - 1) * 2)
        } else {
          i += life - (nowLen * 2)
        }
      }
    }
    nowLen++
    if (nowLen > Math.floor(numRows / 2)) {
      nowCircle--
    } else if (nowLen < Math.floor(numRows / 2)) {
      nowCircle++
    } else if (numRows % 2 !== 0) {
      nowCircle++
    }
  }
  let sa = arr.map(item => item.join('')).join('')
  return sa
};
var convertOne = function(s, numRows) {
  if (numRows < 2 || s.length < 2) return s
  let arr = []
  let curRow = 0
  let down = false
  for (let i = 0; i < numRows; i++) arr[i] = ''
  for (let i of s) {
    arr[curRow] += i
    if (curRow === 0 || curRow === numRows - 1) {
      down = !down
    }
    curRow += down ? 1 : -1
  }
  return arr.join('')
}

/**
 * @param {number} x
 * @return {number}
 * @description 7. 整数反转
 */
var reverse = function(x) {
  let abs = false
  const arr = []
  if (x >= 0) {
    const str = String(x)
    const len = str.length - 1
    for (let i = len; i >= 0; i--) {
      arr.push(+str[i])
    }
  } else {
    abs = true
    let str = String(Math.abs(x))
    const len = str.length - 1
    for (let i = len; i >= 0; i--) {
      arr.push(+str[i])
    }
  }
  var number = Number(arr.join(''))
  if (abs) {
    number = - number
  }
  if (number > Math.pow(2,32)) {
    return 0
  }
  if (number < -Math.pow(2,32)) {
    return 0
  }
  return number
};

/**
 * @param {string} str
 * @return {number}
 * @description 8.字符串转换整数 (atoi) 
 */
var myAtoi = function(str) {
  const strs = str.trim()
  const arr = strs.match(/^[+-]?\d*/g)
  if (arr) {
    const num = Number(arr[0])
    if (num > 2147483647) return 2147483647
    if (num < -2147483648) return -2147483648
    return num
  }
  return 0
};

/**
 * @param {number} x
 * @return {boolean}
 * @description 9. 回文数
 */
var isPalindrome = function(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false
  let save = 0;
  while (x > save) {
    save = save * 10 + x % 10
   x = Math.floor(x / 10)
  }
  return x === save || x === Math.floor(save / 10)
};

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 * @description 10. 正则表达式匹配
 */
var isMatch = function(s, p) {
  if (p == '') return s == ''

  const firstMatch = (s !== '' && (s[0] === p[0] || p[0] === '.'))
  if (p.length > 1 && p[1] === '*') {
    return (isMatch(s, p.substr(2)) || (firstMatch && isMatch(s.substr(1), p))) 
  } else {
    return firstMatch && isMatch(s.substr(1), p.substr(1))
  }
};

/**
 * @param {number[]} height
 * @return {number}
 * @description 11. 盛最多水的容器
 */
var maxArea = function(height) {
  const len = height.length - 1;
  let maxArea = 0
  let l = 0, r = len
  while(l >= r) {
    maxArea = Math.max(maxArea, Math.min(height[l], height[r]) * (r - l - 1))
    if (height[l] > height[r]) {
      r--
    } else {
      l++
    }
  }
  return maxArea
};

/**
 * @param {number} num
 * @return {string}
 * @description 12. 整数转罗马数字
 */
var intToRoman = function(num) {
  const fu = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
  const nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  let index = 0
  let res = ''
  while(index < fu.length) {
    while (num >= nums[index]) {
      res += fu[index]
      num -= nums[index]
    }
    index++
  }
  return res
};

/**
 * @param {string} s
 * @return {number}
 * @description 13. 罗马数字转整数
 */
var romanToInt = function(s) {
  const fu = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
  const nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  let index = 0
  let res = 0
  while (index < fu.length) {
    if (fu[index].length === 2) {
      while(fu[index] === (s[0] + s[1])) {
        res += nums[index]
        s = s.substr(2)
      }
    } else {
      while(fu[index] === s[0]) {
        res += nums[index]
        s = s.substr(1)
      }
    }
    index++
  }
  return res
};
/**
 * @param {string[]} strs
 * @return {string}
 * @description 14. 最长公共前缀
 */
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) return ''
  let first = strs[0]
  for (let i = 1; i< strs.length; i++) {
    while (strs[i].indexOf(first) !== 0) {
      first = first.substr(0, first.length - 1);
      if (first === '') return ''
    }
  }
  return first
  // const len = strs.length
  // if (len <= 1) return strs[0] ? strs[0] : '';
  // let result = ''
  // let cache
  // let index = 0
  // for (let i = 0; i < len; i++) {
  //   if (strs[i] === '') return ''
  //   if (strs[i][index] == null ) return result
  //   if (i === 0) {
  //     cache = strs[i][index]
  //   } else {
  //     if (cache !== strs[i][index]) return result
  //     if (cache === strs[i][index] && i === len - 1) {
  //       result += cache
  //       index++;
  //       i = -1;
  //     }
  //   }
  // }
  // return result
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 * @description 15. 三数之和
 */
var threeSum = function(nums) {
  const len = nums.length
  if (len < 3) return [];
  const arr = []
  nums.sort((a, b) => a - b)
  if (nums[0] <= 0 && nums[len - 1] >= 0) {
    for (let i = 0; i < len; i++) {
      if(i > 0 && nums[i] == nums[i-1]) continue;
      if (nums[i] > 0) return arr
      let firstIndex = i + 1
      let lastIndex = len - 1
    
      while (lastIndex > firstIndex) {
        const result = nums[lastIndex] + nums[firstIndex] + nums[i]
        if (result === 0) {
          arr.push([nums[lastIndex] , nums[firstIndex] , nums[i]])
          while(firstIndex < lastIndex && nums[lastIndex] === nums[lastIndex-1]) lastIndex--
          while(firstIndex < lastIndex && nums[firstIndex] === nums[firstIndex +1]) firstIndex++
          firstIndex++;
          lastIndex--;
        }
        if (result > 0)  {
          lastIndex--
        }
        if (result < 0) {
          firstIndex++ 
        }
      }
    }
  }
  return arr
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * @description 16. 最接近的三数之和
 */
var threeSumClosest = function(nums, target) {
  let len = nums.length;
  let res;
  nums = nums.sort((a, b) => a - b);
  for (let i = 0; i < len; i++) {
    let L = i + 1
    let R = len - 1
    
    while (R > L) {
      let result = nums[i] + nums[L] + nums[R]
      if (Math.abs(target - result) === 0) {
        return result;
      }
      if (res == null) {
        res = result
      }
      res = Math.abs(target - res) > Math.abs(target - result) ? result : res
      if (result > target) {
        R--;
      }
      if (result < target) {
        L++;
      }
    }
  }
  return res
};

/**
 * @param {string} digits
 * @return {string[]}
 * @description 17. 电话号码的字母组合
 */
var letterCombinations = function(digits) {
  if (digits === '') return []
  const key = {
    2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl',6: 'mno', 7: 'qprs', 8: 'tuv', 9: 'wxyz'
  }
  let result = []
  function back(arr, index) {
    const now = digits.substr(index,1)
    if (now === '') return result.push(arr)
    for(let i = 0; i< key[now].length; i++) {
      back(arr + key[now][i], index + 1)
    }
  }
  back('', 0)
  return result
};


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 * @description 18. 四数之和
 */
var fourSum = function(nums, target) {
  const len = nums.length
  if (len < 3) return [];
  const arr = []
  nums.sort((a, b) => a - b)
  for (let i = 0; i < len; i++) {
    for( let j = i + 1; j < len; j++) {
      let firstIndex = j + 1
      let lastIndex = len - 1
    
      while (lastIndex > firstIndex) {
        const result = nums[lastIndex] + nums[firstIndex] + nums[i] + nums[j]
        if (result === target) {
          arr.push([nums[lastIndex] , nums[firstIndex] , nums[i], nums[j]])
          while(nums[j] === nums[j+1]) j++
          while(nums[i] === nums[i+1]) i++
          while(firstIndex < lastIndex && nums[lastIndex] === nums[lastIndex-1]) lastIndex--
          while(firstIndex < lastIndex && nums[firstIndex] === nums[firstIndex +1]) firstIndex++
          firstIndex++;
          lastIndex--;
        }
        if (result > target)  {
          lastIndex--
        }
        if (result < target) {
          firstIndex++ 
        }
      }
    }
  }
  return arr
};

/**
 * @param {string} s
 * @return {boolean}
 * @description 20. 有效的括号
 */
var isValid = function(s) {
  // let len = s.length
  // if (s === '') return true
  // if (len < 1 || (len % 2 !== 0)) return false
 
  // let reg = /(\(\)|\[\]|{})/g
  // let  cache = s.replace(reg, '')
  // while (cache.length !== len) {
  //   len = cache.length
  //   cache = cache.replace(reg, '')
  // }
  // if (cache === '' ) return true
  // return false
  let len = s.length
  if (s === '') return true
  if (len < 1 || (len % 2 !== 0)) return false
 
  const obj = {
    '(': ')',
    '[': ']',
    '{': '}',
  }
  const arr = []
  for (let i = 0; i < len; i++) {
    if (obj[s[i]]) {
      arr.push(obj[s[i]])
    } else {
      if (arr.pop() !== s[i]){
        return false
      }
    }
  }
  if (arr.length > 0) return false
  return true
};

/**
 * @param {number} n
 * @return {string[]}
 * @description 22. 括号生成
 */
var generateParenthesis = function(n) {
  if (n === 0) return []
  const ar = []
  kuo(ar, '', 0, 0, n)
  function kuo(arr, cur, open, close, num) {
    if (cur.length === num * 2) {
      arr.push(cur)
    }
    if (open < num) {
      kuo(arr, cur + '(', open + 1, close, num)
    }
    if (close < open) {
      kuo(arr, cur + ')', open, close + 1, num)
    }
  }
  return ar
};

/**
 * @param {number[]} nums
 * @return {number}
 * @description 26. 删除排序数组中的重复项
 */
var removeDuplicates = function(nums) {
  if (nums.length <= 1) return nums;
  let firstIndex = 0;
  let lastIndex = nums.length - 1;
  while(firstIndex < lastIndex) {
    if (nums[firstIndex] != null && nums[firstIndex] === nums[firstIndex + 1]) {
      nums.splice(firstIndex, 1)
      firstIndex--
    }
    if (nums[lastIndex] != null && nums[lastIndex] === nums[lastIndex - 1]) {
      nums.splice(lastIndex, 1)
      lastIndex++
    }
    firstIndex++
    lastIndex--
  }
  return nums
};

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 * @deescription 27. 移除元素
 */
var removeElement = function(nums, val) {
  if (nums.length < 1) return 0
  let firstIndex = 0;
  let lastIndex = nums.length - 1;
  while(firstIndex <= lastIndex) {
    if (nums[firstIndex] === val) {
      nums.splice(firstIndex, 1);
      lastIndex--
      firstIndex--
    }
    if (nums[lastIndex] === val) {
      nums.splice(lastIndex, 1) 
    }
    firstIndex++
    lastIndex--
  }
  return nums
};

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 * @description 28. 实现 strStr()
 */
var strStr = function(haystack, needle) {
  if (needle === '' || haystack === needle) return 0;
  let len = haystack.length;
  
  for (let i = 0; i < len; i++) {
    if (haystack.substring(i, i + +needle.length) === needle) return i
  }
  return -1
};

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 * @description 29. 两数相除
 */
var divide = function(dividend, divisor) {
    
};

/**
 * @param {number[]} nums
 * @return {number}
 * @description 45. 跳跃游戏 II
 */
var jump = function(nums) {
  if (nums.length <= 1 ) return 0

  const len = nums.length - 1;
  let max = 0;
  let end = 0;
  let times = 0
  for (let i = 0; i < len; i++) {
    max = Math.max(max, nums[i] + i);
    if (i === end) {
      end = max
      times++
    }
  }
  return times
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 * @description 46. 全排列
 */
var permute = function(nums) {
  if (nums.length < 1) return nums;
  const len = nums.length;
  const result = [];
 
  for(let i = 0; i < len; i++) {
    brea(nums, [nums[i]]) 
  }
  function brea(arr, alArr) {
    if (alArr.length === len) {
      result.push(alArr);
      return
    }
    for (let i = 0; i < len; i++) {
      if (alArr.indexOf(nums[i]) === -1) {
        let copyAl = [...alArr]
        copyAl.push(nums[i])
        brea(arr,copyAl)
      }
    }
  }
  return result
};

/**
 * @param {number[]} nums
 * @return {number}
 * @description 53. 最大子序和
 */
var maxSubArray = function(nums) {
  if (nums.length === 1) {
    return nums[0];
  }
  const dp = []
  let max = nums[0]
  dp[0] = nums[0]
  for (let i = 1, j = nums.length; i < j; i++) {
    dp[i] = Math.max(nums[i] + dp[i -1], nums[i])
  }
  return dp
  // let sum = nums[0]
  // let max = sum 
  // for (let i = 1, j = nums.length; i < j; i++) {
  //     sum = sum >= 0 ? sum + nums[i] : nums[i];
  //     max = Math.max(max, sum)
  // }
  // return max
};



/**
 * @param {number[]} nums
 * @return {boolean}
 * @description 55. 跳跃游戏
 */
var canJump = function(nums) {
  if (nums.length < 2) return true;
  if (nums.indexOf(0) === -1) return true;
  let max = 0;
  let min = 0;
  for (let i = 0, len = nums.length; i < len; i++) {
    min = Math.max(min, nums[i] + i)
    if (i === max) {
      max = min
    }
  }
  if (max >= nums.length - 1) {
    return true
  }
  return false
};


/**
 * @param {number[][]} intervals
 * @return {number[][]}
 * @description 56. 合并区间
 */
var merge = function(intervals) {
  const arr = []
  if (intervals.length === 0) return arr

  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 0, len = intervals.length; i < len; i++) {
    if (arr.length === 0) {
      arr.push(intervals[i])
    } else {
      if (intervals[i][0] <= arr[arr.length - 1][1]) {
        arr[arr.length - 1][1] = arr[arr.length - 1][1] > intervals[i][1] ? arr[arr.length - 1][1] : intervals[i][1];
        arr[arr.length - 1][0] = arr[arr.length - 1][0] < intervals[i][0] ? arr[arr.length - 1][0] : intervals[i][0];
      } else {
        arr.push(intervals[i])
      }
    }
  }
  return arr;
};

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 * @description 62. 不同路径
 */
var uniquePaths = function(m, n) {
  // if (m <= 1 || n <= 1) return 1

  const cur = new Array(n)
  cur.fill(1)
  for (let i = 1; i < n;i++){
    for (let j = 1; j < m; j++){
      cur[j] += cur[j-1] ;
    }
  }
  return cur[n-1];
};

/**
 * @param {number[][]} matrix
 * @return {number[]}
 * @description 54. 螺旋矩阵
 */
var spiralOrder = function(matrix) {
  if (!matrix[0]) return [];

  let top = 0;
  let left = 0;
  let right = matrix[0].length
  let bottom = matrix.length
  let result = [];
  
  while (result.length === matrix[0].length * matrix.length) {

  }
};

/**
 * @param {number[][]} grid
 * @return {number}
 * @description 64. 最小路径和
 */
var minPathSum = function(grid) {
  const db = [];
  let count = grid.length -1 + grid[0].length - 1
  while (count >= 0) {
    db.push([])
    count--
  }
  db[0][0] = grid[0][0]
  for (let i = 0, len = grid.length; i < len; i++) {
    for (let j = 0, len1 = grid[0].length; j < len1; j++) {
      if (i === 0 && j !== 0) {
        db[i][j] = db[i][j - 1] + grid[i][j]
      } else if (i !== 0 && j === 0) {
        db[i][j] = (db[i - 1][j] + grid[i][j])
      } else if (i >= 1 && j >= 1){
        db[i][j] = Math.min(db[i - 1][j] + grid[i][j], db[i][j - 1] + grid[i][j])
      }
    }
  }
  return db[grid.length - 1][grid[0].length - 1]
};

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 * @description 67. 二进制求和
 */
var addBinary = function(a, b) {
  if (b === '0') return a
  let c = (a.length > b.length ? a : b)
  let d = (c === a ? b : a).split('').reverse();
  c = c.split('').reverse();
  let add = false

  for (let i = 0; i < c.length; i++) {
    if (d[i] !== undefined) {
      if (c[i] !== d[i]) {
        c[i] = add ? '0' : '1'
      } else if (c[i] === '1') {
        if (add) {
          c[i] = '1'
        } else {
          add = true
          c[i] = '0'
        }
      } else {
        c[i] = add ? '1' : '0'
        add = false
      }
    } else if (add) {
      if (c[i] === '1') {
        c[i] = '0'
      } else {
        c[i] = '1'
        add = false
      }
    }
  }
  if (add) {
    c.push('1')
  }
  return c.reverse().join('')
};

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 * @description 134. 加油站
 */
var canCompleteCircuit = function(gas, cost) {
  if (gas.length === 0) return 0;

  let sum = 0;
  let maxIndex = 0;
  let maxSum = 0;

  for (let i = 0; i <gas.length; i++) {
    sum += gas[i] - cost[i];
    maxSum += gas[i] - cost[i]
    if (maxSum < 0) {
      maxSum = 0
      maxIndex = i + 1
    }
  }
  if (sum < 0) {
    return -1
  }
  return maxIndex;
};

/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 * @description 209. 长度最小的子数组
 */
var minSubArrayLen = function(s, nums) {
  if (nums.length <= 0) return 0
  let [start, end] = [0, 0]
  let sum = 0
  let ans = Infinity
  while (end < nums.length) {
    sum = sum + nums[end]
    while (sum >= s) {
      ans = Math.min(ans, end - start + 1)
      sum = sum - nums[start]
      start++
    }
    end++
  }
  return ans === Infinity ? 0 : ans
};

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 * @description 718. 最长重复子数组
 */
var findLength = function(A, B) {
  // const dp = Array(A.length)
  // let max = 0
  // for (let i = 0; i < A.length; i++) {
  //   dp[i] = []
  //   for (let j = 0; j < B.length; j++) {
  //     if (A[i] >= 100 || B[j] < 0) {
  //       dp[i][j] = 0
  //       break
  //     }
  //     if (A[i] === B[j]) {
  //       if (dp[i - 1] && dp[i - 1][j - 1] && dp[i-1][j - 1] !== 0) {
  //         dp[i][j] = dp[i-1][j - 1] + 1
  //         max = Math.max(dp[i][j], max)
  //       } else {
  //         dp[i][j] = 1
  //       }
        
  //     } else {
  //       dp[i][j] = 0
  //     }
  //   }
  // }
  // return dp

  var hash = new Array(A.length + 1).fill(0);
    var max = 0;
    var al = A.length;
    var bl = B.length;

    for(var i = 0; i < al; i++) {
        for (var j = bl - 1; j >= 0; j--) {
            if (A[i] === B[j]) {
                hash[j + 1] = hash[j] + 1;
                max = hash[j + 1] > max ? hash[j + 1] : max;
            } else {
                hash[j + 1] = 0;
            }
        }  
    }

    return hash;
};

/**
 * @param {number} shorter
 * @param {number} longer
 * @param {number} k
 * @return {number[]}
 * @description 面试题 16.11. 跳水板
 */
var divingBoard = function(shorter, longer, k) {
  if (k === 0) return [0];
  if (shorter === longer) return [shorter * k]

  const len = k + 1
  const arr = Array(len).fill(longer * k)
  
  for (let i = 0; i < len; i++) {
    arr[i] = arr[i] - ((k - i) * (longer - shorter))
  }
  return arr

};
