"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToggleSwitch from "@/components/ToggleSwitch";

type ImplantItem = {
  Name: string;
  Unique: boolean;
  Hund: boolean;
  DV: number;
  "Conflict Type": string;
  "Bonus 1": string;
  "Bonus 2": string;
  "Bonus 3": string;
  "Price ¥": number;
  "MnB Only": boolean;
  Source: string;
  Zone: string;
  "Zone Faction": string;
  "Shop Order": number;
  "Elite Only?": boolean;
};

type GroupedImplantItem = Omit<ImplantItem, "Source" | "Zone" | "Zone Faction"> & {
  sources: { Source: string; Zone: string; ZoneFaction: string }[];
};

export default function Implants() {
  const [implantData, setImplantData] = useState<GroupedImplantItem[]>([]);
  const [filters, setFilters] = useState({
    unique: false,
    hund: false,
    elite: false,
  });

  useEffect(() => {
    fetch("/implants.json")
      .then((res) => res.json())
      .then((data: ImplantItem[]) => {
        const grouped = data.reduce<Record<string, GroupedImplantItem>>((acc, curr) => {
          const key = JSON.stringify({
            Name: curr.Name.trim().toLowerCase(),
            DV: curr.DV,
            "Conflict Type": curr["Conflict Type"],
            "Bonus 1": curr["Bonus 1"],
            "Bonus 2": curr["Bonus 2"],
            "Bonus 3": curr["Bonus 3"],
            "Price ¥": curr["Price ¥"],
          });

          if (!acc[key]) {
            acc[key] = {
              ...curr,
              sources: [],
            };
          }

          const sourceKey = `${curr.Source.trim()}|${curr.Zone.trim()}|${curr["Zone Faction"].trim()}`;
          if (!acc[key].sources.some((s) => `${s.Source}|${s.Zone}|${s.ZoneFaction}` === sourceKey)) {
            acc[key].sources.push({
              Source: curr.Source.trim(),
              Zone: curr.Zone.trim(),
              ZoneFaction: curr["Zone Faction"].trim(),
            });
          }

          return acc;
        }, {});

        setImplantData(Object.values(grouped));
      });
  }, []);

  const filteredImplantData = implantData.filter((item) => {
    if (filters.unique && !item.Unique) return false;
    if (filters.hund && !item.Hund) return false;
    if (filters.elite && !item["Elite Only?"]) return false;
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
        <h1 className="text-3xl font-bold text-center mb-10">Implants</h1>

        {/* Filter Controls */}
        <div className="mb-6 flex flex-wrap justify-center gap-6">
          <ToggleSwitch
            label="Unique"
            checked={filters.unique}
            onChange={(checked) => handleFilterChange("unique", checked)}
          />
          <ToggleSwitch
            label="Hund"
            checked={filters.hund}
            onChange={(checked) => handleFilterChange("hund", checked)}
          />
          <ToggleSwitch
            label="Elite Only"
            checked={filters.elite}
            onChange={(checked) => handleFilterChange("elite", checked)}
          />
        </div>

        {/* Implant Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImplantData.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--card-bg)] text-[var(--foreground-light)] shadow-lg rounded-2xl p-6 border border-gray-700 hover:bg-[var(--card-hover-bg)] transition duration-300"
            >
              <h2 className="text-xl font-bold mb-4">{item.Name}</h2>
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex-1">
                  <p>
                    <strong>DV:</strong> {item.DV}
                  </p>
                  <p>
                    <strong>Conflict Type:</strong> {item["Conflict Type"]}
                  </p>
                  <p>
                    <strong>Bonus 1:</strong> {item["Bonus 1"]}
                  </p>
                </div>
                <div className="flex-1">
                  <p>
                    <strong>Bonus 2:</strong> {item["Bonus 2"] || "N/A"}
                  </p>
                  <p>
                    <strong>Bonus 3:</strong> {item["Bonus 3"] || "N/A"}
                  </p>
                  <p>
                    <strong>Price:</strong> ¥{item["Price ¥"]}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Available from:</h3>
                <ul className="list-disc pl-5 text-sm">
                  {item.sources.map((source, idx) => (
                    <li key={idx}>
                      <strong>{source.Source}</strong>, {source.Zone}, {source.ZoneFaction}
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
