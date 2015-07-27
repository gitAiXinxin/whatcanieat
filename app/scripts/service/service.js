/**
 * Created by john on 15/6/23.
 */
app.service('FoodService',function($http){
    return{
        getFoodInfo:function(callback){
            $http.get("http://127.0.0.1:9300/food/").success(function(res){
                if(res.code==1){
                    console.log("food service");
                    callback(res.data);
                }else{
                    callback([]);
                }

            });
        }
    };

});
