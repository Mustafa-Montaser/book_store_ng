import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../../../core/interfaces/user-login';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../../core/interfaces/login-response';
import { UserRegister } from '../../../core/interfaces/user-register';
import { RegisterResponse } from '../../../core/interfaces/register-response';
import { UserForgetPassword } from '../../../core/interfaces/user-forget-password';
import { ForgetPasswordResponse } from '../../../core/interfaces/forget-password-response';
import { UserResetPassword } from '../../../core/interfaces/user-reset-password';
import { ResetPasswordResponse } from '../../../core/interfaces/reset-password-response';
import { UserChangePassword } from '../../../core/interfaces/user-change-password';
import { ChangePasswordResponse } from '../../../core/interfaces/change-password-response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private _HttpClient: HttpClient) { }

    onLogin(data: UserLogin): Observable<LoginResponse> {
        return this._HttpClient.post<LoginResponse>('api/auth/login', data);
    }   
    
    onRegister(data: UserRegister): Observable<RegisterResponse> {
        return this._HttpClient.post<RegisterResponse>('api/auth/register', data);
    }   

    onForgetPassword(data: UserForgetPassword): Observable<ForgetPasswordResponse> {
        return this._HttpClient.post<ForgetPasswordResponse>('api/auth/forgot-password', data);
    }   

    onResetPassword(data: UserResetPassword): Observable<ResetPasswordResponse> {
        return this._HttpClient.post<ResetPasswordResponse>('api/auth/reset-password', data);
    }   

    onChangePassword(data: UserChangePassword): Observable<ChangePasswordResponse> {
        return this._HttpClient.post<ChangePasswordResponse>('api/auth/change-password', data);
    }   
}
