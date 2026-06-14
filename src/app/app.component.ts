// src/app/app.component.ts

import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-shell">

      <!-- Cabeçalho -->
      <header class="header">
        <div class="header-inner">
          <a routerLink="/" class="brand">
            <div class="brand-logo">₿</div>
            <div>
              <div class="brand-name">AngularCoin</div>
              <div class="brand-sub">Conversão em tempo real</div>
            </div>
          </a>

          <div class="header-right">
            <span class="status-badge" [class.offline]="!isOnline">
              <span class="status-dot"></span>
              {{ isOnline ? 'Online' : 'Offline' }}
            </span>
          </div>
        </div>
      </header>

      <!-- Banner offline -->
      <div class="offline-banner" *ngIf="!isOnline">
        ⚠️ Você está offline. Usando taxas salvas localmente.
      </div>

      <!-- Navegação -->
      <nav class="nav-tabs">
        <a routerLink="/"        routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">💱 Converter</a>
        <a routerLink="/rates"   routerLinkActive="active">📊 Cotações</a>
        <a routerLink="/history" routerLinkActive="active">🕘 Histórico</a>
      </nav>

      <!-- Conteúdo das rotas -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <footer class="footer">
        AngularCoin © {{ currentYear }} — Dados: ExchangeRate-API
      </footer>
    </div>
  `,
  styles: [`
    .app-shell {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--bg-page);
    }

    .header {
      background: #fff;
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-inner {
      max-width: 720px;
      margin: 0 auto;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: inherit;
    }

    .brand-logo {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--color-primary);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 600;
    }

    .brand-name {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .brand-sub {
      font-size: 11px;
      color: var(--text-muted);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      background: var(--color-success-light);
      color: var(--color-success);
      font-weight: 500;
    }

    .status-badge.offline {
      background: var(--color-warning-light);
      color: var(--color-warning);
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    .offline-banner {
      background: var(--color-warning-light);
      color: var(--color-warning);
      text-align: center;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 500;
    }

    .nav-tabs {
      background: #fff;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      max-width: 720px;
      margin: 0 auto;
      width: 100%;
      padding: 0 16px;
    }

    .nav-tabs a {
      padding: 12px 20px;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: color 0.15s, border-color 0.15s;
    }

    .nav-tabs a:hover {
      color: var(--text-primary);
    }

    .nav-tabs a.active {
      color: var(--color-primary);
      border-bottom-color: var(--color-primary);
    }

    .main-content {
      flex: 1;
      max-width: 720px;
      margin: 0 auto;
      width: 100%;
      padding: 24px 16px;
    }

    .footer {
      text-align: center;
      padding: 16px;
      font-size: 12px;
      color: var(--text-muted);
      border-top: 1px solid var(--border-color);
      background: #fff;
    }

    @media (max-width: 600px) {
      .nav-tabs a { padding: 12px 14px; font-size: 12px; }
      .main-content { padding: 16px 12px; }
    }
  `]
})
export class AppComponent implements OnInit {
  isOnline = navigator.onLine;
  currentYear = new Date().getFullYear();

  @HostListener('window:online')
  onOnline() { this.isOnline = true; }

  @HostListener('window:offline')
  onOffline() { this.isOnline = false; }

  ngOnInit(): void {}
}
