import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error$ = new Subject();

  handle(message: string): void {
    this.error$.next(message);
  }

  clear(): void {
    this.error$.next('');
  }
}
