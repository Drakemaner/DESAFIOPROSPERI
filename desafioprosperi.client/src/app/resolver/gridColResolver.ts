import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { IFormGroup } from "../interfaces/IFormGroup";
import { FormData } from "../data/formData";
import { IOS } from "../interfaces/OS";
import { inject, Inject } from "@angular/core";
import { HttpService } from "../services/http/http.service";
import { Observable } from "rxjs";
import { ColDefsGrid } from "../data/ColDefsGrid";
import { ColDef } from 'ag-grid-community';


//Resolver para receber dados de OS
export const ColDefsGridResolver : ResolveFn<ColDef[]>  = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
  
    return ColDefsGrid;
}