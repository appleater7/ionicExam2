import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from '../vo/member';
import { CommonService } from '../common/common.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

const baseUrl = "http://192.168.0.44:89"
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
  isModify:boolean = false;
  option = {};
  btnStr:string = '회원가입';
  @ViewChild('dt') dt;

  constructor(
    private _cs:CommonService, 
    private _http:HttpClient, 
    private _route:ActivatedRoute, 
    private _lc:LoadingController,
    private _router:Router
    ) {
      this.option['class'] = 
    'color: #fff;background-color: #0275d8;border-color: #0275d8;';
    }

  async ngOnInit() {
    var omId = this._route.snapshot.paramMap.get('omId');
    console.log(omId);
    if(this._route.snapshot.paramMap.get('omId')){
      this.isModify = true;
      this.btnStr = '회원정보수정';
      var lcv = await this._lc.create({
        message:'불러오는중..'
      })
      await lcv.present();
      this._cs.get('/member/'+this._route.snapshot.paramMap.get('omId')).subscribe(
        res=>{
          if(res){
            this.member = <Member>res;
            this.member.omProfile = "http://192.168.0.44:89/img/" 
            + this.member.omProfile;
          }else{

          }
          lcv.dismiss();
        },err=>{
          lcv.dismiss();
        }
      )
    }
    console.log('dt' + this.dt);
  }
  doJoin(){
    if(!this.isModify){
      if(!this.isUnique){
        alert('중복체크해주세요');
        return false;
      }
      this.member.omBirth = this.member.omBirth
      .split('T')[0]
      .split('-')
      .join('');
      var url = '/member';
      this._cs.postFile(url,this.member).subscribe(
        res=>{
          console.log(res);
          this._router.navigate(['/tabs/home']);
        },
        err=>{
          console.log(err);
        }
      )
      console.log(this.member);
    }else{
      this.member.omBirth = this.member.omBirth
      .split('T')[0]
      .split('-')
      .join('');
      var url = '/member/modi';
      this._cs.postFile(url,this.member).subscribe(
        res=>{
          console.log(res);
          this._router.navigate(['/tabs/home']);
        },
        err=>{
          console.log(err);
        }
      )
    }
  }
  setFile(evt){
    var reader = new FileReader();
    reader.onload = (e)=>{
      this.member.omProfile = 
        (<FileReader>e.target).result.toString();
    }
    reader.readAsDataURL(evt.target.files[0]);
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
