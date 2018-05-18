# etherchat
A social media network based around the ethereum block-chain built off of solidity, java-script, and HTML.

It works by calling events to the ethereum blockchain, then by looking back throughout the blockchain to find the logs of the events.

Features: 
  Currently etherchat contains two events in the EthProj.sol contract.
    Event 1: Message:
      The message event contains three variables:
        1: Message text
        2: Sender
        3: Amount of gas
      The Message event is implemented in the interface improperly: update to the JS scripts is required.
    Event 2: Username
      The username event contains three variables:
        1: Username
        2: Sender
        3: Amount of gas
       The Username event is not implemented in the interface: update to the JS scripts is required.
