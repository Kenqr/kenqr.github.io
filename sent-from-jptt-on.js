(function(){
    'use strict';

    var app = angular.module('sfjApp', []);
    app.controller('mainController', ['$scope', function($scope){
        $scope.orgText = "請在此輸入文章";
        $scope.newText = "";
        $scope.filter = "none";
        
        var prefix = "Sent from JPTT on";
        var pattern = /^\s*$/;
        var filterDatas = {
            "none": {
                prefix: "  ",
                postfix: ""
            },
            "line": {
                prefix: "∣",
                postfix: ""
            }
        };
        
        var getCharWidth = function(character) {
            var pattern = /[\x00-\xff]/;
            return pattern.test(character) ? 1 : 2;
        };
        var getStringWidth = function(string) {
            var count = 0;
            for(var i=0; i<string.length; i++) {
                var character = string.charAt(i);
                count += getCharWidth(character);
            }
            return count;
        };
        var breakLine = function(string) {
            if(string === '') return [''];
            var lines = [];
            var line = '';
            var count = 0;
            for(var i=0; i<string.length; i++) {
                var character = string.charAt(i);
                var width = getCharWidth(character);
                if(count + width > 60) {
                    lines.push(line);
                    line = '';
                    count = 0;
                }
                line += character;
                count += width;
            }
            if(line !== '') lines.push(line);
            return lines;
        };
        var updateOutput = function() {
            var filterData = filterDatas[$scope.filter];
            var orgTextArray = $scope.orgText.split("\n");
            var strings = [];
            for(var i=0; i<orgTextArray.length; i++) {
                var lines = breakLine(orgTextArray[i]);
                strings = strings.concat(lines);
            }
            for(var i=0; i<strings.length; i++) {
                if(!pattern.test(strings[i])){
                    strings[i] = prefix + filterData.prefix + strings[i] + filterData.postfix;
                }
            }
            $scope.newText = strings.join("\n");
        };
        $scope.$watch('orgText', function() {
            updateOutput();
        });
        $scope.$watch('filter', function() {
            updateOutput();
        });
    }]);
    
    app.directive('selectAllOnClick', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    if(!window.getSelection().toString()) {
                        // Required for mobile Safari
                        this.setSelectionRange(0, this.value.length)
                    }
                });
            }
        };
    });
})();
