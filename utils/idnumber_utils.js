/**  
 * 身份证操作模块
 * @author zxl
 * 
 * 身份证15位编码规则：dddddd yymmdd xx p 
 * dddddd：地区码 
 * yymmdd: 出生年月日 
 * xx: 顺序类编码，无法确定 
 * p: 性别，奇数为男，偶数为女 
 * <p /> 
 * 身份证18位编码规则：dddddd yyyymmdd xxx y 
 * dddddd：地区码 
 * yyyymmdd: 出生年月日 
 * xxx:顺序类编码，无法确定，奇数为男，偶数为女 
 * y: 校验码，该位数值可通过前17位计算获得 
 * <p /> 
 * 18位号码加权因子为(从右到左) wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ] 
 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ] 
 * 校验位计算公式：Y_P = mod( ∑(Ai×wi),11 ) 
 * i为身份证号码从右往左数的 2...18 位; Y_P为校验码所在校验码数组位置
 */
define(['jquery'],function($){
	
	var IDCardUtil = {
		/**
		 * 区域ID
		 */
		_aCity : {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},
		/**
		 * 男女ID
		 */
		_sexMap:{0:"女",1:"男"},
		/**
		 * 校验身份证
		 * @param IDCard 身份证号码
		 */
		checkIdCard:function(IDCard){
			var _this = this;
			var iSum = 0;
			var info = "";
			if(!/^\d{17}(\d|x)$/i.test(IDCard)) 
				return {
		        	status:false,
		        	message:'你输入的身份证长度或格式错误!'
		        };
			IDCard = IDCard.replace(/x$/i,"a");
			if(_this._aCity[parseInt(IDCard.substr(0,2))] == null)
				return {
		        	status:false,
		        	message:'你的身份证地区非法!'
		        };
			var sBirthday = IDCard.substr(6,4) + "-" + Number(IDCard.substr(10,2)) + "-" + Number(IDCard.substr(12,2));
			var d = new Date(sBirthday.replace(/-/g,"/"));
			if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))
				return {
		        	status:false,
		        	message:'身份证上的出生日期非法!'
		        };
			for(var i = 17;i>=0;i --) 
				iSum += (Math.pow(2,i) % 11) * parseInt(IDCard.charAt(17 - i),11);
			if(iSum%11!=1) 
				return {
		        	status:false,
		        	message:'你输入的身份证号非法!'
		        };
			//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
	        return {
            	status:true,
            	message:'校验成功！'
            };
			
		},
		/**
		 * 获取身份信息
		 * return sex/birth/area
		 */
		getIDInfo:function(idCard){
			var that = this;
			return {
				sex:that._getSex(idCard),
				birth:that._getBirthday(idCard),
				area:that._getArea(idCard),
				age:that._getAge(idCard)
			};
		},
		/**
		 * 获取性别
		 */
		_getSex:function(idCard){
			var that = this;
			if (idCard.length == 15) {  
		        return that._sexMap[idCard.substring(14, 15) % 2];  
		    } else if (idCard.length == 18) {  
		        return that._sexMap[idCard.substring(14, 17) % 2];  
		    } else {  
		        //不是15或者18,null  
		        return null;  
		    }
		},
		/**
		 * 获取生日"yyyy-mm-dd"
		 */
		_getBirthday:function(idCard){
			var birthdayStr;  
			  
		    if (15 == idCard.length) {  
		        birthdayStr = idCard.charAt(6) + idCard.charAt(7);  
		          
		        if (parseInt(birthdayStr) < 10) {  
		            birthdayStr = '20' + birthdayStr;  
		        } else {  
		            birthdayStr = '19' + birthdayStr;  
		        }  
		        birthdayStr = birthdayStr + '-' + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11);  
		    }else if (18 == idCard.length) {  
		        birthdayStr = idCard.charAt(6) + idCard.charAt(7) + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11) + '-' + idCard.charAt(12) + idCard.charAt(13);  
		    }  
		      
		    return birthdayStr; 
		},
		/**
		 * 获取出生地
		 */
		_getArea:function(idCard){
			return this._aCity[parseInt(idCard.substr(0, 2))];
		},
		/**
		 * 获取年龄
		 */
		_getAge:function(idCard){
			var birthdayStr = this._getBirthday(idCard);
			var   r   =   birthdayStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);     
	        if(r==null) return '';  
	        var d = new Date(r[1], r[3]-1, r[4]);     
	        if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]){   
	              var   Y   =   new   Date().getFullYear();   
	              return (Y-r[1]);   
	        }else{
	        	return '';
	        }
		}
	};
		
	return IDCardUtil;
})