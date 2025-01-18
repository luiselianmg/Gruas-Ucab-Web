import { ExtraCostData } from '../domain/extra-cost.domain';

export interface orderAllData {
    id: string;
    orderNumber: number;
    orderDate: string;
    orderStatus: string;
    incidentType: string;
    destination: string;
    location: string;
    dispatcherId: string;
    conductorAssignedId: string;
    cost: number;
    isCostCoveredByPolicy: boolean;
    extraCosts: ExtraCostData[];
    contractId: string;
    payed: boolean;
}