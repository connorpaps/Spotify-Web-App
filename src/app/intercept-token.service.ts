import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InterceptTokenService implements HttpInterceptor {

  constructor(private a: AuthService) { }

  // methods
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the existing request, and add the authorization header
    // only if url does not contain spotify.com
    if (!request.url.includes("spotify.com")) {
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${this.a.getToken()}`
        }
      });
  }
    // Pass the request on to the next handler
    return next.handle(request);
  }

}