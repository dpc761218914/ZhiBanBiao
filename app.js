var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//引入moment
var moment = require('moment');
moment().format();

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//对照日历，把假期都挑选出来~
var holidays=["2017-09-02","2017-09-03","2017-09-09","2017-09-10","2017-09-16","2017-09-17",
              "2017-09-23","2017-09-24",
              "2017-10-01","2017-10-02","2017-10-03","2017-10-04","2017-10-04","2017-10-05",
              "2017-10-06","2017-10-07","2017-10-08","2017-10-14","2017-10-15","2017-10-21",
              "2017-10-22","2017-10-28","2017-10-29","2017-11-04","2017-11-05","2017-11-11",
              "2017-11-12","2017-11-18","2017-11-19","2017-11-25","2017-11-26","2017-12-02",
              "2017-12-03","2017-12-09","2017-12-10","2017-12-16","2017-12-17","2017-12-23",
              "2017-12-24","2017-12-30","2017-12-31"];

var peoples=["胡八一","徐大大","邓小平","冯玉祥","戴望舒","周杰伦","万科","徐宁宁","匡小芬","陈龙"];

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

app.get('/index', function(req,rep){
  rep.render('index');
});

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
