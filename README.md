# the-fuego-way

My first NFT collection, complete with a minting page on the goerli test network

## What is this?
A collection of 20 NFTs, each with a unique image and a unique name. The images are generated using the [HashlipsNFT art generator](https://github.com/HashLips/hashlips_art_engine). The contract is deployed on the goerli test network, and the minting page is hosted on Netlify, check it out [here](https://the-fuego-way.netlify.app/).

I built this project to learn more about NFTs and smart contracts, and to get a better understanding of how to use the [OpenZeppelin](https://openzeppelin.com/) library, which is a great resource for building smart contracts. I also wanted to learn more about the [Ethers.js](https://docs.ethers.io/v5/) library, which is a great resource for interacting with the Ethereum blockchain.

## How to use
1. Install [Node.js](https://nodejs.org/en/)
2. Install [Truffle](https://www.trufflesuite.com/truffle)
3. Install [Ganache](https://www.trufflesuite.com/ganache)
4. Install [Metamask](https://metamask.io/)
5. Clone this repo
6. Run `npm install` in the root directory
7. Run `truffle compile` in the /truffle directory
8. Run `truffle migrate` in the /truffle directory
9. Run `npm run start` in the /client directory
10. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to mint
1. Make sure you have some Goerli ETH in your Metamask wallet
2. Go to the [minting page](https://the-fuego-way.netlify.app/)
3. Click the "Connect Wallet" button
4. Click the "Mint" button
5. Confirm the transaction in Metamask

## How to view your NFTs
NB: You can only view your NFTs if you are connected to the Goerli test network in Metamask
NB: I will be adding a "View NFTs" button to the minting page soon
1. Go to [OpenSea](https://testnets.opensea.io/)
2. Click the "Connect Wallet" button
3. Click the "My Collection" button


