/*
  AVL Tree
  
  Name you class/function (anything we can call new on) Tree
  
  I would suggest making a Node class as well (it will help _a lot_ with AVL trees) Whereas with BSTs we 
  could get away with most of the logic living in the Tree class, that will be a lot tougher with AVL
  trees dues how the function calls must be recursive in order to get the balancing correct.
  
  Tree must a method called add that takes a value and adds it to the tree and then correctly balances the
  tree. There is only one correct structure for any given order of adding numbers and the unit tests enforce
  that structure.
  
  If you have any questions conceptually about balancing the tree, refer to the class website.
  
  Make sure you are calling the properties
  of the Nodes as follows:
  value - integer - the value being store in the tree
  left  - Node    - the subtree containing Node's with values less than the current Node's value
  right - Node    - the subtree containing Node's with values greater than the current Node's value

*/

class Tree {
  // code goes here

  constructor() {
    this.root = null;
  }

  add(value) {
    const node = new Node(value);
    if(!this.root) {
      return this.root = node;
    }
    return this.root.add(value);
  }

  toObject() {
    return this.root ? this.root.serialize() : null;
  }
}

// NOT WORKING
class Node {
  // code also goes here
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
  serialize() {
    const ans = { value: this.value };
    ans.left = this.left === null ? null : this.left.serialize();
    ans.right = this.right === null ? null : this.right.serialize();
    return ans;
  }

  add(value) {
    const direction = value > this.value ? 'right' : 'left';
    const nextNode = this[direction];
    if (!nextNode) {
      this[direction] = new Node(value);
    } else {
      nextNode.add(value);
    }
    this._autobalance();
  }

  _autobalance() {
    try {
      const hasDoubleRightHeight = this.right && (this.right.right || this.right.left) && !this.left;
      const hasDoubleLeftHeight = this.left && (this.left.right || this.left.left) && !this.right;

      const nodeUnbalanced = hasDoubleRightHeight || hasDoubleLeftHeight;

      if (nodeUnbalanced) {
        if (this.left && this.left.right) {
          this.left._rightRotation();
          this._leftRotation();
          return;
        }

        if (this.right && this.right.left) {
          this.right._leftRotation();
          this._rightRotation();
          return;
        }

        if (this.right && this.right.right) {
          this._rightRotation();
          return;
        }
        if (this.left && this.left.left) {
          this._leftRotation();
          return;
        }
      }
    } catch (e) {
      console.log('failed to do a rotation, e: ', e);
    }
  }

  _rightRotation() {
    const valueBefore = this.value;
    const leftBefore = this.left;
    this.value = this.right.value;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.value = valueBefore;
  }

  _leftRotation() {
    const valueBefore = this.value;
    const rightBefore = this.right;
    this.value = this.left.value;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.value = valueBefore;
  }
}

// unit tests
// do not modify the below code
describe.skip("AVL Tree", function () {
  test("creates a correct tree", () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();

    console.log(JSON.stringify(objs));

    expect(objs.value).toEqual(4);

    expect(objs.left.value).toEqual(2);

    expect(objs.left.left.value).toEqual(1);
    expect(objs.left.left.left).toBeNull();
    expect(objs.left.left.right).toBeNull();

    expect(objs.left.right.value).toEqual(3);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(6);
    expect(objs.right.left.right).toBeNull();

    expect(objs.right.left.left.value).toEqual(5);
    expect(objs.right.left.left.left).toBeNull();
    expect(objs.right.left.left.right).toBeNull();

    expect(objs.right.right.value).toEqual(9);

    expect(objs.right.right.left.value).toEqual(8);
    expect(objs.right.right.left.left).toBeNull();
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.right.value).toEqual(10);
    expect(objs.right.right.right.left).toBeNull();
    expect(objs.right.right.right.right).toBeNull();
  });
});
