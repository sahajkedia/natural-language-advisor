import Button from "@mui/material/Button";

export default function JoinScreen({ start }) {
  return (
    <div className="join-screen">
      <h2>Join Quiz</h2>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
        consequatur ipsa mollitia, rerum cum blanditiis nulla odit ratione iure
        porro maxime delectus ea!
      </p>

      <button onClick={start} className="btn btn--dark">
        Start
      </button>
    </div>
  );
}
