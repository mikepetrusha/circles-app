import { useState } from "react";
import "./App.css";

type TPoint = {
  x: number;
  y: number;
};

function App() {
  const [points, setPoints] = useState<TPoint[]>([]);
  const [popped, setPopped] = useState<TPoint[]>([]);

  const handlePlaceCircle = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX, y: clientY }]);
  };

  const handleUndo = () => {
    const poppedPoint = points.pop();
    if (!poppedPoint) return;
    setPopped([...popped, poppedPoint]);
    const newarr = [...points];
    setPoints(newarr);
  };

  const handleRedo = () => {
    const newpoint = popped.pop();
    if (!newpoint) return;
    setPoints([...points, newpoint]);
    const newarr = [...popped];
    setPopped(newarr);
  };

  return (
    <>
      <button
        disabled={points.length === 0}
        role="button"
        className="button"
        onClick={handleUndo}
      >
        Undo
      </button>
      <button
        disabled={popped.length === 0}
        role="button"
        className="button"
        onClick={handleRedo}
      >
        Redo
      </button>
      <div className="App" onClick={handlePlaceCircle}>
        {points.map((point, index) => (
          <div
            key={index}
            className="point"
            style={{
              position: "absolute",
              left: point.x - 10,
              top: point.y - 10,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
