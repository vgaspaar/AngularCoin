// src/app/core/services/exchange-rate.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ExchangeRateResponse, CachedRates } from '../models/currency.model';
import { StorageService } from './storage.service';

const CACHE_KEY = 'ac_rates_cache';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hora

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  // Taxas de fallback para modo offline sem cache
  private readonly fallbackRates: Record<string, number> = {
    USD: 1, EUR: 0.92, BRL: 4.98, GBP: 0.79, JPY: 149.5,
    ARS: 870, CAD: 1.36, CHF: 0.88, CNY: 7.24, MXN: 17.15,
    AUD: 1.53, INR: 83.1, CLP: 950, COP: 4050, PEN: 3.71,
    UYU: 38.9, PYG: 7500, BOB: 6.91, VES: 36.5,
  };

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  /**
   * Busca taxas de câmbio na API.
   * Se offline ou API falhar, tenta o cache local.
   * Se o cache também não existir, usa taxas de fallback.
   */
  getRates(base: string = 'USD'): Observable<ExchangeRateResponse> {
    if (!navigator.onLine) {
      return this.getRatesFromCache(base);
    }

    return this.http.get<ExchangeRateResponse>(`${environment.apiUrl}/${base}`).pipe(
      tap(response => this.saveToCache(response)),
      catchError(() => this.getRatesFromCache(base))
    );
  }

  /**
   * Converte um valor entre duas moedas usando as taxas carregadas.
   */
  convert(amount: number, from: string, to: string, rates: Record<string, number>): number {
    if (!rates[from] || !rates[to]) {
      throw new Error(`Moeda não encontrada: ${from} ou ${to}`);
    }
    const valueInBase = amount / rates[from];
    return valueInBase * rates[to];
  }

  getRate(from: string, to: string, rates: Record<string, number>): number {
    return rates[to] / rates[from];
  }

  private saveToCache(response: ExchangeRateResponse): void {
    const cache: CachedRates = {
      base: response.base,
      rates: response.rates,
      cachedAt: new Date().toISOString(),
    };
    this.storage.set(CACHE_KEY, cache);
  }

  private getRatesFromCache(base: string): Observable<ExchangeRateResponse> {
    const cache = this.storage.get<CachedRates>(CACHE_KEY);

    if (cache) {
      const cached: ExchangeRateResponse = {
        base: cache.base,
        date: cache.cachedAt.split('T')[0],
        rates: cache.rates,
      };
      return of(cached);
    }

    // Sem cache — usa fallback embutido
    console.warn('AngularCoin: usando taxas de fallback (sem cache e offline)');
    return of({
      base: 'USD',
      date: new Date().toISOString().split('T')[0],
      rates: this.fallbackRates,
    });
  }

  getCachedAt(): string | null {
    const cache = this.storage.get<CachedRates>(CACHE_KEY);
    return cache ? cache.cachedAt : null;
  }

  isCacheExpired(): boolean {
    const cache = this.storage.get<CachedRates>(CACHE_KEY);
    if (!cache) return true;
    const age = Date.now() - new Date(cache.cachedAt).getTime();
    return age > CACHE_TTL_MS;
  }
}
