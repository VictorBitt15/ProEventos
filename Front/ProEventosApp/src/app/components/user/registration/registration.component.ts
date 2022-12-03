import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  formRe !: FormGroup;
  constructor(private fb: FormBuilder) { }

  get f():any{
    return this.formRe.controls;
  }

  ngOnInit(): void {
    this.validation();
  }
  private validation(): void{
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password','passwordConfirm')
    };

    this.formRe = this.fb.group({
      firstName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      lastName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)] ],
      email:['',[Validators.required, Validators.email]],
      user:['',[Validators.required,Validators.minLength(5)]],
      password:['',Validators.minLength(6)],
      passwordConfirm:['',Validators.required]
    }, formOptions);

  }

}
