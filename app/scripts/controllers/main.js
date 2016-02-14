'use strict';

/**
 * @ngdoc function
 * @name pstctaskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pstctaskApp
 */
angular.module('pstctaskApp')
  	.controller('MainCtrl', ['$http', '$scope', function ($http, $scope) {
	$http.get("/scripts/json/data.json").then(function(dt) {
		var opening = [], holiday = [], timingArray = []
		for(var i=0; i<dt.data.length; i++) {
			var timeDtls = dt.data[i].business.timing;
			angular.forEach(timeDtls, function(value, key) {
	  			if(value.length) {
	  				for(var j=0;j<value.length;j++) {
	        			timingArray.push(value[j]);
	  				}
	  			} else {
	  				holiday.push(key);
	  			}
			});
			timingArray = _.uniqWith(timingArray, _.isEqual);
			var arrDate = [];
			for(var k=0;k<timingArray.length;k++) {
				if(timingArray[k].from == "0" && timingArray[k].to == "2359") {
					opening[i] = "24 X 7";
				} else {
					arrDate[k] = formatDate(timingArray[k].from) + " to " + formatDate(timingArray[k].to)
					if(opening[i]) {
						opening[i] =  opening[i] + ' , ' + arrDate[k];
					} else {
						opening[i] = arrDate[k];
					}
				}
			}
			if(holiday.length) {
				var holidayMsg;
				for(var l=0;l<holiday.length;l++) {
					if(holidayMsg) {
						holidayMsg = holidayMsg + ' and ' + DateArray[holiday[l]];
					} else {
						holidayMsg = DateArray[holiday[l]];
					}
				}
			}
			if(holiday.length) {
				opening[i]+= " except " + holidayMsg;
			}
		}
		$scope.opening = opening;
	});

	var DateArray =  {
		"sun" : "Sunday",
		"mon" : "Monday",
		"tue" :	"Tuesday",
		"wed" : "Wednesday",
		"thu" : "Thursday",
		"fri" : "Friday",
		"sat" : "Saturday"	
	};

	function formatDate(timeDt) {
		var Hr = ("0" + parseInt(timeDt/100)%12).slice(-2);
		var Mts = ("0" + timeDt%100).slice(-2);
		var Tm = (timeDt/100)<12? 'AM' : 'PM';
		return (Hr + ":" + Mts + " " + Tm);
	};
}]);