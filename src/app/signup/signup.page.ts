import { Component, OnInit } from '@angular/core';
import { Member } from '../vo/member';
import { CommonService } from '../common/common.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const baseUrl = "http://localhost:89"
const httpFile2 = {
  headers : new HttpHeaders(
    {'ENCTYPE':'multipart/form-data'}
  )
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  member:Member = new Member();
  isUnique:boolean = false;
  constructor(private _cs:CommonService, private _http:HttpClient) { }

  ngOnInit() {
  }
  doJoin(){
    if(!this.isUnique){
      alert('중복체크해주세요.');
      return false;
    }else{
      var url = '/member';
      this.postFile2(url,this.member).subscribe(
        res=>{
          if(res===1){
            alert('회원가입 완료');
          }else {
            alert('회원가입 실패');
            return false;
          }
        },
        err=>{
          console.log(err);
        }
      )
    }
    console.log(this.member);
  }
  setFile(evt){
    this.member.omProfileFile = evt.target.files[0];
  }
  makeFormData(obj):FormData{
    const formData = new FormData();
    for(var key in obj){
      formData.append(key,obj[key]);
    }
    return formData;
  }
  postFile2(url,obj){
    url = baseUrl + url;
    const data = this.makeFormData(obj);
    return this._http.post(url,data,httpFile2);
  }
  checkId(){
    var url="/member/" + this.member.omId;
    this._cs.get(url).subscribe(
      res=>{
        if(!res){
          alert(`${this.member.omId}는 사용 가능한 아이디 입니다.`);
          this.isUnique = true;
        }else{
          alert(`${this.member.omId}는 중복 아이디 입니다.`);
        }
      },
      err=>{
        console.log(err);
      }
    )
  }
  setDaumAddressApi(evt){
    this.member.omZipcode = evt.zip;
    this.member.omAddr1 = evt.addr;
  }
}
