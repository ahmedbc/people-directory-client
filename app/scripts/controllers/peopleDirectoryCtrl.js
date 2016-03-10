'use strict';

/**
 * @ngdoc function
 * @name peopleDirectoryClientApp.controller:PeopleDirectory
 * @description
 * # PeopleDirectory
 * Controller of the peopleDirectoryClientApp
 */

angular.module('peopleDirectoryClientApp')
	.controller('PeopleDirectoryCtrl', ['$rootScope', '$scope', 'CompanyServices', 'DepartmentServices', 'EmployeeServices', 'ngDialog', '$location', '$localStorage', 'AuthServices',
		function($rootScope, $scope, CompanyServices, DepartmentServices, EmployeeServices, ngDialog, $location, $localStorage, AuthServices){

	loadCompanies();

  // Load all the company Departments handler
  $scope.selectCompany = function(companyId){
		loadCompanyDepartments(companyId);
    $scope.selectedCompany = companyId;
    delete $scope.selectedDepartment;
    $scope.departmentEmployees = [];
	}

  // Load all the Department Employees handler
  $scope.selectDepartment = function(departmentId){
    loadDepartmentEmployees(departmentId);
    $scope.selectedDepartment = departmentId;
    delete $scope.selectedEmployee;
  }

  // Load all the Department Employees handler
  $scope.selectEmployee = function(employeeId){
    $scope.selectedEmployee = employeeId;
  }

  // open remove an employee handler
  $scope.removeCompanyModal = function(){
    $scope.companyDeleteDialog = ngDialog.open({
      template: 'views/confirmDelete.html',
      scope: $scope,
      controller: ['$scope', function ($scope) {
        $scope.confirm = function(){
          $scope.$parent.removeCompany($scope.$parent.selectedCompany).then(function(response){
            loadCompanies();
            delete $scope.$parent.selectedCompany
            $scope.closeThisDialog();
          }, function(error) {
            $scope.error = error.statusText + " " + error.status;
          });
        }
      }]
    });
  }

  // remove a company handler
  $scope.removeCompany = function(){
    return removeCompany($scope.selectedCompany);
  }

  // open remove an employee handler
  $scope.removeDepartmentModal = function(){
    $scope.departmentDeleteDialog = ngDialog.open({
      template: 'views/confirmDelete.html',
      scope: $scope,
      controller: ['$scope', function ($scope) {
        $scope.confirm = function(){
          $scope.$parent.removeDepartment($scope.$parent.selectedDepartment).then(function(response){
            loadCompanyDepartments($scope.$parent.selectedCompany);
            delete $scope.$parent.selectedDepartment
            $scope.closeThisDialog();
          }, function(error) {
            $scope.error = error.statusText + " " + error.status;
          });
        }
      }]
    });
  }

  // remove a department handler
  $scope.removeDepartment = function(){
    return removeDepartment($scope.selectedDepartment);
  }

  // open remove an employee handler
  $scope.removeEmployeeModal = function(){
    $scope.confirmDeleteDialog = ngDialog.open({
      template: 'views/confirmDelete.html',
      scope: $scope,
      controller: ['$scope', function ($scope) {
        $scope.confirm = function(){
          $scope.$parent.removeEmployee($scope.$parent.selectedEmployee).then(function(response){
            loadDepartmentEmployees($scope.$parent.selectedDepartment);
            $scope.closeThisDialog();
          }, function(error) {
            $scope.error = error.statusText + " " + error.status;
          });
        }
      }]
    });
  }

  // remove an employee
  $scope.removeEmployee = function(){
    return removeEmployee($scope.selectedEmployee);
  }

	// add an employee
  $scope.addEmployee = function(employee){
    return addEmployee(employee);
  }

  // Load all the companies
  function loadCompanies(){
		CompanyServices.getCompanies().then(function(response){
			$scope.companies = response.data;
		})
	}

  // Load all the company Departments
  function loadCompanyDepartments(companyId){
		CompanyServices.getCompanyDepartments(companyId).then(function(response){
			$scope.companyDepartments = response.data;
		})
	}

  // Load all the company Departments
  function loadDepartmentEmployees(departmentId){
    DepartmentServices.getDepartmentEmployees(departmentId).then(function(response){
      $scope.departmentEmployees = response.data;
    })
  }

  // remove a company
  function removeCompany(companyId){
    return CompanyServices.deleteCompany(companyId);
  }
  // remove a department
  function removeDepartment(departmentId){
    return DepartmentServices.deleteDepartment(departmentId);
  }
	// remove a department
	function removeEmployee(employeeId){
		return EmployeeServices.deleteEmployee(employeeId);
	}

	// add employee
	$scope.addEmployeeModal = function(){
		$scope.addEmployeeDialog = ngDialog.open({
			template: 'views/addEmployee.html',
			scope: $scope,
			controller: ['$scope', function ($scope) {

				$scope.loadDepartments = function(){
					loadCompanyDepartments($scope.companyId);
				}

				$scope.confirm = function(){

					var employee = {
						name: $scope.name,
						email: $scope.email,
						phone: $scope.phone,
						location: $scope.location,
						title: $scope.title,
						department: {id: $scope.departmentId},
						startDate: $scope.startDate,
						endDate: $scope.endDate
					};

					$scope.$parent.addEmployee(employee).then(function(response){
						loadDepartmentEmployees($scope.departmentId);
						$scope.closeThisDialog();
					}, function(error) {
						$scope.error = error.statusText + " " + error.status;
					});
				}
			}]
		});
	}

	// remove a department
  function addEmployee(employee){
		console.log(employee);
    return EmployeeServices.addEmployee(employee);
  }
}]);
