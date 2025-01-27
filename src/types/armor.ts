type ArmorCardProps = {
    name: string;
    maker: string;
    ballistics: number;
    deflection: number;
    dodge: number;
    price: number;
    nanoReady: boolean;
    hard: boolean;
    ballisticsDeflection: number;
    balDefDodge: number;
    sources: Source[];
  };
type Source = {
    Source: string;
    Zone: string;
    ZoneFaction: string;
  };