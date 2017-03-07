app.controller('customerController', function ($scope, CustomerService, $filter) {
    init();
    function init() {
        getcustomers();
        datacustomer();
    }

    function datacustomer() {
        $scope.editcustomer = {
            id: 0,
            state: 1
        };
    };

    function getcustomers() {
        var response = CustomerService.getcustomers();
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.modules = res.data; }
        });
    }

    $scope.savecustomer = function() {
        $scope.editcustomer;
        if ($scope.editcustomer.id == 0) {
            var response = CustomerService.savecustomer($scope.editmodule);
            response.then(function(res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getcustomer();
                    datacustomer();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = CustomerService.updatecustomer($scope.editcustomer);
            response.then(function(res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getcustomers();
                    datacustomer();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deletecustomer = function() {
        var response = CustomerService.deletecustomer($scope.editcustomer);
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $("#modaldeletecustomer").modal("hide");
                datacustomer();
                getcustomers();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedcustomer = function(customer, option) {
        $scope.customerselected = customer;
        $scope.editcustomer = angular.copy($scope.customerselected);
        $scope.editcustomer.state = 2;

        if (option == 1) {
            $('#title').val($scope.editcustomer.title);
        }
    };

    $scope.validatecustomer = function() {
        return $scope.editcustomer == null
            || $scope.editcustomer.class == null || $scope.editcustomer.title == null
            || ($scope.editcustomer.title != null && $scope.editcustomer.title.length < 3);
    };

    $scope.newcustomer = function() {
        datacustomer();
    };
});


/* Nombre de tabla: Customer

Campos:
	fullname	        STRING		not null
	numberid	        STRING		not null
	address		STRING		null
	phone		STRING		null
	email		STRING 		null */