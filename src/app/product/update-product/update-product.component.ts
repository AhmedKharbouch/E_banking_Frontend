import { Component, OnInit } from '@angular/core';
import {Category} from "../../model/category.model";
import {Observable} from "rxjs";
import {AccountDetails} from "../../model/account.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product:Product=this.router.getCurrentNavigation()?.extras.state as Product;
  product1!:Product
  categories!:Observable<Array<Category>>
  categoryId!:Category;
  categoryForm?:Category
  accountObservable! :Observable<AccountDetails>
  productFormGroup!:FormGroup
  errorMessage!: string;
  constructor(private fb:FormBuilder,private productService:ProductService,private  router:Router) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      label:this.fb.control(this.product.label),
      quantite:this.fb.control(this.product.quantite),
      categoryId:this.fb.control(null)
    })
  }
  handleUpdateCategory() {
    this.product1 = this.productFormGroup.value;
    this.product.label=this.product1.label
    this.product.quantite=this.product1.quantite
    console.log(this.product.id)
    console.log(this.product.label)
    console.log(this.product.createdAt)
    console.log(this.product.modifiedAt)
    console.log(this.product.quantite)
    console.log(this.product.prix_HT)
    /* this.categoryService.updateCategory(category1).pipe(

       catchError(err => {
         this.errorMessage=err.message;
         return throwError(err);
       }))*/
    this.productService.updateProduct(this.product).subscribe({
      next:data=>{
        alert(this.product.label + " updated successfully");
        //this.newCustomerForGroup.reset()
        this.router.navigateByUrl("/products");
      },error: err => {

        alert( this.product.label +" doesn't exist");

        console.log( err.value);
        this.router.navigateByUrl("/products");
      }
    });
  }

  handleBack() {
    this.router.navigateByUrl("/products");
  }
}
