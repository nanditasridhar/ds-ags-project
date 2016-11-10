<?php

class Turbine
{
    public $turbineId;
    public $turbineName;
    public $turbineDescription;
    public $capacity;
    public $rampUpTime;
    public $maintenanceInterval;
    public $turbineDeployedId;
    public $siteId;
    public $serialNumber;
    public $deployedDate;
    public $totalFiredHours;
    public $totalStarts;
    public $lastPlanned;
    public $lastUnplannedOutageDate;

    public function __construct($turbineId, $turbineName, $turbineDescription, $capacity, $rampUpTime, $maintenanceInterval,
                                $turbineDeployedId, $siteId, $serialNumber, $deployedDate, $totalFiredHours, $totalStarts, $lastPlanned, $lastUnplannedOutageDate)
    {
        $this->turbineId = $turbineId;
        $this->turbineName = $turbineName;
        $this->turbineDescription = $turbineDescription;
        $this->capacity = $capacity;
        $this->rampUpTime = $rampUpTime;
        $this->maintenanceInterval = $maintenanceInterval;
        $this->turbineDeployedId = $turbineDeployedId;
        $this->siteId = $siteId;
        $this->serialNumber = $serialNumber;
        $this->deployedDate = $deployedDate;
        $this->totalFiredHours = $totalFiredHours;
        $this->totalStarts = $totalStarts;
        $this->lastPlanned = $lastPlanned;
        $this->lastUnplannedOutageDate = $lastUnplannedOutageDate;
    }

    public static function factory()
    {
        return new Turbine('', '', '', '', '', '', '', '', '', '', '', '', '', '');
    }
}