import { input } from "@angular/core";
import { ValidatorFn } from "@angular/forms";

export interface IFormGroup {
    id: number
    label: string,
    formControlName: string,
    placeholder?: string,
    value? : string | Date,
    validators? : ValidatorFn[]
    input: {
        type: string,
        placeholder?: string
    },
    editable: boolean
}