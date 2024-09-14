import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('en');
  public language$ = this.languageSubject.asObservable();

  changeLanguage(lang: string) {
    this.languageSubject.next(lang);
    // In a real application, you would reload the page or update the translations here
    // For demonstration, we're just logging the change
    console.log('Language changed to:', lang);
  }
}