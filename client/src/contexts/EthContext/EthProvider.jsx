import React, { useReducer } from 'react';
import EthContext from './EthContext';
import { reducer, initialState } from './state';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletProvider from '@coinbase/wallet-sdk';

export function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID,
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletProvider,
    options: {
      appName: 'The Fuego Way',
      infuraId: process.env.REACT_APP_INFURA_ID,
      chainId: 1,
    },
  },
};
