import { Timestamp } from "firebase/firestore";

export interface notificationData {
    frequency?: string;
    message: string;
    recipient: string;
    type: string;
    timestamp: string;
}