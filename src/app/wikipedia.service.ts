import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

interface Car {
  color: string,
  make: {
    name: string,
    year: number
  }
};

const observable = new Observable<Car>((observer) => {
  observer.next({
    color: 'red',
    make: {
      name: 'nis',
      year: 2003
    }
  });
}).pipe(
  pluck('make', 'name')
);
observable.subscribe((value) => {
  console.log(value);
})

export interface WikipediaResponse {
  query: {
    search: {
      title: string,
      snippet: string,
      pageid: number,
      wordcount: number
    }[]
  }
};

@Injectable({
  providedIn: 'root'
})

// services are used to fetch/store/update any kind of data in our app
// service is where aout network requests (GET, POST) are implemented
// data flows from service to a component
export class WikipediaService {
  constructor(private http: HttpClient) { }

  search(term: string) {
    // this returns an observable in RxJS
    // an observable is a GENERIC function
    return this.http.get<WikipediaResponse>('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*'
      }
    }).pipe(
      pluck('query', 'search')
    );
  }
}
