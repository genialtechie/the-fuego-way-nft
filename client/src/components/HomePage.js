import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { providerOptions } from '../contexts/EthContext/EthProvider';
import { actions, useEth } from '../contexts/EthContext';

const HomePage = () => {
  //get the state and dispatch from the EthContext
  const {
    // eslint-disable-next-line no-unused-vars
    state: { artifact, web3, accounts, contract },
    dispatch,
  } = useEth();
  const [web3Modal, setWeb3Modal] = useState(null);

  useEffect(() => {
    // initialize web3modal
    const newWeb3Modal = new Web3Modal({
      network: 'goerli',
      cacheProvider: true,
      providerOptions,
    });
    setWeb3Modal(newWeb3Modal);
    // get cached provider and connect if available
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const connectWallet = async () => {
    // Connect to a wallet using web3modal
    const artifact = require('../contracts/TheFuegoWay.json');
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.requestAccounts();
    const networkID = await web3.eth.net.getId();
    const { abi } = artifact;
    // Create a contract instance with the artifact's ABI and the connected network's address
    let address, contract;
    try {
      address = artifact.networks[networkID].address;
      contract = new web3.eth.Contract(abi, address);
    } catch (err) {
      console.error(err);
    }
    // Update the state with the values from the connected wallet
    dispatch({
      type: actions.init,
      data: { artifact, web3, accounts, networkID, contract },
    });
  };

  const disconnectWallet = async () => {
    // Disconnect from the connected wallet
    await web3Modal.clearCachedProvider();
    window.location.reload();
  };

  return (
    <div>
      <nav>
        {accounts ? (
          // If the user is connected, display their address
          <div>
            <p>
              Connected with <br /> {accounts[0]}
            </p>
            <button
              className="btn"
              onClick={disconnectWallet}
            >
              Disconnect
            </button>
          </div>
        ) : (
          // If the user is not connected, display a connect button
          <button
            className="btn"
            onClick={connectWallet}
          >
            Connect
          </button>
        )}
      </nav>
      <header>
        <h1 className="header">The Fuego Way</h1>
        <h2 className="subheader">
          The Fuego Way is a collection of 20 unique NFTs on the Ethereum
          blockchain.
        </h2>
        <h2 className="subheader">
          Each NFT is a unique piece of art that represents The Fuego Way.
        </h2>
        <h2 className="subheader">The Fuego Way is a way of thinking.</h2>
        <h2 className="subheader">The Fuego Way is a way of being.</h2>
        <h2 className="subheader">The Fuego Way is a way of life.</h2>
      </header>
      {!accounts ? (
        // if no accounts, show connect wallet button
        <button
          className="btn connect-wallet"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : (
        // if accounts, show mint button
        <button
          className="btn mint"
          onClick={async () =>
            await contract.methods.mint(accounts[0]).send({ from: accounts[0] })
          }
        >
          Mint
        </button>
      )}
    </div>
  );
};

export default HomePage;
