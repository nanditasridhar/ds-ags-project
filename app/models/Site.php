<?php

class Site
{
    public $siteId;
    public $clientId;
    public $siteName;
    public $siteDescription;
    public $primaryContact;
    public $capacity;
    public $commercialDate;
    public $addrLine1;
    public $addrLine2;
    public $addrCity;
    public $addrState;
    public $addrZip;
    public $addrCountry;

    public function __construct($siteId, $clientId, $siteName, $siteDescription, $primaryContact, $capacity, $commercialDate, $addrLine1, $addrLine2, $addrCity, $addrState, $addrZip, $addrCountry)
    {
        $this->siteId = $siteId;
        $this->clientId = $clientId;
        $this->siteName = $siteName;
        $this->siteDescription = $siteDescription;
        $this->primaryContact = $primaryContact;
        $this->capacity = $capacity;
        $this->commercialDate = $commercialDate;
        $this->addrLine1 = $addrLine1;
        $this->addrLine2 = $addrLine2;
        $this->addrCity = $addrCity;
        $this->addrZip = $addrZip;
        $this->addrState = $addrState;
        $this->addrCountry = $addrCountry;
    }

    public static function factory()
    {
        return new Site('', '', '', '', '', '', '', '', '', '', '', '', '');
    }
}