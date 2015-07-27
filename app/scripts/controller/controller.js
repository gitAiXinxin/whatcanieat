/**
 * Created by john on 15/6/23.
 */
app.controller('FoodCtrl', function($scope,FoodService) {

    FoodService.getFoodInfo(function(foods){

        // 获取异步请求返回的信息
        $scope.foods = foods;

    });

    $scope.foodCart = [];

    // 展示食物弹层
    $scope.preview = function(food){
        $scope.currentFood = food;
        $scope.dialogShow = true;
    };

    // 添加进餐盒
    $scope.plus = function(food){
        $scope.foodCart.push(food);
    };

    // 关闭食物碳层
    $scope.closePreivew = function(){
        $scope.dialogShow = false;
    }
});


