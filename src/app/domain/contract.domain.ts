import { policyData } from './policy.domain';
import { vehicleData } from './vehicle.domain';

export interface contractData {
  id?: string;
  contractNumber: number;
  contractExpirationDate: string;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  km: number;
  ownerDni: number;
  ownerName: string;
  policyId: string;
}