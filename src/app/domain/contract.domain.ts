export interface VehicleData {
  id: string;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  km: number;
  ownerDni: number;
  ownerName: string;
}

export interface ContractData {
  id: string;
  numberContract: number;
  expirationDate: string;
  vehicle: VehicleData;
}
