import { policyData } from './policy.domain';
import { vehicleData } from './vehicle.domain';

export interface contractData {
  id: string;
  numberContract: number;
  expirationDate: string;
  vehicle: vehicleData;
  policy: policyData;
}
