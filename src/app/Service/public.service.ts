import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private _showSidebar: BehaviorSubject<boolean>;

  constructor() {
    const storedSidebarState = localStorage.getItem('showSidebar') === 'true';
    this._showSidebar = new BehaviorSubject<boolean>(storedSidebarState);
  }

  public get showSidebar$() {
    return this._showSidebar.asObservable();
  }

  public setShowSidebar(show: boolean) {
    this._showSidebar.next(show);
    localStorage.setItem('showSidebar', String(show));
  }
  public logout() {
    // Set sidebar visibility to false
    this.setShowSidebar(false);

    // Clear local storage or session storage as needed
    localStorage.removeItem('showSidebar');
    localStorage.removeItem('selectedLanguage'); // Remove if you store user-specific data

    // Add any other cleanup logic here, such as clearing user tokens or session data
  }
}
