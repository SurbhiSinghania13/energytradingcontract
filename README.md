# Energy Trading Smart Contract 
### This smart contract is designed to facilitate peer-to-peer energy trading between a seller and a buyer on a blockchain-based platform. The platform enables users to generate their own renewable energy and sell it directly to others, bypassing traditional energy providers and reducing energy costs.
## Background:
### Traditional energy providers rely on centralized distribution systems, which can lead to high energy costs and inefficiencies. Peer-to-peer energy trading allows individuals to generate their own renewable energy and sell it directly to others, bypassing traditional providers and reducing costs. Blockchain technology can be used to enable secure and transparent energy trading without the need for intermediaries.
## Features:
#### •	The seller and buyer addresses are publicly visible.
#### •	The price per unit of energy and the total amount of energy available for sale are set during contract creation.
#### •	The total price of the energy being sold is calculated.
#### •	The energy sold status is tracked to prevent duplicate purchases.
#### •	The renewable and quality certification status of the energy is tracked.
#### •	Only approved buyers can purchase energy.
#### •	An escrow account is created to hold the payment until energy delivery is confirmed.
#### •	The seller can approve buyers to purchase energy, certify energy as renewable and high quality, store excess energy for later use, and sell excess energy to buyers.
#### •	The buyer can track their energy usage.
#### •	The contract details can be retrieved for transparency purposes.
## Contract Variables
#### The contract has the following variables:
#### •	seller: The address of the seller
#### •	buyer: The address of the buyer
#### •	energyPrice: The price of energy per unit
#### •	energyAmount: The amount of energy being sold
#### •	totalPrice: The total price of the energy
#### •	energySold: A boolean to check if the energy has been sold
#### •	energyDelivered: A boolean to check if the energy has been delivered
#### •	renewableCertified: A boolean to check if the energy is certified as renewable
#### •	qualityCertified: A boolean to check if the energy is certified as high quality
#### •	approvedBuyers: A mapping of approved buyers
#### •	escrowBalance: The balance held in escrow for the energy transaction
#### •	excessEnergy: The amount of excess energy available for sale
#### •	storedEnergy: The amount of energy stored
#### •	energyUsage: A mapping of energy usage for each address
## Contract Functions
#### The contract has the following functions:
#### •	buyEnergy(): Allows a buyer to purchase energy by sending the total price to the contract
#### •	deliverEnergy(): Allows the seller to confirm delivery of the energy and receive payment
#### •	approveBuyer(address buyerAddress): Allows the seller to approve a buyer to purchase energy
#### •	certifyRenewable(): Allows the seller to certify the energy as renewable
#### •	certifyQuality(): Allows the seller to certify the energy as high quality
#### •	storeEnergy(uint amount): Allows the seller to store energy
#### •	sellExcessEnergy(uint amount): Allows the seller to sell excess energy
#### •	trackEnergyUsage(): Allows any address to track their energy usage
## Modifers:
#### •	onlySeller: Restricts certain functions to be performed only by the seller.
## Testing:
#### Testing for the Energy Trading Smart Contract has been implemented using the Truffle testing framework in Node.js. The tests cover scenarios such as buyer approval, energy certification, energy storage, and energy selling.
## Future Enhancements:
#### In future iterations, additional features can be added to the contract, such as:
#### •	Integration with a smart meter to automate energy tracking and storage
#### •	Automatic generation of invoices and payment processing
#### •	Integration with a renewable energy certificate system for additional certification and transparency
