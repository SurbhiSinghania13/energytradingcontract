pragma solidity ^0.8.0;

contract EnergyTrading {
    address payable public seller; // the address of the energy seller
    address payable public buyer; // the address of the energy buyer
    uint public energyPrice; // the price per unit of energy
    uint public energyAmount; // the total amount of energy available for sale
    uint public totalPrice; // the total price of the energy being sold
    bool public energySold; // boolean to track if energy has been sold
    bool public energyDelivered; // boolean to track if energy has been delivered
    bool public renewableCertified; // boolean to track if energy is certified as renewable
    bool public qualityCertified; // boolean to track if energy is certified as high quality
    mapping(address => bool) public approvedBuyers; // mapping of approved buyers
    uint public escrowBalance; // the balance of the escrow account
    uint public excessEnergy; // the amount of excess energy stored by the seller
    uint public storedEnergy; // the amount of energy stored by the seller
    mapping(address => uint) public energyUsage; // mapping of energy usage for each buyer
    
    modifier onlySeller {
        require(msg.sender == seller, "Only the seller can perform this action");
        _;
    }
    
    constructor(address payable _seller, uint _energyPrice, uint _energyAmount) {
        seller = _seller;
        energyPrice = _energyPrice;
        energyAmount = _energyAmount;
        totalPrice = energyPrice * energyAmount;
    }
    
    function buyEnergy() public payable {
        require(msg.sender != seller, "You can't buy your own energy!");
        require(msg.sender != buyer, "You have already bought energy from this contract!");
        require(msg.value == totalPrice, "Insufficient payment!");
        require(!energySold, "Energy has already been sold!");
        require(approvedBuyers[msg.sender], "You are not an approved buyer!");
        
        buyer = payable(msg.sender);
        energySold = true;
        escrowBalance = totalPrice; // transfer payment to escrow account
    }
    
    function deliverEnergy() public onlySeller {
        require(!energyDelivered, "Energy has already been delivered!");
        require(energySold, "Energy has not been sold yet!");
        energyDelivered = true;
        escrowBalance = 0; // release payment to the seller
        seller.transfer(address(this).balance);
    }
    
    function approveBuyer(address buyerAddress) public onlySeller {
        approvedBuyers[buyerAddress] = true; // approve a buyer to purchase energy
    }
    
    function certifyRenewable() public onlySeller {
        renewableCertified = true; // certify energy as renewable
    }
    
    function certifyQuality() public onlySeller {
        qualityCertified = true; // certify energy as high quality
    }
    
    function storeEnergy(uint amount) public onlySeller {
        require(energySold, "Energy has not been sold yet!");
        storedEnergy += amount; // store energy for later use
    }
    
    function sellExcessEnergy(uint amount) public onlySeller {
        require(energySold, "Energy has not been sold yet!");
        require(storedEnergy >= amount, "Insufficient stored energy!");
        excessEnergy += amount; // sell excess energy to buyers
        storedEnergy -= amount; // update stored energy amount
    }
    
    function trackEnergyUsage() public {
        energyUsage[msg.sender] += 1; // track the energy usage of each buyer
}    

}
