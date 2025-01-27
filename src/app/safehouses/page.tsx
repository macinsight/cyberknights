"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToggleSwitch from "@/components/ToggleSwitch";

type SafehouseItem = {
  Property: string;
  "Price ¥": number;
  "MnB only": boolean;
  "Realtor Name": string;
  "Realtor Zone": string;
  "Realtor Faction": string;
  "Shop Order": number;
  "Property Zone": string;
  "Property Faction": string;
};

type GroupedSafehouseItem = Omit<SafehouseItem, "Realtor Name" | "Realtor Zone" | "Realtor Faction"> & {
  realtors: { Name: string; Zone: string; Faction: string }[];
};

export default function Safehouses() {
  const [safehouseData, setSafehouseData] = useState<GroupedSafehouseItem[]>([]);
  const [filters, setFilters] = useState({
    mnBOnly: false,
  });

  useEffect(() => {
    fetch("/safehouses.json")
      .then((res) => res.json())
      .then((data: SafehouseItem[]) => {
        const grouped = data.reduce<Record<string, GroupedSafehouseItem>>((acc, curr) => {
          const key = JSON.stringify({
            Property: curr.Property.trim().toLowerCase(),
            "Price ¥": curr["Price ¥"],
            "Property Zone": curr["Property Zone"],
            "Property Faction": curr["Property Faction"],
          });

          if (!acc[key]) {
            acc[key] = {
              ...curr,
              realtors: [],
            };
          }

          const realtorKey = `${curr["Realtor Name"].trim()}|${curr["Realtor Zone"].trim()}|${curr["Realtor Faction"].trim()}`;
          if (
            !acc[key].realtors.some(
              (realtor) =>
                `${realtor.Name}|${realtor.Zone}|${realtor.Faction}` === realtorKey
            )
          ) {
            acc[key].realtors.push({
              Name: curr["Realtor Name"].trim(),
              Zone: curr["Realtor Zone"].trim(),
              Faction: curr["Realtor Faction"].trim(),
            });
          }

          return acc;
        }, {});

        setSafehouseData(Object.values(grouped));
      });
  }, []);

  const filteredSafehouseData = safehouseData.filter((item) => {
    if (filters.mnBOnly && !item["MnB only"]) return false;
    return true;
  });

  const handleFilterChange = (filter: string, value: boolean) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background-dark)] text-[var(--foreground-light)] font-[var(--font-family)]">
      <Header />
      <main className="flex-grow py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-10">Safehouses</h1>

        {/* Filter Controls */}
        <div className="mb-6 flex flex-wrap justify-center gap-6">
          <ToggleSwitch
            label="MnB Only"
            checked={filters.mnBOnly}
            onChange={(checked) => handleFilterChange("mnBOnly", checked)}
          />
        </div>

        {/* Safehouse Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSafehouseData.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--card-bg)] text-[var(--foreground-light)] shadow-lg rounded-2xl p-6 border border-gray-700 hover:bg-[var(--card-hover-bg)] transition duration-300"
            >
              <h2 className="text-xl font-bold mb-4">{item.Property}</h2>
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex-1">
                  <p>
                    <strong>Price:</strong> ¥{item["Price ¥"]}
                  </p>
                  <p>
                    <strong>Property Zone:</strong> {item["Property Zone"]}
                  </p>
                  <p>
                    <strong>Property Faction:</strong> {item["Property Faction"]}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Realtors:</h3>
                <ul className="list-disc pl-5 text-sm">
                  {item.realtors.map((realtor, idx) => (
                    <li key={idx}>
                      <strong>{realtor.Name}</strong>, {realtor.Zone},{" "}
                      {realtor.Faction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
