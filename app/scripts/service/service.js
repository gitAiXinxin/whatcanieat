/**
 * Created by john on 15/6/23.
 */
app.service('FoodService',function($http){
    return{
        getFoodInfo:function(callback){
            $http.get("http://120.26.200.225:9300/food/").success(function(res){
                if(res.code==1){
                    console.log("food service");
                    callback(res.data);
                }else{
                    callback([]);
                }

            });
        },

        // 增加食物点击数
        plusClick:function(id){
            console.log("请求",id);
            $http.get("http://120.26.200.225:9300/food/plus/"+id).success(function(res){});
        }
    };

});
