import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DashboardDetails } from "../models/task-dashboard.model";
import { TaskErrorInfo } from "../models/task-error-info.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public baseUrl = 'https://ltrx.herokuapp.com/api/v1/auth';
  constructor(private http: HttpClient) { }

  // userDetails
  public userDetails = new BehaviorSubject(new DashboardDetails({}));
  userDetailsObserver = this.userDetails.asObservable();

  onUserDetails(userDetails: DashboardDetails) {
    this.userDetails.next(userDetails);
  }

  postRegister(email, password): Observable<any> {
    let params = new HttpParams().set('email', email).set('password', password);
    return this.http.post(`${this.baseUrl}/register`, params).pipe(catchError(err => this.handleError(err)));
  }

  postVerification(otp, hashToken): Observable<any> {
    let params = new HttpParams().set('otp', otp).set('hashToken', hashToken);
    return this.http.post(`${this.baseUrl}/verification`, params).pipe(catchError(err => this.handleError(err)));
  }

  postlogin(email, password): Observable<any> {
    let params = new HttpParams().set('email', email).set('password', password);
    return this.http.post(`${this.baseUrl}/login`, params).pipe(catchError(err => this.handleError(err)));
  }

  postRefreshToken(refreshToken, accessToken): Observable<any> {
    let params = new HttpParams().set('refreshToken', refreshToken).set('accessToken', accessToken);
    return this.http.post(`${this.baseUrl}/refreshToken`, params).pipe(catchError(err => this.handleError(err)));
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`);
  }

  putUser(userDetails): Observable<any> {
    let { firstname, lastname, country, bio, username, email } = userDetails;
    let params = new HttpParams();
    params = firstname ? params.append('firstname', firstname) : params;
    params = lastname ? params.append('lastname', lastname) : params;
    params = country ? params.append('country', country) : params;
    params = bio ? params.append('bio', bio) : params;
    params = username ? params.append('username', username) : params;
    params = email ? params.append('email', email) : params;
    return this.http.put(`${this.baseUrl}/user`, params).pipe(catchError(err => this.handleError(err)));
  }

  handleError(error: HttpErrorResponse): Observable<TaskErrorInfo> {
    return throwError(error.error);
  }
}