import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {LanguageService} from './services/language.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatSelectModule, FormsModule],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="app-toolbar">
      <img src="assets/logo.png" alt="CropGuard Logo" class="logo" height="45">
        <span>  CropGuard</span>
        <span class="spacer"></span>
        <button mat-button routerLink="/">Home</button>
        <button mat-button routerLink="/crop-info">Service</button>
        <a mat-button href="https://kisansuvidha.gov.in" target="_blank">Kisan Suvidha</a>
        <a mat-button href="https://pmkisan.gov.in" target="_blank">PM Kisan Samman Nidhi</a>
        <button mat-button routerLink="/contactUs">Contact us</button>
        <mat-select [(ngModel)]="selectedLanguage" (selectionChange)="changeLanguage()" class="language-select">
          <mat-option value="en">English</mat-option>
          <mat-option value="hi">हिंदी</mat-option>
          <!-- Add more language options as needed -->
        </mat-select>
      </mat-toolbar>
      <div class="content-container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-image: url('/assets/bg.png');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      opacity: 75%;
      border-radius: 10px;
      max-width: full;
      margin-left: 300px;
      margin-right: 300px;
      margin-top: 35px;
    }
    .app-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: rgba(76, 175, 80, 0.9);
    }
    .spacer {
      flex: 1 1 auto;
    }
      .language-select {
      margin-left: 20px;
      width: 100px;
    }
    .content-container {
      flex: 1;
      padding: 80px 20px 20px;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      border-radius: 8px;
    }
    @media (max-width: 600px) {
      .content-container {
        padding: 70px 10px 10px;
      }
    }
  `]
})
export class AppComponent {
  selectedLanguage = 'en';

  constructor(private languageService: LanguageService) {}

  changeLanguage() {
    this.languageService.changeLanguage(this.selectedLanguage)
  }
}