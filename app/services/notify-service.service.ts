import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private notification = new Notyf({
    duration: 4000,
    ripple: false,
    position: {
      x: "center",
      y: "top"
    }
  });

  public success(message: string): void {
    this.notification.success(message);
  }
  
  public error(err: string): void {
    this.notification.error(err);
  }
  
}
