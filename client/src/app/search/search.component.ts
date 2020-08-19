import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

//import { ReactiveFormsModule, FormControl, FormsModule } from "@angular/forms";
import { Tweet } from '../Tweet';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  tweets$: Observable<Tweet[]> | undefined;
  private loading: boolean = false;
  private searchTerms = new Subject<string>();
  public listOfTweets: Array<Object> = [];


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  console.log('ngOnInit')

   this.tweets$ = this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(_ => (this.loading = true)),
      switchMap((term: string) => this.apiService.searchTweets(term)),
      tap(_ => (this.loading = false)),
      //Subscribe((value: any) => console.log(value))
    )
  //   this.searchTerms.pipe(
  //     debounceTime(300),
  //     switchMap((term: string) => this.apiService.searchTweets(term)),
  //  )

  }


  search(term: string){
   this.searchTerms.next(term);
   console.log('termi', term)
   this.loading = true;
   this.apiService.searchTweets(term).subscribe((data)=> this.listOfTweets = data)

  }

}
