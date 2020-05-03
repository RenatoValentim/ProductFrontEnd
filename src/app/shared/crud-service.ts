import { HttpClient } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class CrudService<T> {
  constructor(protected http: HttpClient, private URL_API: string) {  }

  listProducts(): Observable<T[]> {
    return this.http.get<T[]>(this.URL_API)
      .pipe(
        delay(1000),
        tap(console.log)
      );
  }

  loadById(id: number): Observable<T> {
    return this.http.get<T>(`${this.URL_API}/${id}`).pipe(take(1));
  }

  private saveProduct(record: T): Observable<T> {
    return this.http.post<T>(this.URL_API, record)
      .pipe(
        take(1),
        tap(console.log)
      );
  }

  private updateProduct(record: T): Observable<T> {
    return this.http.put<T>(`${this.URL_API}/${record['id']}`, record).pipe(take(1));
  }

  saveOrUpdate(record: T): Observable<T> {
    if (record['id']) {
      return this.updateProduct(record);
    }
    return this.saveProduct(record);
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.URL_API}/${id}`).pipe(take(1));
  }
}
