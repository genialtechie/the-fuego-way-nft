import { EthProvider } from './contexts/EthContext';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <EthProvider>
      <div id="App">
        <HomePage />
      </div>
    </EthProvider>
  );
}

export default App;
