import { useEffect, useState } from "react";
import "./Randomizer.css";

export function Randomizer({
  items = [],
  command = "",
  duration = 1000,
  completeCallback = (e) => {},
  backgroundColor = "white",
  textColor = "black",
  winnerTextColor = "black",
  fontWeight = 0,
  textSize = 20,
  containerWidth = 300,
  containerHeight = 100,
  className = "",
}) {
  const [data, setData] = useState([...items]);
  const [ended, setEnded] = useState(false);
  const [winner, setWinner] = useState("");
  const [cancelId, setCancelId] = useState(null);
  const [itemLength, setItemLength] = useState(8); // Speedup a little, 8 will be the value

  useEffect(() => {
    if (command.toLowerCase() === "start") {
      setItemLength(data.length);
      setCancelId(
        setTimeout(() => {
          // get the length
          const length = data.length;
          // We get the winner by selecting a random index from 0 to length
          const selectedIndex = Math.floor(Math.random() * length);
          let _winner = data[selectedIndex];
          if (!_winner) {
            _winner = "No winner";
          }
          setWinner(_winner);
          setEnded(true);
          completeCallback(_winner !== "No winner" ? _winner : undefined);
          data.splice(selectedIndex, 1);
          setData(data);
        }, duration)
      );
    } else if (command.toLowerCase() === "clear") {
      setEnded(false);
      setWinner("");
      if (cancelId) {
        clearTimeout(cancelId);
      }
    } else if (command.toLowerCase() === "reset") {
      setEnded(false);
      setWinner("");
      setData([...items]);
      if (cancelId) {
        clearTimeout(cancelId);
      }
    }
  }, [command]);

  return (
    <>
      <div
        className={`text-loop-container ${className}`}
        style={{
          color: textColor,
          fontWeight: fontWeight,
          fontSize: `${textSize}px`,
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
        }}
      >
        <div
          className="shadow-top"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${backgroundColor}, rgba(0,0,0,0))`,
          }}
        ></div>
        <div
          id="winner-list"
          className={`stop-text ${!ended && "hide-scroller"}`}
          style={{ color: winnerTextColor }}
        >
          <p>{winner}</p>
        </div>
        <div
          className="shadow-bottom"
          style={{
            backgroundImage: `linear-gradient(to top, ${backgroundColor}, rgba(0,0,0,0))`,
          }}
        ></div>
        <div
          className={`scroll-text ${
            command.toLowerCase() !== "start" ? "hide-scroller" : ""
          }  ${ended ? "hide-scroller" : ""}`}
          style={{
            animationName: "scrollingAnimation",
            animationDelay: "1s",
            animationIterationCount: "infinite",
            animationDuration: `${itemLength / 18}s`,
            animationTimingFunction: "linear",
          }}
        >
          {data.map((item) => {
            return <p key={Math.random() * 100000}>{item}</p>;
          })}
        </div>
      </div>
    </>
  );
}
