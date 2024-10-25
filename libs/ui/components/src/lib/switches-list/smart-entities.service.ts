import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateWithWritable } from './smart-entities.types';

@Injectable({
  providedIn: 'root',
})
export class SmartEntitiesService {
  http = inject(HttpClient);

  getSmartEntities() {
    return this.http.get<StateWithWritable[]>('/api/v1/smart-entities');
  }

  getData() {
    return this.http.get<StateWithWritable[]>('/assets/data.json');
  }
}
