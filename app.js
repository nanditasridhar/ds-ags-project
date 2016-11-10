/**
 * Created by Nan on 11/2/2016.
 */
var agsApp = angular.module('agsApp', ['ngRoute']);

agsApp.controller('ClientController', function ($http, $scope) {

    var self = this;
    console.log("I am in ClientController");
    self.clientData = []; //All clients in database
    self.siteData = [];
    self.turbineData = [];
    self.sensorData = [];

    $http.get(
        'api/Client.php'
    ).then(
        function successCallback(response) {
            console.log("It worked!", response.data);
            self.clientData = response.data;
        },
        function errorCallback(err) {
            console.log("ERROR", err);
        }
    );

    $scope.selectedIndex = null;
    $scope.selectedClient = null;
    $scope.selectedSite = null;
    $scope.selectedSiteIndex = null;
    $scope.selectedTurbine = null;
    $scope.selectedTurbineIndex = null;
    $scope.selectedSensor = null;

    $scope.selectClient = function (client, index) {
        $scope.selectedIndex = index;
        $scope.selectedClient = client;
        self.siteData = [];
        self.turbineData =[];
        self.sensorData = [];
        $scope.selectedSite = null;
        console.log("Searching for", client);
        $http.get(
            'api/Site.php',
            {params: {clientId: client.clientId}}
        ).then(
            function successCallback(response) {
                console.log("Sites worked!", response.data);
                console.log("Sites", self.siteData.length);
                self.siteData = response.data;
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    }

    $scope.selectSite = function (client, site, index) {
        console.log("Inside selectSite method");
        $scope.selectedClient = client;
        $scope.selectedSiteIndex = index;
        $scope.selectedSite = site;
        self.turbineData = [];
        self.sensorData = [];
        $scope.selectedTurbine = null;
        $scope.selectedSensor = null;
        $http.get(
            'api/Turbine.php',
            {params: {siteId: site.siteId}}
        ).then(
            function successCallback(response) {
                console.log("Turbines worked!", response.data);
                console.log("Turbines", self.turbineData.length);
                self.turbineData = response.data;
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    }

    $scope.selectTurbine = function (client, site, turbine, index) {
        console.log("Inside selectTurbine method");
        $scope.selectedClient = client;
        $scope.selectedSite = site;
        $scope.selectedTurbine = turbine;
        $scope.selectedTurbineIndex = index;
        self.sensorData = [];
        $scope.selectedSensor = null;
        $http.get(
            'api/Sensor.php',
            {params: {turbineDeployedId: turbine.turbineDeployedId}}
        ).then(
            function successCallback(response) {
                console.log("Sensors worked!", response.data);
                console.log("Sensors", self.sensorData.length);
                self.sensorData = response.data;
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    }

    $scope.selectSensor = function (client, site, turbine, sensor, index) {
        console.log("Inside selectSensor method");
        $scope.selectedClient = client;
        $scope.selectedSite = site;
        $scope.selectedTurbine = turbine;
        $scope.selectedSensor = sensor;
        $scope.selectedSensorIndex = index;
    }
});