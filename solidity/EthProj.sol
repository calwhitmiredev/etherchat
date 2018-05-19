pragma solidity ^0.4.18;

contract EthProj {
    
    string fMessage;
    
    event Message(string message, address add, uint256 cost);
    event Username(string name, address add, uint256 cost);
   
    function setMessage(string _fMessage) public {
        fMessage = _fMessage;
        
        emit Message(_fMessage, msg.sender, gasleft());
    }
    
    function setUsername(string _userName) public {
        emit Username(_userName, msg.sender, gasleft());
    }
   
}
