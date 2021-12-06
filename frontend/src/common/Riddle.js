import React, { useEffect, useState } from "react";

function Riddle() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch("http://localhost:4000/api/", requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data.questions));
  }, []);
  return (
    <div style={{ marginLeft: "-100px" }}>
      <h1 style={{ marginTop: "15px" }}>
        Welcome to the Einstien's Five house Riddle
      </h1>

      <br />

      <h4>
        Let us assume that there are five houses of different colors next to
        each other on the same road. In each house lives a man of a different
        nationality. Every man has his favorite drink, his favorite brand of
        cigarettes, and keeps pets of a particular kind.
      </h4>
      <br />
      <ol>
        <p>
          <li>1.The Englishman lives in the red house.</li>
          <li>2.The Swede keeps dogs.</li>
          <li>3.The Dane drinks tea.</li>
          <li>4.The green house is just to the left of the white one.</li>
          <li>5.The owner of the green house drinks coffee.</li>
          <li>6.The Pall Mall smoker keeps birds.</li>
          <li>7.The owner of the yellow house smokes Dunhills.</li>
          <li>8.The man in the center house drinks milk.</li>
          <li>9.The Norwegian lives in the first house.</li>
          <li>10.The Blend smoker has a neighbor who keeps cats.</li>
          <li>11.The man who smokes Blue Masters drinks bier.</li>
          <li>12.The man who keeps horses lives next to the Dunhill smoker.</li>
          <li>13.The German smokes Prince.</li>
          <li>14.The Norwegian lives next to the blue house.</li>
          <li>15.The Blend smoker has a neighbor who drinks water. </li>
        </p>
      </ol>
      <h5>The question to be answered is: Who keeps fish?</h5>

      <p>Ans : Write the answer, as for example: Swede</p>
      <input type="text" placeholder="Answer here" />
      <br />
    </div>
  );
}

export default Riddle;
