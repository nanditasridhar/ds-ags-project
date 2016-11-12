<?php

class ClientNote
{
    public $clientId;
    public $noteSubject;
    public $noteDescription;

    public function __construct($clientId, $noteSubject, $noteDescription)
    {
        $this->clientId = $clientId;
        $this->noteSubject = $noteSubject;
        $this->noteDescription = $noteDescription;
    }

    public static function factory()
    {
        return new ClientNote('', '', '', '');
    }
}