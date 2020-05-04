

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;  

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
    ) { }

  ngOnInit() {
  //this.formulario = new FormGroup({
  //  nome: new FormControl(null),
  //  email: new FormControl(null)
  //});
  
    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null]
    });

    
  }

  onSubmit(){
    console.log(this.formulario.value);

    this.httpClient.post('https://httpbin.org/post', 
                    JSON.stringify(this.formulario.value))
                    .pipe(map(res => res))
                    .subscribe(dados => console.log(dados));
  }

}
