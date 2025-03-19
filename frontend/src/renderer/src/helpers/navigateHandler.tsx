import React from "react";
import {useNavigate} from "react-router";

export const useCustomNavigate = () => {
  const navigate = useNavigate();
  return (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/${e.currentTarget.name}`);
  };
}

