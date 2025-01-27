"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import ArmorCard from "@/components/ArmorCard";
import ToggleSwitch from "@/components/ToggleSwitch";

type GroupedArmorItem = Omit<ArmorItem, "Source" | "Zone" | "Zone Faction"> & {
  sources: Source[];
};

export default function Armor() {
  const [armorData, setArmorData] = useState<GroupedArmorItem[]>([]);
  const [filters, setFilters] = useState({
    elite: false,
    mnB: false,
    hund: false,
  });

  useEffect(() => {
    fetch("/armor.json")
      .then((res) => res.json())
      .then((data: ArmorItem[]) => {
        const grouped = data.reduce<Record<string, GroupedArmorItem>>((acc, curr) => {
          // Normalize fields for grouping
          const key = JSON.stringify({
            Name: curr.Name.trim().toLowerCase(),
            Maker: curr.Maker.trim().toLowerCase(),
            Ballistics: curr.Ballistics,
            Deflection: curr.Deflection,
            Dodge: curr.Dodge,
            NanoReady: curr["Nano-Ready"],
            Hard: curr.Hard,
            Price: curr["Price ¥"],
          });
  
          // Create or update the group
          if (!acc[key]) {
            acc[key] = {
              ...curr,
              sources: [],
            };
          }
  
          // Avoid adding duplicate sources
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
  
        setArmorData(Object.values(grouped));
      });
  }, []);
  

  const filteredArmorData = armorData.filter((item) => {
    // Hund filter: Show only items that match the toggle state
    if (filters.hund && !item.Hund) return false; // Show only Hund:true if toggle is on
    if (!filters.hund && item.Hund) return false; // Show only Hund:false if toggle is off

    // Apply other filters
    if (filters.elite && !item.Elite) return false; // Filter for Elite
    if (filters.mnB && !item["MnB Only"]) return false; // Filter for MnB
    return true;
  });

  const handleFilterChange = (filter: string, value: boolean) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-10">Armor</h1>

        {/* Filter Controls */}
        <div className="mb-6 flex justify-center gap-6">
          <ToggleSwitch
            label="Elite"
            checked={filters.elite}
            onChange={(checked) => handleFilterChange("elite", checked)}
          />
          <ToggleSwitch
            label="MnB Only"
            checked={filters.mnB}
            onChange={(checked) => handleFilterChange("mnB", checked)}
          />
          <ToggleSwitch
            label="Hund"
            checked={filters.hund}
            onChange={(checked) => handleFilterChange("hund", checked)}
          />
        </div>

        {/* Armor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArmorData.map((item, index) => (
            <ArmorCard
              key={index}
              name={item.Name}
              maker={item.Maker}
              ballistics={item.Ballistics}
              deflection={item.Deflection}
              dodge={item.Dodge}
              price={item["Price ¥"]}
              nanoReady={item["Nano-Ready"]}
              hard={item.Hard}
              ballisticsDeflection={item["Ballistics + Deflection"]}
              balDefDodge={item["Bal. + Def.+ Dodge"]}
              sources={item.sources}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
