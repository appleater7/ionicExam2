import { Component, OnInit } from '@angular/core';
import { Member } from '../vo/member';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  member:Member = new Member();
  constructor() { }

  ngOnInit() {
  }
  doJoin(){
    console.log(this.member);
  }
}
