pragma solidity ^0.5.0;

contract EtherWallet {
    
    //owner's address
    address public owner;
    
    //constructor function to define the contract owner
    constructor(address _owner) public {
        
        //makes address passed the owner
        owner = _owner;
    }
    
    //functon to enable eth deposit to smart contract
    function deposit() payable public {
    }

    //function to send ether from smart contract
    function send(address payable _to, uint _amount) public {
        
        //requires that sender must be the owner address
        require(msg.sender == owner, 'sender is not allowed');
        
        //transfers ether from sender to _to address
        _to.transfer(_amount);
    }
    
    //function to check wallet balance
    function balanceOf() view public returns(uint) {
        
        //returns the ether balance of owner address
        return address(this).balance;
    }
}











