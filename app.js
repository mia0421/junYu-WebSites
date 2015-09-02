
var angular = require('angular');
		  	  require('angular-route');
		      require('./bower_components/angular-lazy-img/release/angular-lazy-img.js');
		   


var app = angular.module('junYuHomeApp',['ngRoute','angularLazyImg'])
.value('ProductItem',[
	{name:'3C產品',english:'3C Products',icon:'images/icon/01.png',href:'a01'},
	{name:'貼紙.銘版',english:'Badge nameplate',icon:'images/icon/05.png',href:'a06'},
	{name:'塑膠射出',english:'Plastic Injection',icon:'images/icon/06.png',href:'a07'},
	{name:'水晶琉璃',english:'Cystal Lazurite',icon:'images/icon/04.png',href:'a05'},
	{name:'金屬飾品',english:'Metal jewelry',icon:'images/icon/02.png',href:'a03'},
	{name:'自黏水鑽',english:'Rhinestone',icon:'images/icon/03.png',href:'a04'}
])
.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/product/:type', {
		controller:'ProductCtrl',
		templateUrl:'productTemp.html'
	})
	.otherwise({
		redirectTo: '/product/a01'
	})
}])
.controller('HomeCtrl',['$scope','ProductItem',function($scope, ProductItem) {
	
	$scope.Product = ProductItem;
	$scope.Menu =[
		{name:"公司簡介",tag:"#Company"},
		{name:"產品介紹",tag:"#Product"},
		{name:"聯絡我",tag:"#Contact"}
	]

	$scope.toTag = function(tagName){
	   $('html, body').animate({
	       scrollTop: $(tagName).offset().top
	    }, 300);
	}
	$scope.productClick = function (href) {
		location.href = 'product.html#/product/'+href;
	};

}])
.controller('ProductCtrl',['$scope','$routeParams','ProductItem',function($scope,$routeParams, ProductItem) {
	
	$scope.Product = ProductItem;
	$scope.ProductImg = [];

	$scope.productClick = function (href) {
		location.href  = 'product.html#/product/'+href;
	};
	$scope.home = function(){
		location.href  = 'index.html';
	}
	$scope.checkCurrent = function(type) {
		return $routeParams.type===type;
	}

	var init =(function(){
		$scope.ProductImg = [];
		var conurNum = {
			'a01': 35,
			'a03': 109,
			'a04': 10,
			'a05': 163,
			'a06': 32,
			'a07': 31,
		}
		var type = $routeParams.type;
		for(var i = 1 ; i <= conurNum[type] ; i ++){
			$scope.ProductImg.push('images/productImg/'+ type +'/img_'+ i +'.JPG')
		}
	})();
}]);



