import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';

import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserRegister } from '../../interfaces/user-register';
import { SpinnerService } from '../../../../shared/services/spinner.service';

@Component({
    selector: 'app-register',
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        RouterLink,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
    // injections
    private _AuthService = inject(AuthService);
    private _Router = inject(Router);
    private _snackBar = inject(MatSnackBar);
    private _SpinnerService = inject(SpinnerService);
    // =======================================================================================

    // form controls
    readonly email = new FormControl('', [Validators.required, Validators.email]);
    readonly password = new FormControl('', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(15),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};:\'",.<>/?\\\\|]).{3,}$')
    ]);
    readonly fName = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]);
    readonly lName = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]);
    readonly role = new FormControl('Customer', [Validators.required]);
    // =======================================================================================
    
    // form group
    registerForm = new FormGroup({
        first_name: this.fName,
        last_name: this.lName,
        password: this.password,
        email   : this.email,
        role: this.role,
    });
    // =======================================================================================
    
    // constructor
    constructor() {
        merge(this.email.statusChanges, this.email.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updateEmailErrorMessage());

        merge(this.password.statusChanges, this.password.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updatePasswordErrorMessage());

        merge(this.fName.statusChanges, this.fName.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updateFNameErrorMessage());

        merge(this.lName.statusChanges, this.lName.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updateLNameErrorMessage());

        merge(this.role.statusChanges, this.role.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updateRoleErrorMessage());
    }
    // =======================================================================================
    
    // properties 
    emailErrorMessage = signal('');
    passwordErrorMessage = signal('');
    fNameErrorMessage = signal('');
    lNameErrorMessage = signal('');
    roleErrorMessage = signal('');
    passHide = signal(true);
    // =======================================================================================
    
    // methods

    showHidePass(event: MouseEvent) {
        this.passHide.set(!this.passHide());
        event.stopPropagation();
    }

    updateEmailErrorMessage() {
        if (this.email.hasError('required')) {
            this.emailErrorMessage.set('You must enter a value');
        } else if (this.email.hasError('email')) {
            this.emailErrorMessage.set('Not a valid email');
        } else {
            this.emailErrorMessage.set('');
        }
    }

    updateFNameErrorMessage() {
        if (this.fName.hasError('required')) {
            this.fNameErrorMessage.set('You must enter a value');
        } else if (this.fName.hasError('minlength') || this.fName.hasError('maxlength')) {
            this.fNameErrorMessage.set('fisrt name must be between 4 to 10 characters');
        } else {
            this.fNameErrorMessage.set('');
        }
    }

    updateLNameErrorMessage() {
        if (this.lName.hasError('required')) {
            this.lNameErrorMessage.set('You must enter a value');
        } else if (this.lName.hasError('minlength') || this.lName.hasError('maxlength')) {
            this.lNameErrorMessage.set('last name must be between 4 to 10 characters');
        } else {
            this.lNameErrorMessage.set('');
        }
    }

    updateRoleErrorMessage() {
        if (this.role.hasError('required')) {
            this.roleErrorMessage.set('You must enter a value');
        } else {
            this.roleErrorMessage.set('');
        }
    }

    updatePasswordErrorMessage() {
        if (this.password.hasError('required')) {
            this.passwordErrorMessage.set('You must enter a value');
        } else if (this.password.hasError('minlength') || this.password.hasError('maxlength')) {
            this.passwordErrorMessage.set('password must be between 8 to 15 characters');
        } else if (this.password.hasError('pattern')) {
            this.passwordErrorMessage.set('password must contain at least 3 characters, one uppercase letter, one lowercase letter, one number, one special character');
        }  else {
            this.passwordErrorMessage.set('');
        }
    }

    submitRegisterForm(formData: FormGroup) {
        let enableSubmit = false;
        Object.values(this.registerForm.controls).forEach(formCtrl => enableSubmit = formCtrl.errors === null ? true : false);
        if(enableSubmit) {
            this._SpinnerService.isEnabled = true;
            this._AuthService.onRegister(formData.value as UserRegister).subscribe({
                next: (res) => {
                    this._snackBar.open(res.message, "Done", {
                        duration: 5000
                    });
                    this._SpinnerService.isEnabled = false;
                },
                error: (e) => {
                    this._snackBar.open(e.error?.message, "Undo");
                    this._SpinnerService.isEnabled = false;
                },
                complete: () => {
                    this._Router.navigate(["/auth/login"]);
                }
            });
        } else {
            this._snackBar.open("Plz complete the required data", "Close", {
                // duration: 5000,
                horizontalPosition: "right",
                verticalPosition: "bottom",
            });
        }
    } 
    // =======================================================================================
}
