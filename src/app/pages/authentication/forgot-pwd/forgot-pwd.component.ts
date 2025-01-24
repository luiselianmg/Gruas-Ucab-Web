import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Type {
  value: string;
}

@Component({
  selector: 'app-fortgot-pwd',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss'],
})
export class AppForgotPwdComponent {
  form: FormGroup;
  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  get f() {
    return this.form.controls;
  }

  recoverPassword() {
    console.log(this.form.value.email);
    if (this.form.valid) {
      this.authService.forgotPwd(this.form.value.email).subscribe((success) => {
        if (success) {
          console.log('Contraseña enviada al email');
          this.snackBar.open('Estatus Actualizado Satisfactoriamente.', 'Close', {
            duration: 50000,
          });
        } else {
          console.log('Error al enviar el email');
        }
      });
    }
  }
}
