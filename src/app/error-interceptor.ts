import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorComponent } from './components/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'an unknown error occurred!';
        if (error.error) {
          errorMessage = error.error;
        }
        this.openDialog(errorMessage);
        return throwError(error);
      })
    );
  }

  openDialog(errorMessage: string): void {
    this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
  }
}
