import { EthProvider } from "./contexts/EthContext";
import MintPage from "./components/MintPage";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <MintPage/>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
