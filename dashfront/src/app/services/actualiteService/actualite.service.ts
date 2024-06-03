import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
  private apiUrl = 'http://localhost:8000/actualites'
  api = 'http://localhost:8000/Commentaires';
  api2=`http://localhost:8089`// Adjust the URL as per your backend


  constructor(private http:HttpClient) { }
            addData(file:File):Observable<any>{
              const formData = new FormData();
              formData.append('file', file);
              return this.http.post<any>(`${this.apiUrl}/upload`,formData)
  }
  add(actuality,url):Observable<any>{
    const  formData ={
      "actuality":actuality,
      "url":url
    };

    return this.http.post<any>(`${this.apiUrl}/add`,formData)
  }
  getall(){
    return this.http.get<any>(`${this.apiUrl}/all`);
  }
  addComment(idactc,commentaire):Observable<any> {
    commentaire={
      contenu:commentaire,
    }
    return this.http.post<any>(`${this.api}/add/${idactc}`,commentaire);

  }
  updateStatus(status,id){

    return this.http.post<any>(`${this.api2}/add/${id}`, status);
  }

  delete(id){

    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
  update(id,actuality){

    return this.http.post<any>(`${this.apiUrl}/update/${id}`,{actuality});
  }
}
