import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  novels = [
    { title: "One Piece", cover: "https://upload.wikimedia.org/wikipedia/id/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg", genre: ["Action", "Adventure", "Fantasy"], description: "Petualangan bajak laut yang bernama Luffy untuk mencari One Piece."},
    { title: "Attack On Titan", cover: "https://upload.wikimedia.org/wikipedia/id/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg", genre: ["Action", "Drama", "Fantasy"], description: "Pertempuran manusia melawan Titan yang ganas."},
    { title: "Solo Leveling", cover: "https://upload.wikimedia.org/wikipedia/id/9/99/Solo_Leveling_Webtoon.png", genre: ["Action", "Fantasy", "Modern"], description: "Seorang hunter lemah yang berubah menjadi yang terkuat."},
    { title: "I Want to Eat Your Pancreas", cover: "https://upload.wikimedia.org/wikipedia/id/5/5d/Kimi_no_Suiz%C5%8D_o_Tabetai_cover.jpg", genre: ["Romance", "Drama", "Slice of Life"], description: "I Want to Eat Your Pancreas adalah kisah tentang seorang siswa SMA yang menemukan teman sekelasnya menderita penyakit pankreas terminal."},
    { title: "Before the Coffee Gets Cold", cover: "https://upload.wikimedia.org/wikipedia/en/9/9c/Before_the_Coffee_Gets_Cold_book_cover.webp", genre: ["Fantasy", "Drama", "Mystery"], description: "Di gang sempit di Tokyo terdapat sebuah kafe bernama Funiculi Funicula. Di kafe tersebut, pelanggan memiliki kesempatan untuk melakukan perjalanan ke masa yang mereka pilih, selama mereka mengikuti sejumlah aturan."}
  ];
  filteredNovels: any[] = [];
  darkMode = false;
  lastNovel = '';
  continueVisible = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredNovels = this.novels;
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.updateDarkModeClass();

    const last = localStorage.getItem('lastReadNovel');
    const progress = JSON.parse(localStorage.getItem('lastReadChapters') || '{}');

    if (last && progress[last] !== undefined) {
      this.lastNovel = last;
      this.continueVisible = true;
    }
  }

  goToFavorite(): void {
    this.router.navigate(['/favorite']);
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

  search(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.filteredNovels = this.novels.filter(n => n.title.toLowerCase().includes(searchText));
  }

  selectNovel(novel: any): void {
    localStorage.setItem('selectedNovel', JSON.stringify(novel));
    this.router.navigate(['/detail']);
  }

  continueReading(): void {
    const chapterData = JSON.parse(localStorage.getItem('lastReadChapters') || '{}');
    const data = {
      title: this.lastNovel,
      chapter: chapterData[this.lastNovel]
    };
    localStorage.setItem('selectedNovel', JSON.stringify(data));
    this.router.navigate(['/baca']);
  }
}
