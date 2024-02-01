import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { ElementData } from '../../shared/interfaces/element';
import { Observable, catchError, map, of,  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }
    
    getElements(): Observable<ElementData[]>{
        return this.http.get<ElementData[]>(`${this.baseUrl}/elements`)
        .pipe(map((elements: ElementData[]) => elements))
    }
    addElements(elements: ElementData): Observable<ElementData> { 
        return this.http.post<ElementData>(`${this.baseUrl}/elements`, elements);
    }
    updateElement(elements: ElementData): Observable<ElementData> { 
        if(!elements.id) throw new Error('Element id is required')
        return this.http.patch<ElementData>(`${this.baseUrl}/elements/${elements.id}`, elements);
    }
    deleteElementById(elements: ElementData): Observable<boolean> { 
        return this.http.delete(`${this.baseUrl}/elements/${elements.id}`)
            .pipe(
                catchError(err => of(false)),
                map(resp => true)
            );
    }

}
