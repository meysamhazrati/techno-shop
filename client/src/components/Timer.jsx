import { useState, useEffect } from "react";

const Timer = ({ day = true, hour = true, minute = true, expiresAt }) => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    let difference = 0;

    const timer = setInterval(() => {
      difference = Date.parse(expiresAt) - Date.now();

      if (difference > 0) {
        day && setDays(Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, "0"));
        hour && setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0"));
        minute && setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0"));
        setSeconds(Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, "0"));
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [day, hour, minute, expiresAt]);

  return <span>{seconds} {minute && `: ${minutes}`} {hour && `: ${hours}`} {day && days > 0 && `: ${days}`}</span>;
};

export default Timer;