angular.module("loginApp").controller("loginController",["$scope","$log","$window","auth",function(o,n,l,i){o.user={login:"",pwd:""},o.logAuth=function(){n.info("user login",o.user.login),n.info("user password")},o.logAuthObject=function(o){n.info("user login",o.login),n.info("user pwd"),i.local(o.login,o.pwd);var e=!1;e?(n.info("user authenticated"),l.open("success.html","_self")):(n.info("wrong credentials"),n.info("list of valid users: "+i.list()))}}]);