<?php

class Sensor
{
    public $sensorId;
    public $sensorName;
    public $sensorDescription;
    public $manufacturer;
    public $totalLifeExpectancyHours;
    public $sensorDeployedId;
    public $turbineDeployedId;
    public $serialNumber;
    public $deployedDate;

    public function __construct($sensorId, $sensorName, $sensorDescription, $manufacturer, $totalLifeExpectancyHours, $sensorDeployedId,
                                $turbineDeployedId, $serialNumber, $deployedDate)
    {
        $this->sensorId = $sensorId;
        $this->sensorName = $sensorName;
        $this->sensorDescription = $sensorDescription;
        $this->manufacturer = $manufacturer;
        $this->totalLifeExpectancyHours = $totalLifeExpectancyHours;
        $this->sensorDeployedId = $sensorDeployedId;
        $this->turbineDeployedId = $turbineDeployedId;
        $this->serialNumber = $serialNumber;
        $this->deployedDate = $deployedDate;
    }

    public static function factory()
    {
        return new Sensor('', '', '', '', '', '', '', '', '');
    }
}