// src/app/core/services/history.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConversionHistory } from '../models/currency.model';
import { StorageService } from './storage.service';

const HISTORY_KEY = 'ac_history';
const MAX_HISTORY = 20;

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private historySubject = new BehaviorSubject<ConversionHistory[]>(this.load());
  history$ = this.historySubject.asObservable();

  constructor(private storage: StorageService) {}

  add(entry: Omit<ConversionHistory, 'id' | 'timestamp'>): void {
    const newEntry: ConversionHistory = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    const current = this.historySubject.getValue();
    const updated = [newEntry, ...current].slice(0, MAX_HISTORY);

    this.storage.set(HISTORY_KEY, updated);
    this.historySubject.next(updated);
  }

  remove(id: string): void {
    const updated = this.historySubject.getValue().filter(h => h.id !== id);
    this.storage.set(HISTORY_KEY, updated);
    this.historySubject.next(updated);
  }

  clearAll(): void {
    this.storage.remove(HISTORY_KEY);
    this.historySubject.next([]);
  }

  private load(): ConversionHistory[] {
    return this.storage.get<ConversionHistory[]>(HISTORY_KEY) ?? [];
  }
}
