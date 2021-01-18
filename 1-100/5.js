/**
 * @param {string} s
 * @return {string}
 * 中等
 */
var longestPalindrome = function(s) {
  const db = [[true]]
  let maxStr = ''
  for (let i = 0; i< s.length; i++) {
    for (let j = 0; j <= i; j++) {
      if (i === j) {
        db[i][j] = true
      } else if (s[i] === s[j] && db[i-1][j+1])
    }
  }

};

longestPalindrome('babad')
