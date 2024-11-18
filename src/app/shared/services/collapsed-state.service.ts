import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollapsedStateService {
  private isCollapsed = false;

  // Método para alternar el estado de colapso
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  // Obtener el estado de colapso
  getCollapsedState() {
    return this.isCollapsed;
  }
}
