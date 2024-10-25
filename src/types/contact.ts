export interface ContactInfo {
  primary: boolean;
  email: string | null;
  email2: string | null;
  tel1: string | null;
  tel1Type: string | null;
  tel2: string | null;
  tel2Type: string | null;
  fax: string | null;
  www: string | null;
  otherContact: string | null;
  doNotSendMM: boolean;
}

export interface Address {
  id: number;
  city: string;
  country: string;
  countryCode: string;
  name: string;
  province: string | null;
  street: string;
  zipCode: string;
  coordinates: {
    lat: number | null;
    lng: number | null;
  };
}

export interface AddressInfo {
  id: number;
  primary: boolean;
  contactAddress: boolean;
  extIds: null;
  address: Address;
  contactInfo: ContactInfo;
  territory: null;
}
