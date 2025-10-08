import { useState } from "react";

export default function ColorBoxesContainer({ colors }) {
  const [currentColors, setCurrentColors] = useState(colors);

  const changeColor = (index) => {
    const newColors = [...currentColors];
    newColors[index] = colors[(colors.indexOf(newColors[index]) + 6)];
    setCurrentColors(newColors);
  };

  return (
    <div className="ColorBoxesContainer">
      {currentColors.map((color, i) => (
        <div
          key={i}
          className="ColorBox"
          style={{ backgroundColor: color }}
          onClick={() => changeColor(i)}
        ></div>
      ))}
    </div>
  );
}
