(function(){
    'use strict';

    var app = angular.module('sfjApp', []);
    app.controller('mainController', ['$scope', function($scope){
        $scope.orgText = "請在此輸入文章";
        $scope.newText = "";
        var pattern = /^\s*$/;
        
        var breakLine = function(string) {
            var pattern = /[\x00-\xff]/;
            var strings = [];
            var line = '';
            var count = 0;
            for(var i=0; i<string.length; i++){
                var char = string.charAt(i);
                line += char;
                if(pattern.test(char)) count += 1;
                else count += 2;
                if(count >= 59 || i==string.length-1) {
                    strings.push(line);
                    line = '';
                    count = 0;
                }
            }
            return strings;
        };
        $scope.$watch('orgText', function(orgText){
            var orgTextArray = orgText.split("\n");
            var strings = [];
            for(var i=0; i<orgTextArray.length; i++){
                strings = strings.concat(breakLine(orgTextArray[i]));
            }
            for(var i=0; i<strings.length; i++){
                if(!pattern.test(strings[i])){
                    strings[i] = "Sent from JPTT on " + strings[i];
                }
            }
            $scope.newText = strings.join("\n");
        });
    }]);
    
    app.directive('selectAllOnClick', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    if (!window.getSelection().toString()) {
                        // Required for mobile Safari
                        this.setSelectionRange(0, this.value.length)
                    }
                });
            }
        };
    });
})();
