import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';

import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserForgetPassword } from '../../interfaces/user-forget-password';
import { SpinnerService } from '../../../../shared/services/spinner.service';

@Component({
    selector: 'app-forget-password',
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MatButtonModule,
    ],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgetPasswordComponent {
    // injections
    private _AuthService = inject(AuthService);
    private _Router = inject(Router);
    private _snackBar = inject(MatSnackBar);
    private _SpinnerService = inject(SpinnerService);
    // =======================================================================================

    // form controls
    readonly email = new FormControl('', [Validators.required, Validators.email]);
    // =======================================================================================
    
    // form group
    forgetPasswordForm = new FormGroup({
        email   : this.email,
    });
    // =======================================================================================
    
    // constructor
    constructor() {
        merge(this.email.statusChanges, this.email.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updateEmailErrorMessage());
    }
    // =======================================================================================
    
    // properties 
    emailErrorMessage = signal('');
    // =======================================================================================
    
    // methods
    
    updateEmailErrorMessage() {
        if (this.email.hasError('required')) {
            this.emailErrorMessage.set('You must enter a value');
        } else if (this.email.hasError('email')) {
            this.emailErrorMessage.set('Not a valid email');
        } else {
            this.emailErrorMessage.set('');
        }
    }

    submitForgetPasswordForm(formData: FormGroup) {
        let enableSubmit = false;
        Object.values(this.forgetPasswordForm.controls).forEach(formCtrl => enableSubmit = formCtrl.errors === null ? true : false);
        if(enableSubmit) {
            this._SpinnerService.enable();
            this._AuthService.onForgetPassword(formData.value as UserForgetPassword).subscribe({
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
                    this._Router.navigate(["/auth/reset-password"]);
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
