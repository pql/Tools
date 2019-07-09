/**
 * @description 校验是否为空(null/空串)
 * @param {*} variable 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkNotNull('');
 */
export const checkNotNull = (variable) => {
	if(variable == null || variable == ""){
		return false;
	}
	return true;
}

/**
 * @description 校验是否为纯数字
 * @param {Number} num 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkNum(1);
 *          var bool1 = checkNum('1');
 */
export const checkNum = (num) => {
	if(isNaN(num)){
		return false;
	}
	return true;
}

/**
 * @description 检验手机号格式是否匹配
 * @param {String} phone 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkPhone(13337217033);
 *          var bool1 = checkPhone('13337217033');
 */
export const checkPhone = (phone) => {
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; 
	// 验证规则,第一位是【1】开头，第二位有【3,4,5,7,8】，第三位及以后可以是【0-9】
    //	var reg = /^1[0-9]{10}$/;//不验证第二位，防止几年后新增号码段
	if(!reg.test(phone)){
		return false;
	}
	return true;
}

/**
 * @description 检验qq格式是否通过
 * @param {String} qq 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkQQ('3464769311');
 */
export const checkQQ = (qq) => {
	//验证规则,5至11位
	var reg = /^[1-9][0-9]{4,10}$/; 
	if(!reg.test(qq)){
		return false;
	}
	return true;
}

/**
 * @description 检验wechat账号格式是否通过
 * @param {String} wechat 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkQQ('caibaojian_com');
 */
export const checkWechat = (wechat) => {
	//验证规则,6至20位，以字母开头，字母，数字，减号，下划线
	var reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/; 
	if(!reg.test(wechat)){
		return false;
	}
	return true;
}

/**
 * @description 验证座机号格式是否通过
 * @param {String} tel 被检验的变量
 * @returns boolean 返回通过验证的结果
 *      example
 *          var bool = checkTel('13337217033');
 */
export const checkTel = (tel) => {
	var reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
	if (!reg.test(tel)) {
		return false;
	}
	return true;
}

/**
 * @description 检验身份证号格式是否通过
 * @param {String} idCard 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkIdCard('430876543234566013');
 */
export const checkIdCard = (idCard) => {
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

/**
 * @description 检验用户名正则匹配是否通过
 * @param {String} name 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkUserName('baidu');
 */
export const checkUserName = (name) => {
	//用户名正则，4到16位（字母，数字，下划线，减号）
	var reg = /^[a-zA-Z0-9_-]{4,16}$/;
	if (!reg.test(name)) {
		return false;
	}
	return true;
}

/**
 * @description 检验url地址格式是否通过
 * @param {String} url 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkUrl('http://www.baidu.com');
 */
export const checkUrl = (url) => {
	var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
	if (!reg.test(url)) {
		return false;
	}
	return true;
}

/**
 * @description 校验ip格式是否通过
 * @param {String} ip 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkIp('192.168.0.197');
 */
export const checkIp = (ip) => {
  var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/
  if (reSpaceCheck.test(ip)) {
    ip.match(reSpaceCheck)
    if (Number(RegExp.$1) <= 255 && Number(RegExp.$1) >= 0 && Number(RegExp.$2) <= 255 && Number(RegExp.$2) >= 0 &&
        Number(RegExp.$3) <= 255 && Number(RegExp.$3) >= 0 && Number(RegExp.$4) <= 255 && Number(RegExp.$4) >= 0) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * @description 检验邮箱合法性
 * @param {String} emailStr 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkEmail('3565789876@qq.com');
 */
export const checkEmail = (emailStr) => {
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	if(!reg.test(emailStr)){
		return false;
	}
	return true;
}

/**
 * @description 检验日期 格式为YYYY-MM-DD
 * @param {String} dateValue 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkDate('2019-09-09');
 */
export const checkDate = (dateValue) =>  {
	var result = dateValue.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
	if (result == null) {
		return false;
	}
	return true;
}

/**
 * @description 匹配str是否为正数（大于等于零的正数、浮点数）
 * @param {String} str
 * @returns {Boolean}
 */
export const checkIsPosNumber = (str) => {
	if(str==null||str=="") return false;
	var result=str.match(/^\d*\.?\d+$/);
	if(result==null)return false;
	return true;
}     

/**
 * @description 匹配str是否为负数（小于零的负数、浮点数）
 * @param {String} str
 * @returns {Boolean}
 */
export const checkIsNegNumber = (str) => {
	if(str==null||str=="") return false;
	var result=str.match(/^-\d*\.?\d+$/);
	if(result==null)return false;
	return true;
}

/**
 * @description 匹配str是否为数字（正负数和双精度值）
 * @param {String} str
 * @returns {Boolean}
 */
export const checkIsNumber = (str) => {
	if(str==null||str=="") return false;
	var result=str.match(/^-?\d*\.?\d+$/);
	if(result==null)return false;
	return true;
}


/**
 * @description 检验金额（最多保留2位有效数字,超出2位有效数字不通过）
 * @param {String} money 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkMoney('6.88');
 */
export const checkMoney = (money) => {
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
 
/**
 * @description 检验否是汉字
 * @param {String} charValue 被检验的变量
 * @returns {Boolean} 返回通过验证的结果
 *      example
 *          var bool = checkCharacter('王');
 */
export const checkCharacter = (charValue) => {
	var reg = /^[\u4e00-\u9fa5]{0,}$/;
	if(!reg.test(charValue)){
		return false;
	}
	return true;
}
