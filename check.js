/*
 * 校验是否为空(null/空串)
 */
var checkNull = function(str){
	if(str == null || str == ""){
		return false;
	}
	return true;
}
 
/*
 * 校验是否为纯数字
 * js的isNaN函数
 */
var checkNum = function(num){
	if(isNaN(num)){
		return false;
	}
	return true;
}
 
/*
 * 校验是否为纯数字(正则)
 */
var checkNum2 = function(num){
	 var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 （判断正整数 /^[1-9]+[0-9]*]*$/）
	 if (!re.test(num)){
	    return false;
	 }
	return true;
}
 
/*
 * 检验手机号
 */
var checkPhone = function(phone){
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则,第一位是【1】开头，第二位有【3,4,5,7,8】，第三位及以后可以是【0-9】
//	var reg = /^1[0-9]{10}$/;//不验证第二位，防止几年后新增号码段
	if(!reg.test(phone)){
		return false;
	}
	return true;
}
 
/*
 * 验证座机号
 */
var checkTel = function(tel) {
	var reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
	if (!reg.test(tel)) {
		return false;
	}
	return true;
}
 
/*
 * 校验ip
 */
var checkIp = function(ip){  
    var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;  
    if (reSpaceCheck.test(ip)){  
        ip.match(reSpaceCheck);  
        if (RegExp.$1 <= 255 && RegExp.$1 >= 0 && RegExp.$2 <= 255 && RegExp.$2 >=0  
          &&RegExp.$3 <= 255 && RegExp.$3 >= 0 && RegExp.$4 <= 255 && RegExp.$4>=0){  
            return true;   
        }else{  
            return false;  
        }  
    }else{  
        return false;  
    }  
} 
 
/*
 * 检验url地址
 */
var checkUrl = function(url) {
	var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
	if (!reg.test(url)) {
		return false;
	}
	return true;
}
 
/*
 * 检验身份证
 */
var checkIdCard = function(idCard) {
	var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	var iSum = 0;
	var info = "";
	if (!/^\d{17}(\d|x)$/i.test(idCard)){
		return false;//身份证长度或格式错误
	}
	idCard = idCard.replace(/x$/i, "a");
	if (aCity[parseInt(idCard.substr(0, 2))] == null){
		return false;//身份证地区非法;
	}
	var sBirthday = idCard.substr(6, 4) + "-" + Number(idCard.substr(10, 2)) + "-" + Number(idCard.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"));
	if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())){
		return false;//身份证上的出生日期非法;
	}
	for (var i = 17; i >= 0; i--){
		iSum += (Math.pow(2, i) % 11) * parseInt(idCard.charAt(17 - i), 11);
	}
	if (iSum % 11 != 1){
		return false;//身份证号非法; 
	}
	
	return true;
	
}
 
/*
 * 检验邮箱
 */
var checkEmail = function(emailStr){
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	if(!reg.test(emailStr)){
		return false;
	}
	return true;
}
 
/*
 * 检验日期
 * 格式为YYYY-MM-DD
 */
var checkDate = function(dateValue) {
	var result = dateValue.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
	if (result == null) {
		return false;
	}
	return true;
}
 
/*
 * 检验金额
 */
var checkMoney = function(money) {
	if (money == '') {
		return false;
	}
	money = money.replace(/(^\s*)|(\s*$)/g, "");
	var reg = /^[0-9]*\.?[0-9]{0,2}$/;
	if (!checkNum(money)) {
		return false;
	}
	if (money.length > 3) {
		if (money.substr(0, 1) == "0") {
			if (money.substr(3, money.length).length > 2) {
				return false;
			}
		}
	}
	if(!reg.test(money)){
		return false;
	}
	return true;
}
 
/*
 * 检验否是汉字 
 */
var checkCharacter = function(charValue) {
	var reg = /^[\u4e00-\u9fa5]{0,}$/;
	if(!reg.test(charValue)){
		return false;
	}
	return true;
}
