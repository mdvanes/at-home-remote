import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from './smart-entities.types';

@Injectable({
  providedIn: 'root',
})
export class SmartEntitiesService {
  http = inject(HttpClient);

  getSmartEntities() {
    return this.http.get<State[]>('/api/v1/smart-entities');
  }

  getData() {
    return this.http.get<State[]>('/assets/data.json');
  }
}
