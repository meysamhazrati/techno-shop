import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMe from "../../hooks/authentication/me";

const Me = () => {
  const navigate = useNavigate();

  const { isFetchingMe, isMeError } = useMe();

  useEffect(() => {
    if (isMeError) {
      navigate("/");
    }
  }, [isMeError, navigate]);

  return !isFetchingMe && !isMeError && <></>;
};

export default Me;