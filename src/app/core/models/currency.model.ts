// src/app/core/models/currency.model.ts

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
}

export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
  time_last_updated?: number;
}

export interface ConversionResult {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  rate: number;
  inverseRate: number;
  timestamp: Date;
}

export interface ConversionHistory {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  rate: number;
  timestamp: string;
}

export interface CachedRates {
  base: string;
  rates: Record<string, number>;
  cachedAt: string;
}
