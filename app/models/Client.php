<?php

class Client
{
    public $clientId;
    public $clientName;
    public $clientDescription;
    public $gicsSector;
    public $gicsSubIndustry;
    public $headquarters;

    public function __construct($clientId, $clientName, $clientDescription, $gicsSector, $gicsSubIndustry, $headquarters)
    {
        $this->clientId = $clientId;
        $this->clientName = $clientName;
        $this->clientDescription = $clientDescription;
        $this->gicsSector = $gicsSector;
        $this->gicsSubIndustry = $gicsSubIndustry;
        $this->headquarters = $headquarters;
    }

    public static function factory()
    {
        return new Client('', '', '', '', '', '');
    }
}