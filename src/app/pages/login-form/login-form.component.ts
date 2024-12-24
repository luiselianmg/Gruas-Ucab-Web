import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { LocalserviceuserService } from '../../service/localserviceuser.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatDividerModule, MatSnackBarModule, MatTabsModule, MatIconModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

export class LoginFormComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);
  errorMessage = signal('');
  private snackBar = inject(MatSnackBar);

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageEmail()  
    );
  }
  
  //hide password
   hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
  //error message para el email
  updateErrorMessageEmail() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
  
  //error message para el password
  updateErrorMessagePassword() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');

    }  else this.errorMessage.set('');
    
  }
 
  login = {
    email: '',
    password: '',
  };
 
  private localuserService = inject(LocalserviceuserService);
  private router = inject(Router);
  
  onLogin() {
    const { email, password } = this.login;
      /**
       * @param response List of users that match the email and password
       *                 entered by the user. If the list is not empty, the
       *                 email is stored in session storage and the user is
       *                 redirected to the dashboard.
       */
    this.localuserService.getUserCredentials(email, password).subscribe({
      next: (response) => {
        if (response.length >= 1) {
          sessionStorage.setItem('email', email);
          this.router.navigate(['dashboard']);
          this.snackBar.open('Login Successful!', 'Close', {
            duration: 3000
          });
        }
      },

    });
  }
}
