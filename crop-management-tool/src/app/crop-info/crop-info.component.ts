import { Component } from '@angular/core';

@Component({
  selector: 'app-crop-info',
  standalone: true,
  template: `
    <div class="container">
      <div class="info-section">
        <h3>Crop stage</h3>
        <ul>
          <li>Describe the crop stage</li>
          <li>Information about the crop</li>
        </ul>
      </div>
      <div class="info-section">
        <h3>Factors Affecting the Crop</h3>
        <ul>
          <li>Evaluating the crop</li>
          <li>Understanding the needs of the crop and the factors affecting the crop it in the particular stage</li>
          <li>Analyzing the crop</li>
        </ul>
      </div>
      <div class="info-section">
        <h3>Recommendation on the basis of the evaluation</h3>
        <ul>
          <li>Recommending suitable solutions</li>
          <li>Providing personalized resolution according to the crop requirement obtained from the analysis</li>
        </ul>
      </div>
      <p class="additional-info">
        **Additionally the system will also provide nearby resources and information about Kisan Samridhi Kendras.**
      </p>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      padding: 20px;
      background-color: #8BC34A;
      border-radius: 8px;
    }
    .info-section {
      background-color: #689F38;
      padding: 30px;
      margin-top: 20px;
      border-radius: 8px;
    }
    h3 {
      color: white;
    }
    ul {
      color: #E8F5E9;
    }
    .additional-info {
      font-style: italic;
      text-align: center;
    }
  `]
})
export class CropInfoComponent {}