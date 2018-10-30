/**
 * 工具类
 */
import Vue from 'vue'
import CryptoJS from 'crypto-js'
var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
export default {

  //加密
  Encrypt(word, keyStr){
    keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  },
  //解密
  Decrypt(word, keyStr){
    keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
  DecData(data){

    var key = CryptoJS.enc.Utf8.parse(this.deMixStr(data.substr(0,32)));
    //console.log(deMixStr(data.substr(0,32)));
    var decrypt = CryptoJS.AES.decrypt(data.substr(32).split(new Date().getFullYear())[0], key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();

  },
  getKey(){
    var str = "";
    for(var i=0; i<16; i++){
      var pos = Math.round(Math.random() * (arr.length-1));
      str += arr[pos];
    }
    return str;
  },
  mixStr(key)
  {
    if(key==null || key ==undefined || key.length!=16)
      throw "�ܳײ���ȷ";
    var j = 1;
    for (let i = 0; i < 15; i++)
    {
      key=this.insert_item(key,arr[Math.floor(Math.random()*(arr.length-1))],i + j);
      j += 1;
    }
    key+=arr[Math.floor(Math.random()*(arr.length-1))];
    return key;
  },
  deMixStr(key)
  {
    if(key==null || key ==undefined || key.length!=32)
      throw "�ܳײ���ȷ";
    for (let i = 0; i < 15; i++)
    {
      key=this.remove_item(key,i+1);
    }
    key=this.remove_item(key,16);
    return key;
  },
  insert_item(str,item,index){
    var newstr="";
    var temp=str.substring(0,index);
    var estr=str.substring(index,str.length);

    newstr+=temp+item+estr;
    return newstr;
  },
  remove_item(str,index){
    var newstr="";
    var temp=str.substring(0,index);
    var estr=str.substring(index+1,str.length);

    newstr+=temp+estr;
    return newstr;
  },
  dateToStr(){
    var dateFmt = "yyyyMMddHHmmssSS";
    var  date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth()+1)<10? "0"+(date.getMonth()+1):(date.getMonth()+1);
    var D = date.getDate()<10? "0"+date.getDate():date.getDate();
    var h = date.getHours()<10? "0"+date.getHours():date.getHours();
    var m = date.getMinutes()<10? "0"+date.getMinutes():date.getMinutes();
    var s = date.getSeconds()<10? "0"+date.getSeconds():date.getSeconds();
    if(date.getMilliseconds() < 10 ){
      var s1 = "00"+date.getMilliseconds();
    }else if(date.getMilliseconds() < 100){
      var s1 = "0"+date.getMilliseconds();
    }else{
      var s1 = date.getMilliseconds();
    }
    return  dateFmt.replace("yyyy",Y).replace("MM",M).replace("dd",D).replace("HH",h).replace("mm",m).replace("ss",s).replace("SS",s1);
  },
  getmaxParam(){
    var serCode = "100040";
    var key = this.getKey();
    var paramData  = {};
    var tempMobile = "13699998888";
    paramData.data = {"materielCode":"500000805"};
    paramData.token = {"time":this.dateToStr(),"mobile":tempMobile};

    var enParamData = this.Encrypt(JSON.stringify(paramData),key);
    var maxParam = serCode + this.mixStr(key) + enParamData + this.dateToStr();
    console.log(maxParam);
    return maxParam;
  }
}
