
2017-09-07更新

1、为了不改变值班人的周一到周五的顺序，如果是周末则按安排固定人员值班。用delayDay记录周末跨度日期。
2、如果周一忘记打印，周二补充打印需要设置已过天数，设置已过天数1，如果是提前打印需要，设置已过天数为负数。
3、给添加了Button添加enter按钮点击事件。

——————————————————————————————————————————————————
###一、项目描述
  **前言：**公司同事基本每20天左右的周一上班会制作一个**工作日值班表**并将其打印，贴在墙上用于提醒公司同事要记得值班打扫卫生，具体制作过程是：名字和星期可以直接复制粘贴，但是日期还是需要一个个对应日历上的工作日进行手动录入并修改。

  **希望实现的功能：**同事周一上班时直接访问某个链接即可查看未来固定天数的值班表，点击打印当前网页即可快速便捷打印出**工作日值班表**，如果你愿意，你可以打印出一个季度，甚至一年的值班记录表。

###二、项目描述
**所用模块：**1、Moment.js node的时间操作模块。  2、Express node的快速web开发框架。3、layui用于前端展示，类似于bootstrap框架。

**实现思路：**通过Moment.js获取当前时间并循环加1，并判断其是否是工作日，如果是工作日就将当前日期、周几、以及人名PUSH到数组中，如果不是工作日日期加1继续循环判断，排班排满了固定天数为止。（其中判断日期是否为工作日的方法是使用一个函数，判断某个日志是否在假期数组中，这个假期数组需要前期准备好，用于做工作日的比对）

###三、项目截图
代码部署后，访问 http://localhost:3000/index 既可查看值班表，可以直接打印网页，也可以转成PDF~~~
![QQ截图20170830180417.png](http://upload-images.jianshu.io/upload_images/2227968-f0b41deef9d61c90.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###四、部分代码
- 4.1、首先定义一个数组存放[日期，星期几，姓名]，并获取当前日期， 根据当前日期通过moment().subtract(-i, "days").format("YYYY-MM-DD");（该函数是获取当前日期第i天的日期）函数获取未来的日期nextday，判断未来日期是否是工作日，如果是工作日那么通过函数（var weekNum=moment(nextDay).format("E");该函数计算出的是数字，需要判断以后赋上中文）计算出该日期是周几。然后拼接数组，在数组的Json格式数据传给前台。
```
app.get('/users', function(req,rep){
  //当前时间
  //var now =moment().format("YYYY-MM-DD");
  var items=[];
  for(var i=items.length;items.length<20;i++){
    //从当前日期查询往后的日子
    nextDay=moment().subtract(-i, "days").format("YYYY-MM-DD");
    if(!contains(holidays,nextDay)){
      //判断日期是星期几
      var weekNum=moment(nextDay).format("E");
      var weekStr=""
      if(weekNum=="1"){
        weekStr="星期一"
      }else if(weekNum=="2"){
        weekStr="星期二"
      }else if(weekNum=="3"){
        weekStr="星期三"
      }else if(weekNum=="4"){
        weekStr="星期四"
      }else if(weekNum=="5"){
        weekStr="星期五"
      }else if(weekNum=="6"){
        weekStr="星期六"
      }else if(weekNum=="7"){
        weekStr="星期天"
      }
      //刚好人数为10，所有模10就可循环输出人名
      var peopleNum=items.length%10;
      var peopleName=peoples[peopleNum];
      items.push([nextDay,weekStr,peopleName]);
    }
  }
  //注意这里要使用Json格式数据
  rep.json({datas:items});
});
```
- 4.1、判断是否是工作日的函数（网上搜索的）,及判断某个日期是否在假期数组内，这个假期数组需要前期自己定义好。
```
//判断字符串是否在数组内的函数
function contains(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}

```

###五、源码与展望
- 5.1、项目源代码： https://github.com/dpc761218914/ZhiBanBiao
- 5.2、后期有想法可以，通过选择开始时间，而并不一定需要从周一开始，同时员工也可以添加到数据库中，这样既可实现对员工的动态操作，大家有啥想法和建议欢迎提出讨论~