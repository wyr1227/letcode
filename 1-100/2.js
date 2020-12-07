/**
 * Notice:
 * 1: 获取完整数字相加碰到大数相加风险和科学计数法影响
 * 2: 判断是否进制当前两数和加上上一次 是否10位进制
 * 3: 最后一次是否进制问题
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * 中等
 */
var addTwoNumbers = function(l1, l2) {
  let result = new ListNode(0)
  let node = result
  while (l1 || l2) {
    const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0)
    let needInc = sum + node.val >= 10
    l2 = l2 ? l2.next : null
    l1 = l1 ? l1.next : null
    node.val += needInc ? sum -10 : sum
    if (l2 || l1 || needInc) {
      node.next = new ListNode(needInc ? 1 : 0)
      node = node.next
    }
  }
  return result
};

function testArr() {
  let one = new ListNode(9)
  one.next = new ListNode(2)
  one.next.next= new ListNode(3)
  one.next.next.next = new ListNode(1)

  let two = new ListNode(9) 
  two.next = new ListNode(9)
  two.next.next = new ListNode(9)
  console.log(addTwoNumbers(one, two))
}

testArr()
