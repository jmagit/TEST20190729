import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { User, RegisterUserDAO, LoginService } from '../services/serguridad.service';
import { Router } from '@angular/router';
import { LoggerService } from '../../../indra-core';
import { NotificationService, NotificationType } from '../../common-app';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  public miForm: FormGroup;
  private model: User = new User();

  constructor(private dao: RegisterUserDAO, private notify: NotificationService,
    private out: LoggerService, private router: Router, private login: LoginService) { }

  passwordMatchValidator(g: FormGroup) {
    return g.get('passwordValue').value === g.get('passwordConfirm').value ? null : {'mismatch': true};
 }

  ngOnInit() {
    // const fa = new FormArray([]);
    // this.model.roles.forEach(r => fa.push(
    //   new FormGroup({ role: new FormControl(r.role , Validators.required) })
    // ));
    this.miForm = new FormGroup({
      idUsuario: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.email]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      password: new FormGroup({
          passwordValue: new FormControl('', [Validators.required, Validators.minLength(2)]),
          passwordConfirm: new FormControl('', Validators.minLength(2)),
      }, this.passwordMatchValidator),
      roles: new FormArray([])
    });
    for (const name in this.miForm.controls) {
      if (this.miForm.controls[name] instanceof FormControl) {
        this.miForm.controls[name].valueChanges.subscribe(
          data => { this.formatErrorMessage(this.miForm.controls[name] as FormControl); }
        );
      }
    }
  }
  private formatErrorMessage(cntr: FormControl) {
    if (cntr.invalid) {
      if (cntr.hasError('required')) {
        cntr.setErrors({'customMsg': 'Es obligatorio.'});
      } else if (cntr.hasError('minlength')) {
        cntr.setErrors({'customMsg': `Al menos debe tener ${cntr.getError('minlength').requiredLength} caracteres.`});
      } else if (cntr.hasError('maxlength')) {
        cntr.setErrors({'customMsg': `Como máximo puede tener ${cntr.getError('maxlength').requiredLength} caracteres.`});
      } else if (cntr.hasError('email')) {
        cntr.setErrors({'customMsg': 'Formato incorrecto de correo electronico.'});
      } else if (cntr.hasError('mismatch')) {
        cntr.setErrors({'customMsg': 'No coincide.'});
      }
    }
  }
  addRole() {
    (this.miForm.get('roles') as FormArray).push(
      new FormGroup({ role: new FormControl('Usuarios' , Validators.required) })
    );
  }
  deleteRole(ind: number) {
    (this.miForm.get('roles') as FormArray).removeAt(ind);
  }
  send() {
    const data = this.miForm.value;
    this.model = ({
      idUsuario: data.idUsuario,
      password: data.password.passwordValue,
      nombre: data.nombre,
      roles: data.roles
     } as User);
    this.dao.add(this.model).subscribe(
      rslt => {
        this.login.login(data.idUsuario, data.password.passwordValue).subscribe(
          datos => {
            if (datos) {
              this.notify.add('Ususario reguistrado', NotificationType.log);
              this.router.navigateByUrl('/');
            } else {
              this.notify.add('Error en el registro.');
            }
          },
          err => { this.notify.add(err.message); }
        );
      },
      err => { this.notify.add(err.message); }
    );
  }
}
