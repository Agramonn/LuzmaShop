import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
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
            acc[categoryIndex].subCategories.push(curr.subCategory);
          } else {
            acc.push({
              category: curr.category,
              subCategories: [curr.subCategory]
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

  getProducts(category: string, subcategory: string, count: number){
    return this.http.get<any[]>(this.url+'/Products/GetProductsCategory', {
      params: new HttpParams()
        .set('category',category)
        .set('subcategory',subcategory)
        .set('count',count),
    });
  }

  getProduct(id: number){
    let url = this.url + '/Products/' + id;
    return this.http.get(url);
  }
}
