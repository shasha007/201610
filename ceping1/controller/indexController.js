/**
 * Created by jocker on 2016/12/28.
 */


(function(){

    app.controller("indexController",["$scope","$http","$stateParams","API",function($scope,$http,$stateParams,API){

        $scope.lists = [];

        var $data = {
            sorts_id : $stateParams.typeId
        };

        $http.post(API + "Api/get_evalua",$data)
            .success(function(response){
                $scope.lists = response.data;
            });

    }]);


})();