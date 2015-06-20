<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html>

<head>
    <title>Sent from JPTT on</title>
    <script data-require="angular.js@1.4.1" data-semver="1.4.1" src="https://code.angularjs.org/1.4.1/angular.js"></script>
    <script src="<?=base_url('assets/assoc/pages/sent-from-jptt-on.js')?>"></script>
</head>

<body ng-app="sfjApp" ng-controller="mainController as mainCtrl">
    原文<br>
    <textarea cols="60" rows="20" ng-model="orgText"></textarea><br>
    轉換後<br>
    <textarea cols="80" rows="20" ng-model="newText" select-all-on-click></textarea><br>
</body>
</html>
