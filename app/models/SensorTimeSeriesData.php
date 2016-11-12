<?php

class SensorTimeSeriesData
{
    public $sensorDeployedId;
    public $dataCollectedDate;
    public $output;
    public $heatRate;
    public $compressorEfficiency;
    public $availability;
    public $reliability;
    public $firedHours;
    public $trips;
    public $starts;

    public function __construct($sensorDeployedId, $dataCollectedDate, $output, $heatRate, $compressorEfficiency, $availability,
                                $reliability, $firedHours, $trips, $starts)
    {
        $this->sensorDeployedId = $sensorDeployedId;
        $this->dataCollectedDate = $dataCollectedDate;
        $this->output = $output;
        $this->heatRate = $heatRate;
        $this->compressorEfficiency = $compressorEfficiency;
        $this->availability = $availability;
        $this->reliability = $reliability;
        $this->firedHours = $firedHours;
        $this->trips = $trips;
        $this->starts = $starts;
    }

    public static function factory()
    {
        return new SensorTimeSeriesData('', '', '', '', '', '', '', '', '', '');
    }
}