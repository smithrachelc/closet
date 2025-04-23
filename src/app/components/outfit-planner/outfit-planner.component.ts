import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-outfit-planner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outfit-planner.component.html',
  styleUrls: ['./outfit-planner.component.css']
})
export class OutfitPlannerComponent implements OnInit {
  outfits: any[] = [];

  ngOnInit(): void {
    this.loadOutfits();
  }

  loadOutfits(): void {
    this.outfits = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
  }

  deleteOutfit(index: number): void {
    this.outfits.splice(index, 1);
    localStorage.setItem('savedOutfits', JSON.stringify(this.outfits));
  }

  makePublic(index: number): void {
    const publicOutfits = JSON.parse(localStorage.getItem('publicOutfits') || '[]');
    publicOutfits.push(this.outfits[index]);
    localStorage.setItem('publicOutfits', JSON.stringify(publicOutfits));
  }
}
