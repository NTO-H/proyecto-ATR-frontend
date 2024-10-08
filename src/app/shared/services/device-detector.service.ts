// src/app/services/device-detector.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {
  isMobile(): boolean {
    const userAgent = navigator.userAgent || navigator.vendor ;
    
    // Detect mobile devices based on user agent
    return /android|iPad|iPhone|iPod/i.test(userAgent) || window.innerWidth <= 768;
  }
}
