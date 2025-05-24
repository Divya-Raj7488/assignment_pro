import React from "react";
import "../../styles/customProfile.css";

export default function CustomProfile({ name }) {
  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };
  return (
    <div className="customProfileBox">
      <span>{getInitials(name || "U")}</span>
    </div>
  );
}
