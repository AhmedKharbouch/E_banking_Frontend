import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Depot} from "../../model/depot.model";
import {GestionDepotService} from "../../services/gestion-depot.service";
import {ProductService} from "../../services/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Rangee} from "../../model/rangee.model";

@Component({
  selector: 'app-list-rangee',
  templateUrl: './list-rangee.component.html',
  styleUrls: ['./list-rangee.component.css']
})
export class ListRangeeComponent implements OnInit {
  Rangees! : Observable<Array<Rangee>>;
  errorMessage! :String;
  searchFormGroup! :FormGroup;
  rangees!:Observable<Array<Rangee>>;
  constructor(private gestionDepotService:GestionDepotService, private productService:ProductService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    //this.depots=this.gestionDepotService.getDepots();
    this.handleSearchRangees()
  }
  handleSearchRangees() {
    let kw=this.searchFormGroup?.value.keyword;
    this.rangees=this.gestionDepotService.getRangees().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })

    );
  }

  handleDeleteRangee(c: Rangee) {
    let conf =confirm("Are you sure?");
    if(!conf) return;
    this.gestionDepotService.deleteRangee(c.id).subscribe({
      next:(resp)=>{
        this.rangees=this.rangees.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        )
      },
      error:err => {
        console.log(err);
      }
    })
  }

  handleUpdateRangee(rangee: Rangee) {
    this.router.navigateByUrl("/update-product/"+rangee.id,{state:rangee})
  }

}
