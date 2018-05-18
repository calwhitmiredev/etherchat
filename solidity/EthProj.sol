pragma solidity ^0.4.24;

contract EthProj {
    
    string fMessage;
    
    event Message(address add, string message, uint cost);
    event Username(address add, string name, uint cost);
   
    function setMessage(string _fMessage) public {
        fMessage = _fMessage;
        
        emit Message(msg.sender, _fMessage, tx.gasprice);
    }
    
    function setUsername(string _userName) public {
        emit Username(msg.sender, _userName, tx.gasprice);
    }
   
}
