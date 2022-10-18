import React, { useReducer } from 'react';
import EthContext from './EthContext';
import { reducer, initialState } from './state';

function EthProvider({ children }) {
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
export default EthProvider;
