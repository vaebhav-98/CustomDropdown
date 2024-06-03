"use client";

import Dropdown from "@/components/Dropdown";
import data from "../data.json"

export default function Home() {

  const handleSelect = (id) => {
    console.log(`Selected item with id ${id}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Multiple Selection Dropdown</h1>
      <Dropdown
      title="Select Person"
      data={data}
      onSelect={handleSelect}
      />
    </main>
  );
}
