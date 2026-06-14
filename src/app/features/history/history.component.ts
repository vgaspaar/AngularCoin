// src/app/features/history/history.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HistoryService } from '../../core/services/history.service';
import { CurrencyListService } from '../../core/services/currency-list.service';
import { ConversionHistory } from '../../core/models/currency.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {

  history: ConversionHistory[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private historyService: HistoryService,
    private currencyListService: CurrencyListService
  ) {}

  ngOnInit(): void {
    this.historyService.history$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(h => this.history = h);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeItem(id: string): void {
    this.historyService.remove(id);
  }

  clearAll(): void {
    if (confirm('Deseja limpar todo o histórico de conversões?')) {
      this.historyService.clearAll();
    }
  }

  getFlag(code: string): string {
    return this.currencyListService.getByCode(code)?.flag ?? '';
  }

  getSymbol(code: string): string {
    return this.currencyListService.getByCode(code)?.symbol ?? '';
  }
}
