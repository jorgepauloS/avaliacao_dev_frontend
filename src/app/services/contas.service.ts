import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Response } from "../shared/models/Response"
import { Environment } from "environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ContasService {

    private URL: string;

    constructor(private http: HttpClient) {
        this.URL = Environment.URL + "Contas/";
    }

    public post(request: any): Observable<Response> {
        return this.http.post<Response>(this.URL, request);
    }

    public put(id, request: any): Observable<Response> {
        return this.http.put<Response>(this.URL + id, request);
    }

    public get(): Observable<Response> {
        return this.http.get<Response>(this.URL);
    }

    public getSingle(id): Observable<Response> {
        return this.http.get<Response>(this.URL + id);
    }

    public delete(id): Observable<Response> {
        return this.http.delete<Response>(this.URL + id);
    }
}
