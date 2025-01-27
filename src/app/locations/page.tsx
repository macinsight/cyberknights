"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToggleSwitch from "@/components/ToggleSwitch";

type LocationItem = {
  Name: string;
  Zone: string;
  "Zone Faction": string;
  "MnB Only": boolean;
  "Connector Type": boolean;
  Doctor: boolean;
  Bed: boolean;
  Weapons: boolean;
  Armor: boolean;
  Gear: boolean;
  Implants: boolean;
  Phone: boolean;
  "VIP\nRoom": boolean;
  Refreshments: boolean;
  "Pawn Shop": boolean;
  Safehouse: boolean;
  Special: boolean;
  "Shop Order": string | number;
};

export default function Locations() {
  const [locationData, setLocationData] = useState<LocationItem[]>([]);
  const [filters, setFilters] = useState({
    mnBOnly: false,
    special: false,
    connectorType: false,
    doctor: false,
    bed: false,
    weapons: false,
    armor: false,
    gear: false,
    implants: false,
    phone: false,
    vipRoom: false,
    refreshments: false,
    pawnShop: false,
    safehouse: false,
    zone: "All",
    faction: "All",
  });

  const [availableZones, setAvailableZones] = useState<string[]>([]);
  const [availableFactions, setAvailableFactions] = useState<string[]>([]);

  useEffect(() => {
    fetch("/locations.json")
      .then((res) => res.json())
      .then((data: LocationItem[]) => {
        setLocationData(data);

        // Populate factions and zones for dropdowns
        const factions = Array.from(new Set(data.map((item) => item["Zone Faction"])));
        setAvailableFactions(["All", ...factions]);
        setAvailableZones(["All"]);
      });
  }, []);

  // Update zones dynamically based on the selected faction
  useEffect(() => {
    if (filters.faction === "All") {
      const allZones = Array.from(new Set(locationData.map((item) => item.Zone)));
      setAvailableZones(["All", ...allZones]);
    } else {
      const factionZones = Array.from(
        new Set(locationData.filter((item) => item["Zone Faction"] === filters.faction).map((item) => item.Zone))
      );
      setAvailableZones(["All", ...factionZones]);
    }
  }, [filters.faction, locationData]);

  const filteredLocationData = locationData.filter((item) => {
    // Zone and Faction Filters
    if (filters.zone !== "All" && item.Zone !== filters.zone) return false;
    if (filters.faction !== "All" && item["Zone Faction"] !== filters.faction) return false;

    // Boolean Filters
    const booleanFilters = [
      { key: "mnBOnly", value: filters.mnBOnly, field: "MnB Only" },
      { key: "special", value: filters.special, field: "Special" },
      { key: "connectorType", value: filters.connectorType, field: "Connector Type" },
      { key: "doctor", value: filters.doctor, field: "Doctor" },
      { key: "bed", value: filters.bed, field: "Bed" },
      { key: "weapons", value: filters.weapons, field: "Weapons" },
      { key: "armor", value: filters.armor, field: "Armor" },
      { key: "gear", value: filters.gear, field: "Gear" },
      { key: "implants", value: filters.implants, field: "Implants" },
      { key: "phone", value: filters.phone, field: "Phone" },
      { key: "vipRoom", value: filters.vipRoom, field: "VIP\nRoom" },
      { key: "refreshments", value: filters.refreshments, field: "Refreshments" },
      { key: "pawnShop", value: filters.pawnShop, field: "Pawn Shop" },
      { key: "safehouse", value: filters.safehouse, field: "Safehouse" },
    ];

    for (const filter of booleanFilters) {
      if (filter.value && !item[filter.field as keyof LocationItem]) return false;
    }

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
        <h1 className="text-3xl font-bold text-center mb-10">Locations</h1>

        {/* Filter Controls */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Faction Dropdown */}
          <div>
            <label htmlFor="faction" className="block text-sm font-medium mb-1">
              Faction
            </label>
            <select
              id="faction"
              value={filters.faction}
              onChange={(e) => handleFilterChange("faction", e.target.value)}
              className="w-full px-3 py-2 bg-[var(--card-bg)] text-[var(--foreground-light)] border border-gray-600 rounded-md shadow-sm focus:outline-none"
            >
              {availableFactions.map((faction) => (
                <option key={faction} value={faction}>
                  {faction}
                </option>
              ))}
            </select>
          </div>

          {/* Zone Dropdown */}
          <div>
            <label htmlFor="zone" className="block text-sm font-medium mb-1">
              Zone
            </label>
            <select
              id="zone"
              value={filters.zone}
              onChange={(e) => handleFilterChange("zone", e.target.value)}
              className="w-full px-3 py-2 bg-[var(--card-bg)] text-[var(--foreground-light)] border border-gray-600 rounded-md shadow-sm focus:outline-none"
            >
              {availableZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>

          {/* Boolean Filters */}
          <div className="flex flex-wrap gap-4">
            {Object.entries(filters)
              .filter(([key]) => key !== "zone" && key !== "faction")
              .map(([key, value]) => (
                <ToggleSwitch
                  key={key}
                  label={key.replace("vipRoom", "VIP Room").replace(/([A-Z])/g, " $1")}
                  checked={Boolean(value)}
                  onChange={(checked) => handleFilterChange(key, checked)}
                />
              ))}
          </div>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocationData.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--card-bg)] text-[var(--foreground-light)] shadow-lg rounded-2xl p-6 border border-gray-700 hover:bg-[var(--card-hover-bg)] transition duration-300"
            >
              <h2 className="text-xl font-bold mb-4">{item.Name}</h2>
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex-1">
                  <p>
                    <strong>Zone:</strong> {item.Zone}
                  </p>
                  <p>
                    <strong>Zone Faction:</strong> {item["Zone Faction"]}
                  </p>
                  <p>
                    <strong>MnB Only:</strong> {item["MnB Only"] ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Special:</strong> {item.Special ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
