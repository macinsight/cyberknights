"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WeaponCard from "@/components/WeaponCard";
import ToggleSwitch from "@/components/ToggleSwitch";
import { WeaponItem } from "@/types/WeaponItem";

type GroupedWeaponItem = Omit<WeaponItem, "Source" | "Zone" | "Zone Faction"> & {
  sources: { Source: string; Zone: string; ZoneFaction: string }[];
};

export default function Weapons() {
  const [weaponData, setWeaponData] = useState<GroupedWeaponItem[]>([]);
  const [filters, setFilters] = useState({
    unique: false,
    hund: false,
    stun: false,
    weaponType: "All", // Default to showing all weapon types
  });

  useEffect(() => {
    fetch("/weapons.json")
      .then((res) => res.json())
      .then((data: WeaponItem[]) => {
        const grouped = data.reduce<Record<string, GroupedWeaponItem>>((acc, curr) => {
          const key = JSON.stringify({
            Name: curr.Name.trim().toLowerCase(),
            Maker: curr.Maker.trim().toLowerCase(),
            Power: curr.Power,
            Penetration: curr.Penetration,
            Acc: curr.Acc,
            Ammo: curr.Ammo,
            Range: curr.Range,
            AP: curr.AP,
            Speed: curr.Speed,
            Price: curr.Price,
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

        setWeaponData(Object.values(grouped));
      });
  }, []);

  const filteredWeaponData = weaponData.filter((item) => {
    // Apply filters based on toggles and selected weapon type
    if (filters.unique && !item.Unique) return false;
    if (filters.hund && !item.Hund) return false;
    if (filters.stun && !item.Stun) return false;
    if (filters.weaponType !== "All" && item["Weapon Type"] !== filters.weaponType) return false;
    return true;
  });

  const handleFilterChange = (filter: string, value: boolean | string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background-dark)] text-[var(--foreground-light)] font-[var(--font-family)]">
      <Header />
      <main className="flex-grow py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-10">Weapons</h1>

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
            label="Stun"
            checked={filters.stun}
            onChange={(checked) => handleFilterChange("stun", checked)}
          />
          {/* Weapon Type Dropdown */}
          <div>
            <label htmlFor="weaponType" className="block text-sm font-medium mb-1">
              Weapon Type
            </label>
            <select
              id="weaponType"
              value={filters.weaponType}
              onChange={(e) => handleFilterChange("weaponType", e.target.value)}
              className="block w-full px-3 py-2 bg-[var(--card-bg)] text-[var(--foreground-light)] border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="All">All</option>
              <option value="Club">Club</option>
              <option value="Pistol">Pistol</option>
              <option value="Rifle">Rifle</option>
              <option value="Shotgun">Shotgun</option>
              {/* Add more weapon types as needed */}
            </select>
          </div>
        </div>

        {/* Weapon Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWeaponData.map((item, index) => (
            <WeaponCard
              key={index}
              name={item.Name}
              maker={item.Maker}
              weaponType={item["Weapon Type"]}
              power={item.Power}
              penetration={item.Penetration}
              accuracy={item.Acc}
              ammo={item.Ammo}
              range={item.Range}
              ap={item.AP}
              speed={item.Speed}
              price={item.Price}
              stun={item.Stun}
              sources={item.sources}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
