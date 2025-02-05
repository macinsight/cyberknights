export default function ArmorCard({
  name,
  maker,
  ballistics,
  deflection,
  dodge,
  price,
  nanoReady,
  hard,
  ballisticsDeflection,
  balDefDodge,
  sources,
}: ArmorCardProps) {
  return (
    <div className="bg-[var(--card-bg)] text-[var(--foreground-light)] shadow-lg rounded-2xl p-6 border border-gray-700 hover:bg-[var(--card-hover-bg)] transition duration-300">
      <h2 className="text-xl font-bold mb-4">{name}</h2>
      <div className="flex flex-wrap gap-4 text-sm mb-4">
        <div className="flex-1">
          <p>
            <strong>Maker:</strong> {maker}
          </p>
          <p>
            <strong>Ballistics:</strong> {ballistics}
          </p>
          <p>
            <strong>Deflection:</strong> {deflection}
          </p>
        </div>
        <div className="flex-1">
          <p>
            <strong>Dodge:</strong> {dodge}
          </p>
          <p>
            <strong>Price:</strong> ¥{price}
          </p>
          <p>
            <strong>Nano-Ready:</strong> {nanoReady ? "Yes" : "No"}
          </p>
        </div>
        <div className="flex-1">
          <p>
            <strong>Hard:</strong> {hard ? "Yes" : "No"}
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
