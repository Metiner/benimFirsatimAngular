import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
}

  onSignUp(form: NgForm): void {

  const email = form.value.email;
  const password = form.value.password;
  const repassword = form.value.repassword;

  if (password != repassword)
    window.alert("Şifreler uyumuyor");
}
}
