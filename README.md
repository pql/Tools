1、下面程序输出结果
(1)  （考ECMAScript6 中的let含义）
(function() {
   for (let i = 1; i <= 5; i++) {
     setTimeout(() => {
        console.log(i);
     }, i * 1000);
    }
 })(); 
答案：控制台打印1，2，3，4，5


(2) (考闭包作用域)
var scope = 'global scope';
function checkscope(){
    var scope = 'local scope';
    function f(){return scope;}
    return f();
}
checkscope();
答案：‘local scope’
参考解释：程序先初始化scope变量和checkscope函数，当checkscope函数调用时初始化checkscope函数内部的scope变量和f函数，程序走到return f()，这里是调用f函数，f函数内部return scope取的值是checkscope函数初始化的scope变量的值。查找变量的过程是，先从变量所在的作用域有没有这个变量的值，如果有，程序到这里停止变量查找，繁殖继续往上一层作用域找，如果还是没有找到，程序报错:该变量undefined

(3)  (考闭包作用域)
var scope = 'global scope';
function checkscope(){
    var scope = 'local scope';
    function f(){return scope;}
    return f;
}
checkscope()();
答案：‘local scope’

(4) (考闭包，作用域，函数变量提升)
(function(num){
	console.log(num)
	var num = 10
	function num() {
	   console.log(num)
	}
})(100)
答案：ƒ num() {
		console.log(num)
	}



（5）在前端开发中会遇到一些频繁的事件触发，比如：
	1.	window 的 resize、scroll 
	2.	mousedown、mousemove 
	3.	keyup、keydown 
如何解决事件频繁的触发：
1.节流 （https://github.com/mqyqingfeng/Blog/issues/26）
2.防抖（https://github.com/mqyqingfeng/Blog/issues/22）

2、数组去重 var array = [1,2,2,3,3,4,5,6,7,8,8,9,0,0,0];  
方法一：function unique (array) { 
		// 考es6 的Set数据结构
 		return [...new Set(array)] 
      } 	  unique(array)

方法二：function unique(array) { 
    	   	var res = []; 
		for (let item of array) {
 			if (res.indexOf(item) === -1) {
 				res.push(item) 
			} 
		}
    		return res
        } 	  
       unique(array)

方法三： function unique(array) { 
		var res = [];
 		var sortedArray = array.concat().sort(); 
		var seen;
		for (var i = 0, len = sortedArray.length; i < len; i++) {
 			if (!i || seen !== sortedArray[i]) {
 				res.push(sortedArray[i])
 			} 
			seen = sortedArray[i]
 		} 		return res
         }
     unique(array)


3、在目前工作经验中，用 流程图 描述你以前公司的业务





4、在目前工作经验中，你遇到你觉得最难的技术问题是什么，你如何去解决的？







5、谈谈对前端性能优化的认识？
http://blog.csdn.net/mahoking/article/details/51472697


6、谈谈构造函数(constructor)、原型（prototype）、实例(instance)三者之间的联系
(http://blog.csdn.net/spicyboiledfish/article/details/71123162)



