// 模拟接口得到的数据
var app = angular.module('food',['ngRoute']);

// resolve对象表示只有每一个resolve键都满足条件才能把路由现实给用户
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/',{
            controller:'FoodCtrl',
            templateUrl:'views/food.html'
        }).
        otherwise({redirectTo:'/'});;
}]);


