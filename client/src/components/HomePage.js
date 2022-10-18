import React from 'react';
import { actions, useEth } from '../contexts/EthContext';
import { abi, networks } from '../contracts/TheFuegoWay.json';
import {
  useConnectModal,
  useAccount,
  useContract,
  useDisconnect,
  useNetwork,
  useContractWrite,
  useWaitForTransaction,
} from '@web3modal/react';

const HomePage = () => {
  //get the dispatch from the EthContext in order to update the state
  const { dispatch } = useEth();
  const { open } = useConnectModal();
  const { address, isConnected } = useAccount();
  const disconnect = useDisconnect();
  const { chain } = useNetwork();
  const contractAddress = networks[5].address;

  //get the contract instance
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: abi,
  });

  // set up the contract write function
  const config = {
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName: 'mint',
    chainId: 5,
    args: address,
  };

  const { data, error, write } = useContractWrite(config);
  const { receipt, isWaiting } = useWaitForTransaction({ hash: data?.hash });

  const connectWallet = async () => {
    open();
    // Update the state with the values from the connected wallet
    dispatch({
      type: actions.init,
      data: { artifact: abi, accounts: address, contract },
    });
  };

  return (
    <div>
      <nav>
        {isConnected ? (
          // If the user is connected, display their address
          <div>
            <p>
              Connected to {chain.name} with
              <br /> {address}
            </p>
            <button
              className="btn"
              onClick={() => disconnect()}
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
      {isConnected ? (
        // if accounts, show mint button
        <button
          className="btn mint"
          onClick={() => {
            write().then(() => {
              if (error) console.log(error);
              if (receipt) console.log(receipt);
            });
          }}
        >
          Mint
        </button>
      ) : (
        // if no accounts, show connect wallet button
        <button
          className="btn connect-wallet"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
      <div className="after-mint">
        {isWaiting && (
          <div>
            <p>Waiting for transaction to be mined...</p>
          </div>
        )}
        {receipt && <p>Transaction mined!</p>}
        {error && <p>Transaction failed!</p>}
      </div>
    </div>
  );
};

export default HomePage;
