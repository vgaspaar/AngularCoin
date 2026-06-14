// src/app/core/interceptors/error.interceptor.ts

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let mensagem = 'Erro desconhecido';

      if (error.status === 0) {
        mensagem = 'Sem conexão com a internet ou API indisponível.';
      } else if (error.status === 429) {
        mensagem = 'Limite de requisições atingido. Tente novamente em breve.';
      } else if (error.status >= 500) {
        mensagem = 'Erro no servidor da API. Usando dados em cache.';
      }

      console.error(`[AngularCoin] ${mensagem}`, error);
      return throwError(() => new Error(mensagem));
    })
  );
};
