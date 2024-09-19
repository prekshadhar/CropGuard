import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, MatButtonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Greetings! Please select</h2>
      <mat-form-field>
        <mat-label>Select Crop</mat-label>
        <mat-select>
          <mat-option value="cotton">Cotton</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Select Region</mat-label>
        <mat-select>
          <mat-option value="state1">Maharashtra</mat-option>
          <mat-option value="state2">Gujarat</mat-option>
          <mat-option value="state3">Telanagana</mat-option>
          <mat-option value="state4">Andhra Pradesh</mat-option>
          <mat-option value="state5">Madhya Pradesh</mat-option>
        </mat-select>
      </mat-form-field>
      <!-- <mat-form-field>
        <mat-label>Select Region</mat-label>
        <mat-select>
          <mat-option value="region1">Region 1</mat-option>
          <mat-option value="region2">Region 2</mat-option>
          <mat-option value="region3">Region 3</mat-option>
        </mat-select>
      </mat-form-field> -->
      <button mat-raised-button color="primary" routerLink="/farmer-registration">Submit</button>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background-color: #8BC34A;
      border-radius: 10px;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }
  `]
})
export class HomeComponent {}