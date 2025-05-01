import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';

import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserResetPassword } from '../../interfaces/user-reset-password';
import { SpinnerService } from '../../../../shared/services/spinner.service';

@Component({
    selector: 'app-reset-password',
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        RouterLink,
    ],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
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
    readonly otp = new FormControl('', [Validators.required]);
    // =======================================================================================
    
    // form group
    resetPasswordForm = new FormGroup({
        email   : this.email,
        password: this.password,
        otp: this.otp
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

        merge(this.otp.statusChanges, this.otp.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updateOtpErrorMessage());
    }
    // =======================================================================================
    
    // properties 
    emailErrorMessage = signal('');
    passwordErrorMessage = signal('');
    otpErrorMessage = signal('');
    passHide = signal(true);
    // rememberMeChecked = false;
    // =======================================================================================
    
    // methods

    // isRememberChecked(ele: any) {
    //     this.rememberMeChecked = ele.checked;
    // }

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

    updateOtpErrorMessage() {
        if (this.otp.hasError('required')) {
            this.otpErrorMessage.set('You must enter a value');
        } else {
            this.otpErrorMessage.set('');
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

    submitResetPasswordForm(formData: FormGroup) {
        let enableSubmit = false;
        Object.values(this.resetPasswordForm.controls).forEach(formCtrl => enableSubmit = formCtrl.errors === null ? true : false);
        if(enableSubmit) {
            this._SpinnerService.enable();
            this._AuthService.onResetPassword(formData.value as UserResetPassword).subscribe({
                next: (res) => {
                    this._snackBar.open(res.message, "Done", {
                        duration: 3000
                    });
                    this._SpinnerService.disable();
                },
                error: (e) => {
                    this._snackBar.open(e.error?.message, "Undo");
                    this._SpinnerService.disable();
                },
                complete: () => {
                    this._Router.navigate(["/auth/login"]);
                }
            });
        } else {
            this._snackBar.open("Plz complete the required data", "Close", {
                // duration: 3000,
                horizontalPosition: "right",
                verticalPosition: "bottom",
            });
        }
    } 
    // =======================================================================================
}
