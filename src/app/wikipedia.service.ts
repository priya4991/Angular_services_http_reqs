import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// services are used to fetch/store/update any kind of data in our app
// service is where aout network requests (GET, POST) are implemented
// data flows from service to a component
export class WikipediaService {
  constructor(private http: HttpClient) { }

  search(term: string) {
    return this.http.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*'
      }
    });
  }
}
