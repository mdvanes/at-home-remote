import { Injectable, inject, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateWithWritable } from './smart-entities.types';
import { Observable } from 'rxjs';
import { SseService } from '../sse.service';

@Injectable({
  providedIn: 'root',
})
export class SmartEntitiesService {
  http = inject(HttpClient);

  constructor(private sseService: SseService, private ngZone: NgZone) {}

  getSmartEntities() {
    return this.http.get<StateWithWritable[]>('/api/v1/smart-entities');
  }

  getSmartEntitiesEvents(): Observable<MessageEvent> {
    return new Observable((observer) => {
      const eventSource = this.sseService.getEventSource(
        '/api/v1/smart-entities/sse'
      );

      eventSource.onmessage = (event) => {
        this.ngZone.run(() => {
          observer.next(event);
        });
      };

      eventSource.onerror = (error) => {
        this.ngZone.run(() => {
          observer.error(error);
        });
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
