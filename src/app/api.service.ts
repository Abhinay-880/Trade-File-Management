import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodicElement } from './dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {
    
   }
   login(username:string,password:string):Observable<HttpResponse<any>>{
    return this.http.post<any>("http://localhost:8080/user/login",{username,password},{observe:'response'});
   }register(username:string,password:string,role:string):Observable<HttpResponse<any>>{
    console.log(username,password)
    return this.http.post<any>("http://localhost:8080/user/register",{username,password,role},{observe:"response"});
   }

  uploadFile(file: File, token: string | null): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);
  
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    // Adjust your URL as needed.
    return this.http.post<any>('http://localhost:8080/file/importfile', formData, { headers, observe: 'response' });
  }

  getRecords(jwtToken: string | null) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.get<PeriodicElement[]>('http://localhost:8080/api/file-loads/searchFileLoads', { headers });
  }
  getRecordById(id: any, jwtToken: string | null) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.get<any>(`http://localhost:8080/api/file-loads/${id}`, { headers });
  }
  updateRecord(id: any, jwtToken: string | null,status : string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.put<any>(`http://localhost:8080/api/file-loads/${id}/status`, {status},{ headers });
  }
  deleteRecordById(id:any,jwtToken: string | null){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.delete<any>(`http://localhost:8080/api/file-loads/${id}`, { headers });
  }
  searchByField(token:string|null,filename:string,status:string,id:any,fromDate:any,toDate:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
   
    let params = new HttpParams();
  
    if(filename!==""){
      filename=filename.includes(".csv")?filename:filename+".csv";
      params=params.set('fileName',filename)
      
    }
    if(status!==""){
      params=params.set('status',status)
    }
    if(id!==undefined && id!==null){
      params=params.set("id",id)
    }
    if(fromDate!==undefined && fromDate!==null){
      params=params.set("fromDate",fromDate)
    }
    if(toDate!==undefined && toDate!==null){
      params=params.set("toDate",toDate)
    }
   
    return this.http.get<any>("http://localhost:8080/api/file-loads/searchFileLoads?",{params:params,headers:headers})
    }
    getRole(jwtToken: string | null,userName : string|null) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
      return this.http.get<any>(`http://localhost:8080/user/details/${userName}`, { headers });
    }
    getAllUsers(jwtToken: string | null){
      const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.get<any>(`http://localhost:8080/user/all`, { headers });
    }
    deleteUserById(id:any,jwtToken: string | null){
      const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.delete<any>(`http://localhost:8080/user/${id}`, { headers });
    }
}
