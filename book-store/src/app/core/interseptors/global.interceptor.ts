import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
    let userToken: string | null =  localStorage.getItem("userToken") !== null ? 
                                    localStorage.getItem("userToken") : sessionStorage.getItem("userToken"); 
    return next(req.clone({
        url: `https://upskilling-egypt.com:3007/${req.url}`,
        setHeaders: {
            Authorization: `Bearer ${userToken}`
        }
    }));
};



