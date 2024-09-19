import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-farmer-registration',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Farmer registration</h2>
      <form>
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput placeholder="Enter full name">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Address</mat-label>
          <input matInput placeholder="Enter full address">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Contact</mat-label>
          <input matInput placeholder="Enter Mobile number">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Select Crop Stage</mat-label>
          <mat-select>
            <mat-option value="stage1">Germination</mat-option>
            <mat-option value="stage2">Seed Strengthening</mat-option>
            <mat-option value="stage3">Leaf Growth</mat-option>
            <mat-option value="stage4">Flowering</mat-option>
            <mat-option value="stage5">Cotton Ready</mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-raised-button color="primary" routerLink="/crop-info">Register</button>
      </form>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background-color: #8BC34A;
      border-radius: 8px;
    }
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }
  `]
})
export class FarmerRegistrationComponent {}