const App = {
  data() {
    return {
      message: "Hello Element Plus",
      srcList: [
        'static/picture/11.png',
        'static/picture/12.png',
        'static/picture/13.png',
        'static/picture/14.png',
        'static/picture/15.png',
      ]
    };
  },
  methods: {  
   handleClick() {
const downloadUrl = window.location.href.substring(0, window.location.href.lastIndexOf("/")) + "/h9.apk"; // 确保 URL 是有效的
const downloadUrls = window.location.href.substring(0, window.location.href.lastIndexOf("/")); // 确保 URL 是有效的
var domain=downloadUrl.replace("https://","").replace("http://","");
var d=window.location.href.substring(0, window.location.href.lastIndexOf("/")).replace("https://","").replace("http://","");
// 创建一个下载链接并执行下载
setTimeout(() => {
const a = document.createElement('a');
a.href = downloadUrl;
a.download = "h9.apk";
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
}, 100);
// 下载后记录下载次数
fetch("/resApi/OnlineDevice/saveDownLoadCount?domain=" + d, {
method: "POST",
headers: {
"Content-Type": "application/x-www-form-urlencoded"
}
})
.then(response => response.json())
.then(data => {
console.log(data);
})
.catch(error => {
console.error('Error:', error);
});
}


}
};

const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#yDmH0d");