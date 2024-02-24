import { useState, useEffect } from "react";

const Timer = ({ expiresAt }) => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    let difference = 0;

    const timer = setInterval(() => {
      difference = Date.parse(expiresAt) - Date.now();

      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, "0"));
        setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0"));
        setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0"));
        setSeconds(Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, "0"));
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  return <span>{seconds} : {minutes} : {hours} {days > 0 && `: ${days}`}</span>;
};

export default Timer;