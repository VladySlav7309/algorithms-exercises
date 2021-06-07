/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const merge = (leftSortedArray, rightSortedArray) => {
  let result = [];
  while (rightSortedArray.length && leftSortedArray.length) {
    if (leftSortedArray[0] <= rightSortedArray[0]) {
      result.push(leftSortedArray.shift())
    } else {
      result.push(rightSortedArray.shift());
    }
  }
  return result.concat(leftSortedArray, rightSortedArray);
}

const mergeSort = (nums) => {
  // code goes here
  if (nums.length < 2) {
    return nums;
  }
  const middle = Math.floor(nums.length / 2);
  const left =  nums.slice(0, middle);
  const right = nums.slice(middle);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  return merge(sortedLeft, sortedRight);
};

// unit tests
// do not modify the below code
test.skip("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
