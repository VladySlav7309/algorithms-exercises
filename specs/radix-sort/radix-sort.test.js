/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/
const extractDigitFromNumber = (number, place) => {
  return Number(Number(number).toString().split('').reverse().join('')[place]);
};

const getNumberLength = (number) => Number(number).toString().length;
const getLongestNumber = (array) => {
  return array.reduce((acc, num) => num > acc ? num : acc, Number.MIN_SAFE_INTEGER)
}

const getEmptyBucketsList = () => Array(10).fill(0).map(() => []);

function radixSort(array) {
  // code goes here

  // get longest number length
  const max = getLongestNumber(array);
  const longestNumberLen = getNumberLength(max);
  console.log('max :: ', max);
  console.log('longestNumberLen :: ', longestNumberLen);

  // create buckets
  let resultArray = array.slice();
  let buckets = getEmptyBucketsList();
  console.log('buckets :: ', buckets);

  for (let digitIndex = 0; digitIndex < longestNumberLen; digitIndex++) {
    for (let arrayIndex = 0; arrayIndex < resultArray.length; arrayIndex++) {
      const number = resultArray[arrayIndex];
      const digitOnPlace = extractDigitFromNumber(number, digitIndex);
      if (isNaN(digitOnPlace)) {
        buckets[0].push(number);
      } else {
        buckets[digitOnPlace].push(number);
      }
    }
    console.log('Buckets before flush: ', buckets);
    resultArray = [];
    for (let bucketIndex = 0; bucketIndex < buckets.length; bucketIndex++) {
      resultArray.push(...buckets[bucketIndex]);
    }
    console.log('resultArray after flush: ', resultArray);
    buckets = getEmptyBucketsList();
    console.log('Buckets after flush: ', buckets);
  }
  // iterate over all numbers and all buckets

  return resultArray;
  // console.log(max);
}

// unit tests
// do not modify the below code
describe.skip("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      1244,
      104,
      944,
      854,
      34,
      3000,
      3001,
      1200,
      633
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1,
      3,
      4,
      11,
      17,
      19,
      20,
      34,
      51,
      62,
      100,
      104,
      415,
      633,
      801,
      854,
      944,
      1200,
      1244,
      3000,
      3001
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort());
  });
});
