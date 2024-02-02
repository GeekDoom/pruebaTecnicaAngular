import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  LoginForm = this.fb.group({
    email:   ['', Validators.required],
    password:   ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private as: AuthService
   ) { }

  ngOnInit(): void {
  }

  login() {
    const { email, password } = this.LoginForm.value;

     this.as.login(email!, password!)
      .subscribe(ok => {
        if (ok) {
            this.router.navigate(['/index/crud'])
            console.log(ok)

        } else {
            Swal.fire('Error', 'error')
        }
      }) 

  }
    

}