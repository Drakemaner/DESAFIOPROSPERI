import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { IFormGroup } from "../interfaces/IFormGroup";
import { FormData } from "../data/formData";
import { IOS } from "../interfaces/OS";
import { inject, Inject } from "@angular/core";
import { HttpService } from "../services/http/http.service";
import { Observable } from "rxjs";

export function OSResolver(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : Observable<IOS[]>
export function OSResolver(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : Observable<IOS>

//Resolver para receber dados de OS
export function OSResolver(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) :Observable<IOS[]> | Observable<IOS> {
    const http = inject(HttpService)
    if(route.paramMap.get('numOs') == null){
        return http.GetAll<IOS>('OS');
    }
    return http.GetOne<IOS>('OS', parseInt(route.paramMap.get('numOs')!));
}