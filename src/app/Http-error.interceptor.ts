import {Injectable, Injector} from '@angular/core';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {retry, catchError, tap} from 'rxjs/operators';
import {LoadingService} from './services/loading.service';

@Injectable({providedIn: 'root'})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error.message + ' - ' + error.error.code;
          console.log(errorMessage);
          this.loadingService.stopLoading();

          return throwError(errorMessage);
        })
      );
  }
}


// constructor(private injector: Injector, public toasterService: ToastrService) {
// }
//
// intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   return next.handle(request)
//     .pipe(
//       retry(1),
//       catchError((error: HttpErrorResponse) => {
//       const errorMessage = error.error.message + ' - ' + error.error.code;
//
//         console.log(error);
//
//         window.alert(errorMessage);
//         return throwError(errorMessage);
//       })
//     );
// }
// }

