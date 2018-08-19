'use strict'

angular.module('App', ['ngRoute'])


.config(function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeController'
    })
    .otherwise({redirectTo:'/home'})
})

.controller('homeController', function($scope, objService, saveService){
    $('#searchButton').on('click', function(e){
        var objArray = [];

        objService.getObj().then(function(data){
            objArray = data;
            $scope.objects = objArray;

            for(var i =0; i <objArray.length ; i++ ){
                if(saveService.getObj[i].length === 0){
                    saveService.setObject(objArray[i].id, objArray[i]);
                };
            };
                
        }, function(err){
            alert('Objects not found' + err);
        });
    });

})

.service('objService', function($http, $q){
    this.getObj = function(){
        var q = $q.defer();
        var url = 'https://jsonplaceholder.typicode.com/posts';

        $http.get(url)
            .then(function(data){
                q.resolve(data.data);
            }, function(err){
                q.reject(err);
            });
            return q.promise;
        };
})

.service('saveService', function($http, $q){
    this.setObject = function(key, value){
        $http.put('../../' + key, value);
    };
    
    this.getObject = function(key){
        var q = $q.defer();
        $http.get('../../' + key)
            .then(function(data){
                q.resolve(data.data);
            }, function(err) {
                q.reject(err);
            });
        
          return q.promise;
    };
});