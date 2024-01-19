import { useEffect, useState } from "react";
import "./Randomizer.css";

export function TextLoop({
  items = [],
  backgroundColor = "white",
  textColor = "black",
  fontWeight = 0,
  textSize = 20,
  containerWidth = 300,
  containerHeight = 100,
  className = "",
  smoothEdges = false,
  speed = 3,
  reverse = false,
}) {
  const [data, setData] = useState([...items, ...items]);

  useEffect(() => {
    if (items.length < 7) {
      items = [...items, ...items];
    }
    setData([...items, ...items]);
    console.log(data.length);
  }, [smoothEdges, reverse]);
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
        {smoothEdges && (
          <>
            <div
              className="shadow-top-half"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${backgroundColor}, rgba(0,0,0,0))`,
              }}
            ></div>
            <div
              className="shadow-bottom-half"
              style={{
                backgroundImage: `linear-gradient(to top, ${backgroundColor}, rgba(0,0,0,0))`,
              }}
            ></div>
          </>
        )}
        <div
          className={`scroll-text`}
          style={{
            animationName: reverse
              ? "scollingAnimation_2"
              : "scollingAnimation_1",
            animationDelay: "0s",
            animationIterationCount: "infinite",
            animationDuration: `${items.length / speed}s`,
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
