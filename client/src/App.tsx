import React from 'react';
import { EthProvider } from './contexts/EthContext';
import HomePage from './components/HomePage';
import type { ConfigOptions } from '@web3modal/react';
import { Web3Modal } from '@web3modal/react';
import { chains, providers } from '@web3modal/ethereum';
import './App.css';

function App() {
  if (!process.env.REACT_APP_WALLET_CONNECT_ID)
    throw new Error(
      'You need to provide REACT_APP_WALLET_CONNECT_ID env variable'
    );

  // Configure web3modal
  const config: ConfigOptions = {
    projectId: process.env.REACT_APP_WALLET_CONNECT_ID,
    theme: 'dark',
    accentColor: 'default',
    ethereum: {
      appName: 'fuegoway',
      autoConnect: true,
      chains: [chains.goerli],
      providers: [
        providers.walletConnectProvider({
          projectId: process.env.REACT_APP_WALLET_CONNECT_ID,
        }),
      ],
    },
  };

  return (
    <>
      <EthProvider>
        <div id="App">
          <HomePage />
        </div>
      </EthProvider>
      <Web3Modal config={config} />
    </>
  );
}

export default App;
