"use client";
import CityList from "@/components/CityList";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

interface CityData {
  name: string;
  country: string;
  timezone: string;
}

export default function Home() {
  const [cityList, setCityList] = useState<CityData[]>([]);
  const [cityListInDisplay, setCityListInDisplay] = useState<CityData[]>([]);

  useEffect(() => {
    //fetch data here
    //setCityList(data);
    //setCityListInDisplay(data.splice(0, 50));
  }, []);
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar
        cityList={cityList}
        cityListInDisplay={cityListInDisplay}
        setCityListInDisplay={setCityListInDisplay}
      />
      <CityList cityListInDisplay={cityListInDisplay} />
    </div>
  );
}
