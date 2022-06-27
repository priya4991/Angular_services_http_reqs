import { Component, Inject, Injectable } from '@angular/core';
import { WikipediaService } from './wikipedia.service';

@Injectable({
  providedIn: 'root'
})
class Car {
  color: string = 'red';

  constructor(@Inject(String) c: string) {
    this.color = c;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages: any = [];

  // initializing the wikipedia service in the constructor
  constructor(
    private wikipedia: WikipediaService,
    private car: Car
    ) {

  }

  onTerm(term: string) {
    const results = this.wikipedia.search(term);
    console.log(this.car.color);
    console.log(results);

    // calls subscribe on the observable and passes the observer
    this.wikipedia.search(term).subscribe((r: any) => {
      console.log(r);
      this.pages = r.query.search;
    });
  }
}



//https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=space