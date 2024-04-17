import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicService {

  constructor() {
   
  }

 
  public logout() {
    // Set sidebar visibility to false

    // Clear local storage or session storage as needed
    localStorage.removeItem('selectedLanguage'); // Remove if you store user-specific data

    // Add any other cleanup logic here, such as clearing user tokens or session data
  }
}
