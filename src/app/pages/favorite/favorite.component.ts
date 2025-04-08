import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {
  favorites: any[] = [];
  darkMode = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.updateDarkModeClass();
  }

  removeFavorite(title: string): void {
    this.favorites = this.favorites.filter(novel => novel.title !== title);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
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

  goBack(): void {
    this.router.navigate(['/']);
  }
}
