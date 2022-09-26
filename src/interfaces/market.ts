export interface MarketForm {
  name: string;
  description: string;
  address: string;
  phone: string;
  owner: string;
  email: string;
  latitude:string;
  longitude:string;
  h_start:string;
  h_end:string;
  yape:string;
  // social: string;
  // socialMedia: MarketSocialMedia[];
  image: string;
}

export interface MarketSocialMedia{
    name: string;
    url: string;
}

// Market Get

export interface MarketsResponse {
  success: boolean;
  bodegas: Market[];
}
export interface MarketResponse {
  success: boolean;
  bodega: Market;
}
export interface MarketsResponse {
  success: boolean;
  bodegas: Market[];
}

export interface Market {
  _id:               string;
  nombre:            string;
  descripcion:       string;
  nombrePropietario: string;
  telefono:          number;
  latitudDeBodega:   number;
  longitudDeBodega:  number;
  h_inicio:          string;
  h_final:           string;
  youtube:           string;
  Twitter:           string;
  imagen:            string;
  email:             string;
  usuario:           string;
  direccion:         string;
}
