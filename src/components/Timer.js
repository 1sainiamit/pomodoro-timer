import React, { useEffect, useState } from "react";

function Timer() {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [workSecond, setWorkSec] = useState(1500);
  const [breakSecond, setBreakSecond] = useState(300);
  const [type, setType] = useState("Work");
  const [flag, setFlag] = useState(false);
  const [resetFlag, setResetFlag] = useState(true);

  useEffect(() => {
    if (flag && type === "Work") {
      if (workSecond > 0) {
        setTimeout(() => setWorkSec(workSecond - 1), 1000);
      }
    }
    if (workSecond === 0) {
      alert("Break time has ended");
      setType("Break");
      setWorkSec(1500);
    }
    if (flag && type === "Break") {
      if (breakSecond > 0) {
        setTimeout(() => setBreakSecond(breakSecond - 1), 1000);
      }
      if (breakSecond === 0) {
        alert("Break time has ended");
        setType("Break");
        setBreakSecond(300);
      }
    }
  }, [workSecond, breakSecond, flag, type]);

  const formatSpecifier = (seconds) => {
    let minute = parseInt(seconds / 60).toString();
    let second = parseInt(seconds % 60).toString();
    if (second.length === 1) second = "0" + second;
    if (minute.length === 1) minute = "0" + minute;
    return minute + ":" + second;
  };

  function handleReset() {
    setWorkTime(25);
    setBreakTime(5);
    setType("Work");
    setFlag(false);
    setBreakSecond(300);
    setWorkSec(1500);
    setResetFlag(true);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setWorkSec(workTime * 60);
    setBreakSecond(breakTime * 60);
  }

  return (
    <div>
      <div>
        <h1>
          {type === "Work"
            ? formatSpecifier(workSecond)
            : formatSpecifier(breakSecond)}
        </h1>
        <h1>{type === "Work" ? "Work" : "Break"} - Time</h1>
      </div>
      <div>
        <button
          onClick={() => {
            setFlag(true);
            setResetFlag(false);
          }}
          disabled={flag}
        >
          Start
        </button>
        <button
          onClick={() => {
            setFlag(false);
            setResetFlag(false);
          }}
          disabled={!flag}
        >
          Stop
        </button>
        <button onClick={handleReset} disabled={resetFlag}>
          Reset
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter Work Time"
            value={workTime}
            onChange={(e) => setWorkTime(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Break Time"
            value={breakTime}
          />
          <input type="submit" value="Set" />
        </form>
      </div>
    </div>
  );
}

export default Timer;
