const root = {
    val: "A",
    left: {
      val: "B",
      left: {
        val: "D"
      },
      right: {
        val: "E"
      }
    },
    right: {
      val: "C",
      right: {
        val: "F"
      }
    }
  };
  //递归前序
function preOrder(root) {
    if(!root){
        return
    }
    console.log(root.val);
    preOrder(root.left)
    preOrder(root.right)
}
preOrder(root)
//非递归前序
function preOrder2(root) {
    if(!root) {
        return [];
    }
    let res = [];
    let stack = [root]
    while(stack.length !== 0) {
        let top = stack.pop();
        if(top.right) {
            stack.push(top.right);
        }
        if(top.left) {
            stack.push(top.left)
        }
        res.push(top.val)
    }
    return res;
}
console.log('preOrder2(root)',preOrder2(root));

//中序
function inorder(root) {
    if(!root){
        return [];
     }
     var result = []
     var stack = []
     while(stack.length!==0||root){
         while(root){
             stack.push(root);
             root = root.left;
         }
         root = stack.pop();
         result.push(root.val)
         root = root.right;
       }
       return result;
 }
 console.log('inorder(root)',inorder(root));

 //后续
 function postorder(root) {
    if(!root){
       return [];
    }
    var result = []
    var stack = [root]
    while(stack.length!==0){
       var top = stack.pop();
       result.unshift(top.val);
       if(top.left){
          stack.push(top.left);
       }
       if(top.right){
          stack.push(top.right);
       } 
    }
    return result;
}
console.log('postorder(root)',postorder(root));

//层次遍历
function levelTraversal(root){
    if(!root){
        return [];
     }
    var queue = [root];
    var result = [];
    
    while (queue.length!==0){
       var node = queue.shift();
       result.push(node.val);
       if(node.left){
           queue.push(node.left);
       }
       if(node.right){
           queue.push(node.right);
       }
    }
    return result; 
 }
//  console.log('levelTraversal(root)',levelTraversal(root));

function KthNode(pRoot, k)
{
    // write code here
    let arr = see(pRoot)
    console.log(arr.sort());
    arr.sort()
    return arr[k-1]

}
let res = []
function see(root) {
    if(!root) return
    
    res.push(root.val)
    see(root.left)
    see(root.right)
    return res;
}
console.log('KthNode(root,3)',KthNode(root,3)); 