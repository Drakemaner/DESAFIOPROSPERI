import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { IFormGroup } from "../interfaces/IFormGroup";
import { FormData } from "../data/formData";

export const FormResolver : ResolveFn<IFormGroup[]>  = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
  
    return FormData;
}