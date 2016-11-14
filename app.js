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
    self.noteData = [];
    self.kpiFields = ["output", "heatRate", "compressorEfficiency", "availability", "reliability", "firedHours"];
    self.sensorTimeSeriesData = [];

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
    $scope.selectedKpi = null;
    $scope.sensorTimeSeriesData = [];

    $scope.selectClient = function (client, index) {
        $scope.selectedIndex = index;
        $scope.selectedClient = client;
        self.siteData = [];
        self.turbineData = [];
        self.sensorData = [];
        self.sensorTimeSeriesData = [];
        $scope.selectedSite = null;
        $scope.selectedSensor = null;
        $scope.selectedTurbine = null;
        $scope.sensorTimeSeriesData = [];

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

        $scope.getClientNotes(client);
    }

    $scope.getClientNotes = function (client) {
        $http.get(
            'api/ClientNote.php',
            {params: {clientId: client.clientId}}
        ).then(
            function successCallback(response) {
                console.log("Notes worked!", response.data);
                self.noteData = response.data;
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    }

    self.newNoteData = {
        clientId: 0,
        noteSubject: '',
        noteDescription: ''
    };

    $scope.addClientNote = function (client) {
        console.log("Adding!");
        self.newNoteData.clientId = client.clientId;
        $http.post(
            'api/CreateNote.php',
            self.newNoteData
        ).then(
            function successCallback(response) {
                $scope.getClientNotes(client);

                self.newNoteData = {
                    clientId: 0,
                    noteSubject: '',
                    noteDescription: ''
                };
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
        self.sensorTimeSeriesData = [];
        $scope.selectedTurbine = null;
        $scope.selectedSensor = null;
        $scope.sensorTimeSeriesData = [];

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
        self.sensorTimeSeriesData = [];
        $scope.selectedSensor = null;
        $scope.sensorTimeSeriesData = [];

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
        self.sensorTimeSeriesData = null;
        $scope.sensorTimeSeriesData = [];
    }

    $scope.selectOutputKpi = function (client, site, turbine, sensor) {
        console.log("Inside selectOutputKpi");
        $scope.selectedClient = client;
        $scope.selectedSite = site;
        $scope.selectedTurbine = turbine;
        $scope.selectedSensor = sensor;
        $scope.sensorTimeSeriesData = null;
        self.sensorTimeSeriesData = null;

        $http.get(
            'api/byOutputKpi.php',
            {
                params: {
                    sensorDeployedId: sensor.sensorDeployedId
                }
            }
        ).then(
            function successCallback(response) {
                console.log("Select output kpi", response.data);
                self.sensorTimeSeriesData = response.data;
                console.log(self.sensorTimeSeriesData.length, " This is length of sensor time series data");
                $scope.loadChart(sensor, "Output");
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    }

    $scope.selectHeatRateKpi = function (client, site, turbine, sensor) {
        console.log("Inside selectHeatRateKpi");
        $scope.selectedClient = client;
        $scope.selectedSite = site;
        $scope.selectedTurbine = turbine;
        $scope.selectedSensor = sensor;
        $scope.sensorTimeSeriesData = [];
        self.sensorTimeSeriesData = null;

        $http.get(
            'api/byHeatRateKpi.php',
            {
                params: {
                    sensorDeployedId: sensor.sensorDeployedId
                }
            }
        ).then(
            function successCallback(response) {
                console.log("Select heat rate kpi", response.data);
                self.sensorTimeSeriesData = response.data;
                console.log(self.sensorTimeSeriesData.length, " This is length of sensor time series data");
                $scope.loadChart(sensor, "Heat Rate");
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    }

    $scope.selectCompressorEfficiencyKpi = function (client, site, turbine, sensor) {
        console.log("Inside selectCompressorEfficiencyKpi");
        $scope.selectedClient = client;
        $scope.selectedSite = site;
        $scope.selectedTurbine = turbine;
        $scope.selectedSensor = sensor;
        $scope.sensorTimeSeriesData = [];
        self.sensorTimeSeriesData = null;

        $http.get(
            'api/byCompressorEfficiencyKpi.php',
            {
                params: {
                    sensorDeployedId: sensor.sensorDeployedId
                }
            }
        ).then(
            function successCallback(response) {
                console.log("Select compressor efficiency kpi", response.data);
                self.sensorTimeSeriesData = response.data;
                console.log(self.sensorTimeSeriesData.length, " This is length of sensor time series data");
                $scope.loadChart(sensor, "Compressor Efficiency");
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    }

    $scope.selectAvailabilityKpi = function (client, site, turbine, sensor) {
        console.log("Inside selectAvailabilityKpi");
        $scope.selectedClient = client;
        $scope.selectedSite = site;
        $scope.selectedTurbine = turbine;
        $scope.selectedSensor = sensor;
        $scope.sensorTimeSeriesData = [];
        self.sensorTimeSeriesData = null;

        $http.get(
            'api/byAvailability.php',
            {
                params: {
                    sensorDeployedId: sensor.sensorDeployedId
                }
            }
        ).then(
            function successCallback(response) {
                console.log("Select availability kpi", response.data);
                self.sensorTimeSeriesData = response.data;
                console.log(self.sensorTimeSeriesData.length, " This is length of sensor time series data");
                $scope.loadChart(sensor, "Availability");
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    }

    $scope.selectReliabilityKpi = function (client, site, turbine, sensor) {
        console.log("Inside selectReliabilityKpi");
        $scope.selectedClient = client;
        $scope.selectedSite = site;
        $scope.selectedTurbine = turbine;
        $scope.selectedSensor = sensor;
        $scope.sensorTimeSeriesData = [];
        self.sensorTimeSeriesData = null;

        $http.get(
            'api/byReliabilityKpi.php',
            {
                params: {
                    sensorDeployedId: sensor.sensorDeployedId
                }
            }
        ).then(
            function successCallback(response) {
                console.log("Select reliability kpi", response.data);
                self.sensorTimeSeriesData = response.data;
                console.log(self.sensorTimeSeriesData.length, " This is length of sensor time series data");
                $scope.loadChart(sensor, "Reliability");
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    }

    $scope.selectFiredHoursKpi = function (client, site, turbine, sensor) {
        console.log("Inside selectFiredHoursKpi");
        $scope.selectedClient = client;
        $scope.selectedSite = site;
        $scope.selectedTurbine = turbine;
        $scope.selectedSensor = sensor;
        $scope.sensorTimeSeriesData = [];
        self.sensorTimeSeriesData = null;

        $http.get(
            'api/byFiredHours.php',
            {
                params: {
                    sensorDeployedId: sensor.sensorDeployedId
                }
            }
        ).then(
            function successCallback(response) {
                console.log("Select fired hours kpi", response.data);
                self.sensorTimeSeriesData = response.data;
                console.log(self.sensorTimeSeriesData.length, " This is length of sensor time series data");
                $scope.loadChart(sensor, "Fired Hours");
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    }

    $scope.loadChart = function (sensor, kpiName) {

        // Some basic error checking, so that we don't try to create
        // a chart if there is no data.
        if (self.sensorTimeSeriesData.length < 0) {
            return;
        }

        var dates = self.sensorTimeSeriesData.map(function (currentValue, index, arr) {
            return currentValue.dataCollectedDate;
        });

        var kpiValues = self.sensorTimeSeriesData.map(function (currentValue, index, arr) {
            // In order to be charted, the value MUST be a Number type
            // (Highcharts doesn't auto-convert)
            return Number(currentValue.kpi);
        });

        console.log('Highcharts dates', dates);
        console.log('Highcharts values', kpiValues);

        $scope.outputChart = Highcharts.chart('outputChart', {
                title: {
                    text: kpiName,
                    x: -20 //center
                },
                subtitle: {
                    text: 'From ' + dates[0] + ' to ' + dates[dates.length - 1]
                },
                xAxis: {
                    categories: dates
                },
                yAxis: {
                    title: {
                        text: kpiName
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: sensor.sensorDeployedId,
                    data: kpiValues
                }]
            }
        ); // end myChart
    }; // end loadChart()
});

agsApp.controller('AllListingsController', function ($http, $scope) {
    var self = this;
    console.log("I am in AllListingsController");
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

    $http.get(
        'api/allSites.php'
    ).then(
        function successCallback(response) {
            console.log("All sites worked!", response.data);
            self.siteData = response.data;
        },
        function errorCallback(err) {
            console.log("ERROR", err);
        }
    );

    $http.get(
        'api/allTurbines.php'
    ).then(
        function successCallback(response) {
            console.log("All turbines worked!", response.data);
            self.turbineData = response.data;
        },
        function errorCallback(err) {
            console.log("ERROR", err);
        }
    );

    $http.get(
        'api/allSensors.php'
    ).then(
        function successCallback(response) {
            console.log("All sensors worked!", response.data);
            self.sensorData = response.data;
        },
        function errorCallback(err) {
            console.log("ERROR", err);
        }
    );

});