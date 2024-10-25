import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModesResponse } from './homesec.types';

@Injectable({
  providedIn: 'root',
})
export class HomesecService {
  http = inject(HttpClient);

  getHomesecState() {
    return this.http.get<ModesResponse>('/api/v1/homesec/state');
  }
}
