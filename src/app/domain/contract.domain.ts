import { vehicleData } from './vehicle.domain';
import { policyData } from './policy.domain';

export interface contractData {
    id: string;
    numberContract: number;
    expirationDate: string;
    vehicle: vehicleData;
    policy: policyData;
  }