var express = require('express');
var Food = require('../model/food');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();


/* 食物列表页面*/
router.get('/', function(req, res, next){

  var resData = {code:9999,data:[]};
  res.header("Access-Control-Allow-Origin", "*");
  Food.find(function(err,foods){
    if(err) {
      console.log("食物列表页面出错");
      res.send(resData);
    } else {
        resData.code = 1;
        resData.data = foods;
        res.send(resData);
    }
  });
});

router.get('/plus/:id',function(req,res,next){

    var id = req.params.id;
    Food.find({_id:id},function(err,foods){
        if(!err){
            var pv = foods[0].pv;
            console.log("查询到的food",foods);
            console.log("查询到的id",id,"pv是",pv);
            pv++;
            Food.update({_id:id},{$set:{pv:pv}},function(err,docs){
                console.log("增加点击数报错",err);
            });
        }
    });

});


/* 新增食物页面*/
router.get('/addFood', function(req, res, next){
  res.render("addFood",{title:"新增食物"});
});

/* 新增食物页面 请求*/
router.post('/addFood', function(req, res, next){

  var now = new Date();
  var time = getDetailTime();
  console.log(time.minutes);

  var form = new formidable.IncomingForm();
  var uploadPath = "tmpImg/";
  form.uploadDir = uploadPath;
  form.maxFieldsSize = 2 * 1024 * 1024;
  form.encoding = 'utf-8';
  form.keepExtensions = true;

  var fields = [],
      files = [],
      foodKv = {};

    form
        .on('field', function(field, value) {
            foodKv[field] = value;
        })
        .on('file', function(field, file) {
            try{
                fs.renameSync(file.path,uploadPath+file.name);
                foodKv.img = uploadPath+file.name;
            }catch(e){
                console.log("renameSync异常报错",e);
            }

        })
        .on('end', function() {

            var food = new Food({
                img:foodKv.img,
                name:foodKv.name,
                info:foodKv.info,
                protein:foodKv.protein,
                fat:foodKv.fat,
                energy:foodKv.energy,
                carbo:foodKv.carbo,
                updateDate:time.minutes,
                pv:0
            });

            food.save(function(err){
                if(err){
                    console.log("食物保存失败");
                }
                res.redirect("/");
            });
        });
    form.parse(req);
});


function getDetailTime(){
  var now = new Date();
  var time = {
    date:now,
    year:now.getFullYear(),
    month:now.getFullYear() + "-" + (now.getMonth() + 1 ),
    day:now.getFullYear() + "-" + (now.getMonth() + 1 ) + "-" +now.getDate(),
    minutes:now.getFullYear() + "-" + (now.getMonth() + 1 ) + "-" +now.getDate() + " " +
        now.getHours() + ":" + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes())
  };
  return time;
}


module.exports = router;
