import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SseService {
  getEventSource(url: string): EventSource {
    if(typeof EventSource === 'undefined') {
      throw new Error('EventSource is not supported, probably still loading');
    }
    return new EventSource(url);
  }
}
