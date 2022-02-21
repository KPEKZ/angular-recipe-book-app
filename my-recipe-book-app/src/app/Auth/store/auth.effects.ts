import {Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {AuthResponseData} from "../auth.service";
import {HttpClient} from "@angular/common/http";
import {of, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";


const handleAuthentication = (expiresIn: number, email : string, userId:string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn *1000);
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate
  });
};

const handleError = (errorRes) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message){
    case 'EMAIL_EXISTS':
      errorMessage = 'The email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'The email does not exists';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'The password is not correct';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}


  authSignup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKEY,{
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true
        }).pipe(
          map((resData) => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          }
          ),
        );
      })
    );
  })

  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKEY,{
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }).pipe(
          map((resData) => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          }
          ),
        );
      }),
    );
  });


  authRedirect = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
      tap(() => {
        this.router.navigate(['/']);
      })
    );
  }, {
    dispatch: false
  });



}
