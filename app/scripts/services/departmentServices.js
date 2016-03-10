'use strict';

angular.module('peopleDirectoryClientApp').factory('DepartmentServices', ['$http', 'urls', function($http, urls){
	var DepartmentEndpoint = urls.BASE_API + '/department';
		var DepartmentServices = {};

		// get all the department employees
		DepartmentServices.getDepartmentEmployees = function(departmentId){
			return $http.get(DepartmentEndpoint + '/' + departmentId + '/employees').success(function(data, status) {
				return data;
			})
		};

		// remove a department
		DepartmentServices.deleteDepartment = function(departmentId){
			return $http.delete(DepartmentEndpoint + '/' + departmentId + '/delete').success(function(data, status) {
				return data;
			})
		};

		return DepartmentServices;
}])
