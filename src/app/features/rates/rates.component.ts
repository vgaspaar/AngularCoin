// src/app/features/rates/rates.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

import { ExchangeRateService } from '../../core/services/exchange-rate.service';
import { CurrencyListService } from '../../core/services/currency-list.service';
import { Currency } from '../../core/models/currency.model';

interface RatePair {
  base: string;
  quote: string;
  rate: number;
  currency: Currency;
}

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
})
export class RatesComponent implements OnInit, OnDestroy {

  allRates: Record<string, number> = {};
  filteredPairs: RatePair[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';
  lastUpdated: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private exchangeService: ExchangeRateService,
    private currencyListService: CurrencyListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadRates(): void {
    this.isLoading = true;
    this.exchangeService.getRates('USD').pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response) => {
        this.allRates = response.rates;
        this.buildPairs();
        const cachedAt = this.exchangeService.getCachedAt();
        if (cachedAt) {
          this.lastUpdated = new Date(cachedAt).toLocaleString('pt-BR');
        }
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  buildPairs(): void {
    const currencies = this.currencyListService.currencies;
    this.filteredPairs = currencies
      .filter(c => c.code !== 'USD' && this.allRates[c.code])
      .map(c => ({
        base: 'USD',
        quote: c.code,
        rate: this.allRates[c.code],
        currency: c,
      }));
  }

  onSearch(): void {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) {
      this.buildPairs();
      return;
    }
    const currencies = this.currencyListService.currencies;
    const filtered = currencies.filter(
      c => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
    this.filteredPairs = filtered
      .filter(c => this.allRates[c.code])
      .map(c => ({
        base: 'USD',
        quote: c.code,
        rate: this.allRates[c.code],
        currency: c,
      }));
  }

  selectPair(pair: RatePair): void {
    // Navega para o conversor com os parâmetros de query
    this.router.navigate(['/'], {
      queryParams: { from: pair.base, to: pair.quote }
    });
  }
}
