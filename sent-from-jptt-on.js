(function(){
    'use strict';

    var app = angular.module('sfjApp', []);
    app.controller('mainController', ['$scope', function($scope){
        $scope.orgText = "請在此輸入文章";
        $scope.newText = "";
        var pattern = /^\s*$/;
        
        var breakLine = function(string) {
            if(string === '') return [''];
            var pattern = /[\x00-\xff]/;
            var lines = [];
            var line = '';
            var count = 0;
            for(var i=0; i<string.length; i++){
                var char = string.charAt(i);
                var width = pattern.test(char) ? 1 : 2;
                if(count + width > 60) {
                    lines.push(line);
                    line = '';
                    count = 0;
                }
                line += char;
                count += width;
            }
            if(line !== '') lines.push(line);
            return lines;
        };
        $scope.$watch('orgText', function(orgText){
            var orgTextArray = orgText.split("\n");
            var strings = [];
            for(var i=0; i<orgTextArray.length; i++){
                var lines = breakLine(orgTextArray[i]);
                strings = strings.concat(lines);
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
