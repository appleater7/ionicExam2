import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { StorageService } from '../common/storage.service';
import { Member } from '../vo/member';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private cs:CommonService, private ss:StorageService) { }

  ngOnInit() {
  }
  login(form){
    var url = '/login';
    this.cs.postJson(url,form.value).subscribe(
      res=>{
        if(res) {
          alert('로그인이 성공 하였습니다.');
          this.ss.setItems(<Member>res);
        }else {
          alert('로그인이 실패 하였습니다.');
        }
      },
      err=>{
        console.log(err);
      }
    )
    console.log(form.value);
  }
}
