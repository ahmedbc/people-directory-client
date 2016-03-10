'use strict';

angular.module('peopleDirectoryClientApp').factory('EmployeeServices', ['$http', 'urls', function($http, urls){
	var EmployeeEndpoint = urls.BASE_API + '/employee';
		var EmployeeServices = {};

		// add an employee
		EmployeeServices.addEmployee = function(employee){
			console.log(employee);
			return $http.post(EmployeeEndpoint + '/add', employee).success(function(data, status) {
				return data;
			})
		};

		// remove a employee
		EmployeeServices.deleteEmployee = function(employeeId){
			return $http.delete(EmployeeEndpoint + '/' + employeeId + '/delete').success(function(data, status) {
				return data;
			})
		};

		return EmployeeServices;
}])
