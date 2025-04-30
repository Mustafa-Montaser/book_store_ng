import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../interfaces/user-login';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { UserRegister } from '../interfaces/user-register';
import { RegisterResponse } from '../interfaces/register-response';
import { UserForgetPassword } from '../interfaces/user-forget-password';
import { ForgetPasswordResponse } from '../interfaces/forget-password-response';
import { UserResetPassword } from '../interfaces/user-reset-password';
import { ResetPasswordResponse } from '../interfaces/reset-password-response';
import { UserChangePassword } from '../interfaces/user-change-password';
import { ChangePasswordResponse } from '../interfaces/change-password-response';

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
