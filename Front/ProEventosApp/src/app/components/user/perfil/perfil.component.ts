import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  form!:FormGroup;
  constructor(private fb: FormBuilder) { }

  get f():any{
    return this.form.controls;
  }

  ngOnInit():void{
    this.validation();
  }
  private validation():void{
    const formOptions: AbstractControlOptions= {
      validators: ValidatorField.MustMatch('password','passwordConfirm')
    };
    this.form = this.fb.group({
      titulo:['',Validators.required],
      firstName:['',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]],
      lastName:['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      email:['',[Validators.required, Validators.email]],
      telefone:['',[Validators.required, Validators.minLength(13),Validators.maxLength(13)]],
      funcao:['', Validators.required],
      descricao:['',Validators.required],
      password:['',[Validators.minLength(6)]],
      passwordConfirm:['',Validators.required]

    },formOptions);
  }

}
