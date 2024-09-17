import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

const existingEmails: string[] = ['test@netcracker.com', 'user@netcracker.com', 'admin@netcracker.com'];

export function netcrackerEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    if (email && email.includes('@')) {
      const domain = email.split('@')[1];
      if (domain !== 'netcracker.com') {
        return { netcrackerDomain: true };
      }
    }
    return null;
  };
}

export function emailAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) {
      return of(null);
    }

    return of(control.value).pipe(
      map(email => {
        return existingEmails.includes(email) ? { emailTaken: true } : null;
      }),
      catchError(() => of(null))
    );
}