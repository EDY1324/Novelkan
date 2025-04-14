import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import chaptersData from '/home/kazuma/Projek-saya/novel-app/public/chapters.json';

@Component({
  selector: 'app-baca',
  imports: [CommonModule, FormsModule],
  templateUrl: './baca.component.html',
  styleUrl: './baca.component.css'
})
export class BacaComponent implements OnInit {
  novelTitle = '';
  currentChapter = 0;
  chapters: any[] = [];
  fontSize = '20px';
  darkMode = false;
  chapterHtml = '';
  progress = 0;

  constructor(private location: Location) {}

  ngOnInit(): void {
    const selectedNovel = JSON.parse(localStorage.getItem('selectedNovel') || 'null');
    const savedProgress = JSON.parse(localStorage.getItem('lastReadChapters') || '{}');
    const savedSettings = JSON.parse(localStorage.getItem('readingSettings') || '{}');

    if (!selectedNovel?.title) {
      this.chapterHtml = 'Novel tidak ditemukan!';
      return;
    }

    this.novelTitle = selectedNovel.title;
    this.currentChapter = selectedNovel.chapter ?? savedProgress[this.novelTitle] ?? 0;
    this.chapters = (chaptersData as any)[this.novelTitle] || [];
    this.fontSize = savedSettings.fontSize || '20px';

    this.loadChapter();

    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.updateDarkModeClass();
  }

  loadChapter(): void {
    const filtered = this.chapters.filter(c => c.chapter === this.currentChapter + 1);
    if (filtered.length === 0) {
      this.chapterHtml = '<p>Chapter tidak ditemukan.</p>';
      return;
    }

    this.chapterHtml = filtered.map(p => `<h3>${p.title}</h3><p>${p.content}</p>`).join('');
    this.updateProgress();

    const savedProgress = JSON.parse(localStorage.getItem('lastReadChapters') || '{}');
    savedProgress[this.novelTitle] = this.currentChapter;
    localStorage.setItem('lastReadChapters', JSON.stringify(savedProgress));
    localStorage.setItem('lastReadNovel', this.novelTitle);
  }

  prevChapter(): void {
    if (this.currentChapter > 0) {
      this.currentChapter--;
      this.loadChapter();
    }
  }

  nextChapter(): void {
    if (this.hasNextChapter()) {
      this.currentChapter++;
      this.loadChapter();
    }
  }

  hasNextChapter(): boolean {
    const maxChapter = Math.max(...this.chapters.map(c => c.chapter));
    return this.currentChapter < maxChapter - 1;
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

  updateFontSize(): void {
    localStorage.setItem('readingSettings', JSON.stringify({ fontSize: this.fontSize }));
  }

  updateProgress(): void {
    const uniqueChapters = [...new Set(this.chapters.map(c => c.chapter))];
    this.progress = ((this.currentChapter + 1) / uniqueChapters.length) * 100;
  }

  goBack(): void {
    this.location.back();
  }
}