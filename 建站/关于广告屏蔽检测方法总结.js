## 利用具有广告特点的js来解决

创建一个类似`adview_pic_cpc_cpm_cpa_guanggao_gg_ads_300x250.js`具有广告特点的js，其内容为：

```
var killads = true;
```

判断是否有广告屏蔽插件：在页面使用如下代码判断

```
window.onload=function(){

    if (typeof(killads)=='undefined'){
        $("#abptip").addClass("show");
    }
}
```
