"use client";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import "../styles/nav.css";
import Logo from "../assets/Logo.svg";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";

export default function Nav() {
  const [searchParam, setSearchParam] = useState("");
  const [showList, setShowList] = useState(false);
  
  function search() {
    console.log("searching brooo");
  }
  return (
    <div className="navbar">
      <div className="logo">
        <Image src={Logo} alt="Logo" style={{ width: "90%", height: "90%" }} />
      </div>
      <div className="links">
        <ul>
          <li>Music</li>
          <li>Podcasts</li>
          <li>Live</li>
          <li>Radio</li>
        </ul>
        <div className="searchBar">
          <input
            type="search"
            value={searchParam}
            onChange={(e) => {
              setSearchParam(e.target.value);
            }}
            className="searchTag"
            placeholder="Search by Artist's Name"
          />
          <BsSearch
            style={{
              width: "26px",
              height: "26px",
              color: "white",
              marginLeft: "-2.5rem",
            }}
            onClick={search}
          />
        </div>
      </div>
      <div className="hamburgerIcon">
        <CiMenuKebab
          className="threeDots"
          onClick={() => {
            setShowList(!showList);
          }}
        />
        {showList && (
          <div className="menu">
            <ul>
              <li>Music</li>
              <li>Podcasts</li>
              <li>Live</li>
              <li>Radio</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
