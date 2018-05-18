pragma solidity ^0.4.18;

contract EthProj {
    
    string fMessage;
    
    event Message(string message, address add, uint cost);
    event Username(string name, address add, uint cost);
   
    function setMessage(string _fMessage) public {
        fMessage = _fMessage;
        
        emit Message(_fMessage, msg.sender, tx.gasUsed);
    }
    
    function setUsername(string _userName) public {
        emit Username(_userName, msg.sender, tx.gasUsed);
    }
   
}
