import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const baseUrl="http://192.168.0.44:89";
const httpJson = { 
  headers : new HttpHeaders(
    {
      'Content-Type':'application/json'
    }
  )
};
const httpFile = {
  headers : new HttpHeaders(
    {
      'ENCTYPE':'multipart/form-data'
    }
  )
};
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http:HttpClient) {}
  get(url,params?){
    url = baseUrl + url;
    return this._http.get(url);
  }
  postFile(url,obj){
    url = baseUrl + url;
    const data = this.makeFormData(obj)
    return this._http.post(url,data,httpFile);
  }
  postJson(url,obj){
    url = baseUrl + url;
    return this._http.post(url,obj,httpJson);
  }
  private makeFormData(obj):FormData{
    const formData = new FormData();
    for(var key in obj){
      formData.append(key,obj[key]);
    }
    return formData;
  }
  delete(url,param?){//?를 주는것은 옵션파라메터로 선언
    url = baseUrl + url;
    return this._http.delete(url);
  }
}
