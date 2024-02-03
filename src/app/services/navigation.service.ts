import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { NavigationItem } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  list:NavigationItem[]= [];
  url:string= environment.apiBasedUrl

  constructor(private http: HttpClient) { }

  getCategoryList(){
    this.http.get(this.url+'/ProductCategories')
      .subscribe((res: any) => {

        // Group the subcategories with their cartegories.
        const groupedData = res.reduce((acc: NavigationItem[], curr: any) => {
          const categoryIndex = acc.findIndex((item: NavigationItem) => item.category === curr.category);

          if (categoryIndex !== -1) {
            acc[categoryIndex].subcategories.push(curr.subCategory);
          } else {
            acc.push({
              category: curr.category,
              subcategories: [curr.subCategory]
            });
          }

          return acc;
        }, []);

        // Asign the result to the list
        this.list = groupedData;
      }, error => {
        console.log(error);
      });
  }
}
