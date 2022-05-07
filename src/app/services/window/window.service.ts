import { Injectable } from '@angular/core';

import { WindowServiceInterface } from './window.service.interface';

@Injectable({
  providedIn: 'root'
})
export class WindowService implements WindowServiceInterface {

  constructor() { }

  endpointApi(): string {
    return window.AppSettings.services.api;
  }
}
