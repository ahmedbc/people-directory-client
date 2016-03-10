'use strict';

angular.module('peopleDirectoryClientApp').factory('CompanyServices', ['$http', 'urls', function($http, urls){
	var CompanyEndpoint = urls.BASE_API + '/company';
		var CompanyServices = {};

		// get all the Companies
		CompanyServices.getCompanies = function(){
			return $http.get(CompanyEndpoint + '/getAll').success(function(data, status) {
				return data;
			})
		};

		// get all the Company Departments
		CompanyServices.getCompanyDepartments = function(companyId){
			return $http.get(CompanyEndpoint + '/' + companyId + '/departments').success(function(data, status) {
				return data;
			})
		};

		// remove a company
		CompanyServices.deleteCompany = function(companyId){
			return $http.delete(CompanyEndpoint + '/' + companyId + '/delete').success(function(data, status) {
				return data;
			})
		};

		return CompanyServices;
}])
