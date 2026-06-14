// src/app/core/services/currency-list.service.ts

import { Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyListService {

  readonly currencies: Currency[] = [
    { code: 'USD', name: 'Dólar Americano',     symbol: '$',   flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro',                 symbol: '€',   flag: '🇪🇺' },
    { code: 'BRL', name: 'Real Brasileiro',      symbol: 'R$',  flag: '🇧🇷' },
    { code: 'GBP', name: 'Libra Esterlina',      symbol: '£',   flag: '🇬🇧' },
    { code: 'JPY', name: 'Iene Japonês',         symbol: '¥',   flag: '🇯🇵' },
    { code: 'ARS', name: 'Peso Argentino',       symbol: '$',   flag: '🇦🇷' },
    { code: 'CAD', name: 'Dólar Canadense',      symbol: 'CA$', flag: '🇨🇦' },
    { code: 'CHF', name: 'Franco Suíço',         symbol: 'Fr',  flag: '🇨🇭' },
    { code: 'CNY', name: 'Yuan Chinês',          symbol: '¥',   flag: '🇨🇳' },
    { code: 'MXN', name: 'Peso Mexicano',        symbol: '$',   flag: '🇲🇽' },
    { code: 'AUD', name: 'Dólar Australiano',    symbol: 'A$',  flag: '🇦🇺' },
    { code: 'INR', name: 'Rupia Indiana',        symbol: '₹',   flag: '🇮🇳' },
    { code: 'CLP', name: 'Peso Chileno',         symbol: '$',   flag: '🇨🇱' },
    { code: 'COP', name: 'Peso Colombiano',      symbol: '$',   flag: '🇨🇴' },
    { code: 'PEN', name: 'Sol Peruano',          symbol: 'S/',  flag: '🇵🇪' },
    { code: 'UYU', name: 'Peso Uruguaio',        symbol: '$',   flag: '🇺🇾' },
    { code: 'PYG', name: 'Guarani Paraguaio',    symbol: '₲',   flag: '🇵🇾' },
    { code: 'BOB', name: 'Boliviano',            symbol: 'Bs',  flag: '🇧🇴' },
    { code: 'VES', name: 'Bolívar Venezolano',   symbol: 'Bs.S',flag: '🇻🇪' },
  ];

  getByCode(code: string): Currency | undefined {
    return this.currencies.find(c => c.code === code);
  }

  search(query: string): Currency[] {
    const q = query.toLowerCase();
    return this.currencies.filter(
      c => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }
}
