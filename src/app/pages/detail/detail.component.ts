import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  novel: any;
  reviews: any[] = [];
  reviewText: string = '';
  selectedRating: number = 0;
  isFavorited: boolean = false;
  darkMode: boolean = false;
  username: string = '';
  editingIndex: number | null = null;
  editingText: string = '';
  activeMenuIndex: number | null = null;

  constructor(
    public router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const data = localStorage.getItem('selectedNovel');
    if (data) {
      this.novel = JSON.parse(data);
      this.checkFavorite();
      this.loadReviews();
    } else {
      this.router.navigate(['/']);
    }

    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.updateDarkModeClass();
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.updateDarkModeClass();
  }

  updateDarkModeClass(): void {
    const body = document.body;
    if (this.darkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }

  selectRating(value: number): void {
    this.selectedRating = value;
  }

  submitReview(): void {
    if (!this.username || !this.reviewText || this.selectedRating === 0) {
      alert('Harap isi nama, ulasan, dan beri rating.');
      return;
    }
  
    const allReviews = JSON.parse(localStorage.getItem('novelReviews') || '{}');
    const novelTitle = this.novel.title;
  
    if (!allReviews[novelTitle]) {
      allReviews[novelTitle] = [];
    }
  
    allReviews[novelTitle].push({
      username: this.username,
      text: this.reviewText,
      rating: this.selectedRating
    });
  
    localStorage.setItem('novelReviews', JSON.stringify(allReviews));
    this.reviewText = '';
    this.selectedRating = 0;
    this.username = '';
    this.loadReviews();
  }

  loadReviews(): void {
    const allReviews = JSON.parse(localStorage.getItem('novelReviews') || '{}');
    const novelTitle = this.novel.title;
    this.reviews = allReviews[this.novel.title] || [];
  }

  toggleMenu(index: number): void {
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }

  editReview(index: number): void {
    this.editingIndex = index;
    this.editingText = this.reviews[index].text;
  }

  saveEditedReview(): void {
    if (this.editingIndex !== null) {
      const allReviews = JSON.parse(localStorage.getItem('novelReviews') || '{}');
      allReviews[this.novel.title][this.editingIndex].text = this.editingText;
      localStorage.setItem('novelReviews', JSON.stringify(allReviews));
      this.editingIndex = null;
      this.editingText = '';
      this.loadReviews();
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.editingText = '';
  }
  
  deleteReview(index: number): void {
    const allReviews = JSON.parse(localStorage.getItem('novelReviews') || '{}');
    allReviews[this.novel.title].splice(index, 1);
    localStorage.setItem('novelReviews', JSON.stringify(allReviews));
    this.loadReviews();
  }

  goToBaca(): void {
    setTimeout(() => {
    this.router.navigate(['/baca']);
  }, 300);
  }

  goBack(): void {
    setTimeout(() => {
    this.location.back();
  }, 300);
  }

  checkFavorite(): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.isFavorited = favorites.some((fav: any) => fav.title === this.novel.title);
  }

  toggleFavorite(): void {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (this.isFavorited) {
      favorites = favorites.filter((fav: any) => fav.title !== this.novel.title);
    } else {
      favorites.push(this.novel);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.checkFavorite();
  }
}
