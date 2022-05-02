const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.parent = null;
  }

  root() {
    if (this.parent === null) {
      return null;
    } else {
      this.parent.data = this.parent.value
      return this.parent;
    }
  }

  add(data) {
    this.parent = insertNode(this.parent, data);

    function insertNode (node, value) {
      if (!node) {
        return new Node(value);
      }

      if (node.value === value) {
        return node;
      }

      if (value < node.value) {
        node.left = insertNode(node.left, data);
      } else {
        node.right = insertNode(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return searchNode(this.parent, data);

    function searchNode(node, value) {
      if(node === null) {
        return false;
      } else if (value < node.value) {
        return searchNode(node.left, value);
      } else if (value > node.value) {
        return searchNode(node.right, value);
      } else {
        return true;
      }
    }
  }

  find(data) {
    // throw new NotImplementedError('Not implemented');
    return findNode(this.parent, data);

    function findNode(node, value) {
      if(node === null) {
        return null;
      } else if (value < node.value) {
        return findNode(node.left, value);
      } else if (value > node.value) {
        return findNode(node.right, value);
      } else {
        node.data = node.value;
        return node;
      }
    }
  }

  remove(data) {
    this.parent = removeNode(this.parent, data);

    function removeNode(node, value) {
      if (node === null) {
        return null;
      } else  if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (node.left === null && node.right === null) {
          node = null;
          return node;
        }
        if (node.left === null) {
          node = node.right;
          return node;
        } else if(node.right === null) {
          node = node.left;
          return node;
        }

        let newNode = minNode(node.right);
        node.data = newNode.data;
        node.right = removeNode(node.right, newNode.data);

        function minNode(node) {
          if (node.left === null) {
            return node;
          } else {
            return minNode(node.left);
          }
        }
        return node;
      }
    }
  }

  min() {
    if (this.parent === null) {
      return;
    }

    let node = this.parent;
    while (node.left) {
      node = node.left;
    }
    return node.value;
  }

  max() {
    if (this.parent === null) {
      return;
    }

    let node = this.parent;
    while (node.right) {
      node = node.right;
    }
    return node.value;
  } 
}

const tree = new BinarySearchTree();
tree.add(5);
tree.add(15);
tree.add(13);
tree.add(20);
tree.add(18);
tree.add(25);

tree.remove(25);


// res = tree.find(8).data
res = tree.root().data;
console.log('res= ', res)

module.exports = {
  BinarySearchTree
};