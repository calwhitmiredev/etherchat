pragma solidity ^0.4.18;

contract EthProj {
    
    string fMessage;
    
    event Message(address add, string message, uint cost);
    event Username(address add, string name, uint cost);
   
    function setMessage(string _fMessage) public {
        fMessage = _fMessage;
        
        emit Message(msg.sender, _fMessage, msg.value);
    }
    
    function setUsername(string _userName) public {
        emit Username(msg.sender, _userName, msg.value);
    }
   
}
