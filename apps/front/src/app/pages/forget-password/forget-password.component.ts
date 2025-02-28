import Swal from 'sweetalert2';
import { TokenService } from '../../_services/token.service';
import { NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { PrimeTemplate } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ForgotPasswordService } from '../../_services/forgot-password.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputOtpModule } from 'primeng/inputotp';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forget-password.component.html',
  standalone: true,
  imports: [
    DialogModule,
    PrimeTemplate,
    AvatarModule,
    FormsModule,
    InputTextModule,
    NgIf,
    Button,
    InputOtpModule,
    ButtonModule,
  ],
})

export class ForgotPasswordComponent {

  visible: boolean = true;
  visible2: boolean = false;
  userEmail: string = ''; // Variable to hold the email entered by user
  emailForm: FormGroup; // Define a FormGroup for email validation
  currentUser: any;
  value: any;
  response: any;

  constructor(
    private fb: FormBuilder,
    private forgotService: ForgotPasswordService,
    private tokenService: TokenService,
    private r: Router
  ) {
    // Initialize the form with FormBuilder
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Add Validators for required and email
    });
    this.currentUser = tokenService.getToken();
  }

  onSubmit() {
    const email = this.userEmail;
    this.forgotService.forgotPassword(email).subscribe(
      (response) => {
        // Success Message
        Swal.fire({
          icon: 'warning',
          title: 'Valid!',
          text: `The email with password sent to ${email}.`,
          timer: 4000,
          showConfirmButton: false,
          willClose: () => {
            this.visible2 = true;
          },
        });
        this.response = response;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to send email. Please try again.',
          timer: 4000,
          showConfirmButton: false,
        });
      }
    );
    // Optionally, close the dialog
    this.visible = false;
  }

  get email() {
    return this.emailForm?.get('email');
  }

  checkPassword() {
    if (this.response.password === this.value) {
      this.r.navigate([`/restartPassword/${this.response.email}`]);
    }
    else {
      this.visible2 = false;
      this.r.navigate([`/login`]);
    }
  }
}