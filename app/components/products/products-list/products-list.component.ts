import { Component, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from 'src/app/services/notify-service.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

public products:ProductModel[]
public filterProductName :string
public updateUnits:{
  id:number,
  units:number 
}
  constructor(private http:HttpClient , private notify : NotifyService) { 
    this.updateUnits={
      id:0,
  units:0
    }
  }
 async ngOnInit() {
   try {
     this.products =  await this.http.get<ProductModel[]>("http://localhost:3001/api/products/" ).toPromise()
   } catch (error) { 
    this.notify.error("error while trying get products list")
   }
  }

  public async sortByUnitsBtn(event:MouseEvent){
    try {
      this.products =  await this.http.get<ProductModel[]>("http://localhost:3001/api/productsByUnits/" ).toPromise()
    } catch (error) {
      this.notify.error("error while trying get products list")
    }
  }

  public async handleSearchByProductName(args:any ){
    try {
      const  target  = args;
    const productNameSearched = target.value;
    this.filterProductName = productNameSearched
      this.products =  await this.http.get<ProductModel[]>("http://localhost:3001/api/productsByUnits/" ).toPromise()
     if(this.filterProductName){
       this.products= this.products.filter((product)=> this.filterProductName===product.name)
     }
     
   } catch (error) {
    this.notify.error("error while trying get products list")
   }   
}



public handleUpdateUnits(event:any){
    const productId = event.id
    this.updateUnits = {
      id:productId,
      units:event.value
    }
}

public async handleUpdateUnitsBtn (event:MouseEvent){
  if (this.updateUnits.units === 0) {
    this.notify.error("please enter quantity")
    return
  }
  try {
   await this.http.post<ProductModel>(
      "http://localhost:3001/api/products",
      this.updateUnits
    ).toPromise();
    this.
      updateUnits= {
        units: 0,
        id: 0
      }
      this.notify.success("units updated succesfully")
  this.products =  await this.http.get<ProductModel[]>("http://localhost:3001/api/products/" ).toPromise()
  } catch (err) {
    this.notify.error("error while trying update quantity")
  }
}

}
