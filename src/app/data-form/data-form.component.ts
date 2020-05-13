

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { format } from 'url';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';


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
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
    //Mais de uma validação para o mesmo campo
    // nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
  }

  onSubmit(){
    console.log(this.formulario.value);

    this.httpClient.post('https://httpbin.org/post', 
                    JSON.stringify(this.formulario.value))
                    .pipe(map(res => res))
                    .subscribe(dados => {
                      console.log(dados)
                      //reset form
                      //  this.resetar();
                    }, (error: any) => alert ('erro'));
                    
  }

  resetar(){
    event.preventDefault();
    this.formulario.reset();
  }

  verificaValidTouched(campo: string){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo: string){
    return{
      'invalid-feedback': this.verificaValidTouched(campo)
    }
  }
}
