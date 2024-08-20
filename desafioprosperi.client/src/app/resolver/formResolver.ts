import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { IFormGroup } from "../interfaces/IFormGroup";
import { FormData } from "../data/formData";

//Resolver para receber dados de Formulário
export const FormResolver : ResolveFn<IFormGroup[]>  = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
  
    return FormData;
}