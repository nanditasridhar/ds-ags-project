<?php

class TurbineListing
{
    public $turbineId;
    public $turbineName;
    public $turbineDescription;
    public $capacity;
    public $rampUpTime;
    public $maintenanceInterval;

    public function __construct($turbineId, $turbineName, $turbineDescription, $capacity, $rampUpTime, $maintenanceInterval)
    {
        $this->turbineId = $turbineId;
        $this->turbineName = $turbineName;
        $this->turbineDescription = $turbineDescription;
        $this->capacity = $capacity;
        $this->rampUpTime = $rampUpTime;
        $this->maintenanceInterval = $maintenanceInterval;
    }

    public static function factory()
    {
        return new Turbine('', '', '', '', '', '');
    }
}