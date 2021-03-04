import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';

@Injectable()
export class TaskInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

  constructor(private tastService: TaskService,
    private http: HttpClient,
    public router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes("user")) {
      return next.handle(req);
    }
    return next.handle(this.getHeaders(req, next)).pipe(
      tap(() => { }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);
            return this.tastService.postRefreshToken(localStorage.getItem('refreshToken'), localStorage.getItem('token')).pipe(
              switchMap((authResponse: any) => {
                localStorage.setItem('refreshToken', authResponse.refreshToken)
                localStorage.setItem('token', authResponse.token)
                this.refreshTokenInProgress = false;
                this.refreshTokenSubject.next(authResponse.refreshToken);
                return next.handle(this.getHeaders(req, next)).toPromise();
              }),
            );
          } else {
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap((res) => {
                return next.handle(this.getHeaders(req, next));
              })
            );
          }
        }
      })
    );
  }

  getHeaders(req: HttpRequest<any>, next: HttpHandler): any {
    const optionsObj = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const authReq = req.clone({
      headers: optionsObj
    });
    return authReq;
  }
}

