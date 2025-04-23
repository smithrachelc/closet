import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClothingService } from '../../services/clothing.service';

@Component({
  selector: 'app-closet-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './closet-dashboard.component.html',
  styleUrls: ['./closet-dashboard.component.css']
})
export class ClosetDashboardComponent implements OnInit {
  clothingItems: any[] = [];
  filteredItems: any[] = [];
  selectedCategory = '';
  selectedOutfit: any[] = [];
  outfitName = '';
  categories: string[] = ['Tops', 'Bottoms', 'Dresses', 'Jackets', 'Shoes', 'Accessories'];

  constructor(private clothingService: ClothingService) {}

  ngOnInit(): void {
    this.clothingService.getClothingItems().subscribe({
      next: items => {
        this.clothingItems = items;
        this.filterItems();
      },
      error: err => {
        console.error('Error loading items:', err);
      }
    });
  }

  navigateTo(category: string): void {
    this.selectedCategory = category;
    this.filterItems();
  }

  filterItems(): void {
    this.filteredItems = this.selectedCategory
      ? this.clothingItems.filter(item => item.category === this.selectedCategory)
      : this.clothingItems;
  }

  addToOutfit(item: any): void {
    if (!this.selectedOutfit.find(i => i._id === item._id)) {
      this.selectedOutfit.push(item);
    }
  }

  saveOutfit(): void {
    if (!this.outfitName.trim() || this.selectedOutfit.length === 0) return;

    const outfit = {
      name: this.outfitName,
      items: this.selectedOutfit,
    };

    localStorage.setItem('savedOutfits', JSON.stringify([
      ...JSON.parse(localStorage.getItem('savedOutfits') || '[]'),
      outfit
    ]));

    this.outfitName = '';
    this.selectedOutfit = [];
  }

  cancelOutfit(): void {
    this.outfitName = '';
    this.selectedOutfit = [];
  }
}
