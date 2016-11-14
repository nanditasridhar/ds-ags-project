<?php

class SensorListing
{
    public $sensorId;
    public $sensorName;
    public $sensorDescription;
    public $manufacturer;
    public $totalLifeExpectancyHours;

    public function __construct($sensorId, $sensorName, $sensorDescription, $manufacturer, $totalLifeExpectancyHours)
    {
        $this->sensorId = $sensorId;
        $this->sensorName = $sensorName;
        $this->sensorDescription = $sensorDescription;
        $this->manufacturer = $manufacturer;
        $this->totalLifeExpectancyHours = $totalLifeExpectancyHours;
    }

    public static function factory()
    {
        return new SensorListing('', '', '', '', '');
    }
}