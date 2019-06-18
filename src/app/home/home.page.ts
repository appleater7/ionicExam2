import { Component, OnInit } from '@angular/core';
import { Member } from '../vo/member';
import { Router } from '@angular/router';
import { CommonService } from '../common/common.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  members:Member[];
  baseImgUrl:string = 'http://192.168.0.44:89/img/';
  constructor(private _cs:CommonService, private _ac:AlertController, private _router:Router) { }

  ngOnInit() {
    this._cs.get('/members').subscribe(
      res=>{
        this.members=<Member[]>res;
      },
      err=>{
        
      }
    )
  }

  doDelete(omNo:number){
    this._cs.delete('/member/' + omNo).subscribe(
      res=>{
        console.log('doDelete result : ' + res);
      },
      err=>{
        console.log(err);
      }
    )
    console.log(omNo);

  }

  doModify(omId:string){
    this._router.navigateByUrl('/tabs/signup/' + omId);
  }
}
