/**
 * Created by jocker on 2016/12/28.
 */


(function(){

    app.controller("mainController",["$scope","$http","API",function ($scope,$http,API) {

        $scope.categories = [];

        $http.get(API + "Api/get_sorts",{})
            .success(function(response){
                $scope.categories = response.data;
                console.log($scope.categories);
            })

    }]);

})();