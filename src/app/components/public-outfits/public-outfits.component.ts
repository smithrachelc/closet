import { Component, OnInit } from '@angular/core';
import { OutfitService } from '../../services/outfit.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-outfits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-outfits.component.html',
  styleUrls: ['./public-outfits.component.css']
})
export class PublicOutfitsComponent implements OnInit {
  publicOutfits: any[] = [];

  constructor(private outfitService: OutfitService) {}

  ngOnInit(): void {
    this.outfitService.publicOutfits$.subscribe(outfits => {
      this.publicOutfits = outfits;
    });

    this.outfitService.refreshPublicOutfits(); // Ensure latest data is loaded
  }
}
