import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req.clone({
        url: `https://upskilling-egypt.com:3007/${req.url}`
    }));
};



// setHeaders: {
//     Authorization: `Bearer ${localStorage.getItem("umsToken")}`
// }