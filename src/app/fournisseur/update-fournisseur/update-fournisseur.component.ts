import { Component, OnInit } from '@angular/core';
import {Category} from "../../model/category.model";
import {Observable} from "rxjs";
import {AccountDetails} from "../../model/account.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Fournisseur} from "../../model/fournisseur.model";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {FournisseurService} from "../../services/fournisseur.service";

@Component({
  selector: 'app-update-fournisseur',
  templateUrl: './update-fournisseur.component.html',
  styleUrls: ['./update-fournisseur.component.css']
})
export class UpdateFournisseurComponent implements OnInit {
  fournisseur:Fournisseur=this.router.getCurrentNavigation()?.extras.state as Fournisseur;
  category1!:Category
  categoryForm?:Category
  accountObservable! :Observable<AccountDetails>
  fournisseurFormGroup!:FormGroup
  errorMessage!: string;
  constructor(private fb:FormBuilder,private fournisseurService:FournisseurService,private  router:Router) { }

  ngOnInit(): void {

    //console.log(this.fournisseur.id)

    //very important
    console.log(this.router.routerState.snapshot.url.split("/")[2])
  }

}
