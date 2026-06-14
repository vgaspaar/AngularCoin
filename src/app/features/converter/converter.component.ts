// src/app/features/converter/converter.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

import { ExchangeRateService } from '../../core/services/exchange-rate.service';
import { HistoryService } from '../../core/services/history.service';
import { CurrencyListService } from '../../core/services/currency-list.service';
import { Currency, ConversionResult } from '../../core/models/currency.model';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit, OnDestroy {

  currencies: Currency[] = [];
  rates: Record<string, number> = {};

  amount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'BRL';

  result: ConversionResult | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;
  lastUpdated: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private exchangeService: ExchangeRateService,
    private historyService: HistoryService,
    private currencyListService: CurrencyListService
  ) {}

  ngOnInit(): void {
    this.currencies = this.currencyListService.currencies;
    this.loadRates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadRates(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.exchangeService.getRates('USD').pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response) => {
        this.rates = response.rates;
        const cachedAt = this.exchangeService.getCachedAt();
        if (cachedAt) {
          this.lastUpdated = new Date(cachedAt).toLocaleString('pt-BR');
        }
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erro ao carregar taxas.';
      }
    });
  }

  convert(): void {
    this.errorMessage = '';
    this.result = null;

    if (!this.amount || this.amount <= 0) {
      this.errorMessage = 'Informe um valor válido maior que zero.';
      return;
    }

    if (!this.rates[this.fromCurrency] || !this.rates[this.toCurrency]) {
      this.errorMessage = 'Moeda não disponível. Tente novamente.';
      return;
    }

    try {
      const converted = this.exchangeService.convert(
        this.amount,
        this.fromCurrency,
        this.toCurrency,
        this.rates
      );
      const rate = this.exchangeService.getRate(this.fromCurrency, this.toCurrency, this.rates);

      this.result = {
        fromCurrency: this.fromCurrency,
        toCurrency: this.toCurrency,
        amount: this.amount,
        result: converted,
        rate: rate,
        inverseRate: 1 / rate,
        timestamp: new Date(),
      };

      // Salva no histórico
      this.historyService.add({
        fromCurrency: this.fromCurrency,
        toCurrency: this.toCurrency,
        amount: this.amount,
        result: converted,
        rate: rate,
      });

    } catch (e: any) {
      this.errorMessage = e.message;
    }
  }

  swapCurrencies(): void {
    const tmp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = tmp;
    this.result = null;
  }

  getCurrencySymbol(code: string): string {
    return this.currencyListService.getByCode(code)?.symbol ?? code;
  }

  getCurrencyFlag(code: string): string {
    return this.currencyListService.getByCode(code)?.flag ?? '';
  }
}
