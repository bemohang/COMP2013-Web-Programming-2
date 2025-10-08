import "./App.css";
import ColorBox from "./components/ColorBox";
import ColorBoxesContainer from "./components/ColorBoxesContainer";
import colors from "./data/data.js";

function App() {
  return (  
      <ColorBoxesContainer colors={colors} />
  );
}

export default App;
