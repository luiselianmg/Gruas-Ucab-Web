import { Type } from "@angular/core";

export interface widget {
    id: string;
    label: string;
    context: Type<unknown>
}