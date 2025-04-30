import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';

import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserChangePassword } from '../../../../core/interfaces/user-change-password';
import { SpinnerService } from '../../../../shared/services/spinner.service';

@Component({
    selector: 'app-change-password',
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MatButtonModule,
        MatIconModule,
        RouterLink,
    ],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
    // injections
    private _AuthService = inject(AuthService);
    private _Router = inject(Router);
    private _snackBar = inject(MatSnackBar);
    private _SpinnerService = inject(SpinnerService);
    // =======================================================================================

    // form controls
    readonly password = new FormControl('', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(15),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};:\'",.<>/?\\\\|]).{3,}$')
    ]);
    readonly password_new = new FormControl('', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(15),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};:\'",.<>/?\\\\|]).{3,}$')
    ]);
    // =======================================================================================
    
    // form group
    changePasswordForm = new FormGroup({
        password: this.password,
        password_new: this.password_new
    });
    // =======================================================================================
    
    // constructor
    constructor() {
        merge(this.password.statusChanges, this.password.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updatePasswordErrorMessage());

        merge(this.password_new.statusChanges, this.password_new.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updateNewPasswordErrorMessage());
    }
    // =======================================================================================
    
    // properties 
    passwordErrorMessage = signal('');
    newPasswordErrorMessage = signal('');
    passHide = signal(true);
    rememberMeChecked = false;
    // =======================================================================================
    
    // methods

    showHidePass(event: MouseEvent) {
        this.passHide.set(!this.passHide());
        event.stopPropagation();
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

    updateNewPasswordErrorMessage() {
        if (this.password_new.hasError('required')) {
            this.newPasswordErrorMessage.set('You must enter a value');
        } else if (this.password_new.hasError('minlength') || this.password_new.hasError('maxlength')) {
            this.newPasswordErrorMessage.set('password must be between 8 to 15 characters');
        } else if (this.password_new.hasError('pattern')) {
            this.newPasswordErrorMessage.set('password must contain at least 3 characters, one uppercase letter, one lowercase letter, one number, one special character');
        }  else {
            this.newPasswordErrorMessage.set('');
        }
    }

    submitChangePassowrdForm(formData: FormGroup) {
        let enableSubmit = false;
        Object.values(this.changePasswordForm.controls).forEach(formCtrl => enableSubmit = formCtrl.errors === null ? true : false);
        if(enableSubmit) {
            this._SpinnerService.isEnabled = true;
            if(localStorage.getItem("userToken") !== null || sessionStorage.getItem("userToken") !== null) {
                this._AuthService.onChangePassword(formData.value as UserChangePassword).subscribe({
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
                this._snackBar.open("Plz login first", "Ok", {
                    duration: 5000
                });
                this._Router.navigate(["/auth/login"]);
            }
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
