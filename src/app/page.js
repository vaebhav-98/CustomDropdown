"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [active, setActive] = useState(false);
  const [country, setCountry] = useState("");

  const data = [
    {
      id: 0,
      name: "John",
      age: 25,
    },
    {
      id: 1,
      name: "Jane",
      age: 30,
    },
    {
      id: 2,
      name: "Bob",
      age: 35,
    },
    {
      id: 3,
      name: "Dwayne",
      age: 37,
    },
    {
      id: 4,
      name: "Smith",
      age: 42,
    },
  ];

  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Multiple Selection Dropdown</h1>
      <div>
        <div
          ref={dropdownRef}
          className="cursor-pointer border border-gray-400 rounded-lg relative bg-white w-56 p-2 flex justify-between items-center"
          onClick={() => setActive(!active)}
        >
          {country ? country : "Select Name"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
        {active && (
          <div className="h-32 overflow-auto w-56 absolute bg-white rounded-xl rounded-t-none border border-gray-300">
            {data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setCountry(item.name);
                    setActive(false);
                    console.log(item.name);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
