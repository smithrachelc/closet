import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClothingService } from '../../services/clothing.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-clothing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './upload-clothing.component.html',
  styleUrls: ['./upload-clothing.component.css']
})
export class UploadClothingComponent {
  clothingName: string = '';
  clothingCategory: string = '';
  categories: string[] = ['Tops', 'Bottoms', 'Dresses', 'Jackets', 'Shoes', 'Accessories'];
  selectedImageFile: File | null = null;
  imageDataUrl: string | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private clothingService: ClothingService, private http: HttpClient) {}

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;

      // For image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDataUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadClothing(): void {
    if (!this.clothingName.trim() || !this.clothingCategory || !this.selectedImageFile) {
      this.errorMessage = 'All fields are required.';
      this.successMessage = '';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.clothingName);
    formData.append('category', this.clothingCategory);
    formData.append('image', this.selectedImageFile);

    this.clothingService.addClothingItem(formData).subscribe({
      next: (response) => {
        this.successMessage = 'Clothing item uploaded successfully!';
        this.errorMessage = '';
        // Reset form
        this.clothingName = '';
        this.clothingCategory = '';
        this.selectedImageFile = null;
        this.imageDataUrl = null;
      },
      error: (err) => {
        console.error('Upload error:', err);
        this.errorMessage = 'Upload failed. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
