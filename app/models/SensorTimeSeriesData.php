<?php

class SensorTimeSeriesData
{
    public $sensorDeployedId;
    public $dataCollectedDate;
    public $kpi;

    public function __construct($sensorDeployedId, $dataCollectedDate, $kpi)
    {
        $this->sensorDeployedId = $sensorDeployedId;
        $this->dataCollectedDate = $dataCollectedDate;
        $this->kpi = $kpi;
    }

    public static function factory()
    {
        return new SensorTimeSeriesData('', '', '');
    }
}