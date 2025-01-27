import React from "react";

type WeaponCardProps = {
  name: string;
  maker: string;
  weaponType: string;
  power: number;
  penetration: number;
  accuracy: number;
  ammo: number;
  range: number;
  ap: number;
  speed: number;
  price: number;
  stun: boolean;
  sources: { Source: string; Zone: string; ZoneFaction: string }[];
};

export default function WeaponCard({
  name,
  maker,
  weaponType,
  power,
  penetration,
  accuracy,
  ammo,
  range,
  ap,
  speed,
  price,
  stun,
  sources,
}: WeaponCardProps) {
  return (
    <div className="bg-[var(--card-bg)] text-[var(--foreground-light)] shadow-lg rounded-2xl p-6 border border-gray-700 hover:bg-[var(--card-hover-bg)] transition duration-300">
      <h2 className="text-xl font-bold mb-4">{name}</h2>
      <div className="flex flex-wrap gap-4 text-sm mb-4">
        <div className="flex-1">
          <p>
            <strong>Maker:</strong> {maker}
          </p>
          <p>
            <strong>Weapon Type:</strong> {weaponType}
          </p>
          <p>
            <strong>Power:</strong> {power}
          </p>
          <p>
            <strong>Penetration:</strong> {penetration}
          </p>
        </div>
        <div className="flex-1">
          <p>
            <strong>Accuracy:</strong> {accuracy}
          </p>
          <p>
            <strong>Ammo:</strong> {ammo > 0 ? ammo : "N/A"}
          </p>
          <p>
            <strong>Range:</strong> {range}
          </p>
          <p>
            <strong>AP:</strong> {ap}
          </p>
        </div>
        <div className="flex-1">
          <p>
            <strong>Speed:</strong> {speed}
          </p>
          <p>
            <strong>Price:</strong> ¥{price}
          </p>
          <p>
            <strong>Stun:</strong> {stun ? "Yes" : "No"}
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Available from:</h3>
        <ul className="list-disc pl-5 text-sm">
          {sources.map((source, index) => (
            <li key={index}>
              <strong>{source.Source}</strong>, {source.Zone}, {source.ZoneFaction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
