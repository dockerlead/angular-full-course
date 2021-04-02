import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind?: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD36JnxLvpbrZuPFrKpVbXL26gVruKzRjQ',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
    catchError(errorRes => {
      let errorMsg = 'An unknown error occurred!';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMsg);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMsg = 'This email exists already!';
      }
      return throwError(errorMsg);
    })
    );
  }
}
