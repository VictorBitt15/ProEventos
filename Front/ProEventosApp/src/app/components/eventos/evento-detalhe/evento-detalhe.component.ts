import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private localeService: BsLocaleService) {
    this.localeService.use('pt-br');
  }
  get f():any{
    return this.form.controls;
  }
  get bsConfig():any{
    return{
      isAnimated  : true,
      adaptivePosition:true,
      dateInputFormat: 'DD/MM/YYYY hh:mm',
      containerClass:'theme-default',
      showWeekNumbers:false
    };
  }
  ngOnInit(): void {
    this.validation();
  }
  public validation(): void{
    this.form = this.fb.group({
      tema: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
      local: ['',Validators.required],
      dataEvento: ['',[Validators.required]],
      qtdPessoas: ['',[Validators.required,Validators.max(100000)]],
      imagemURL: ['',Validators.required],
      telefone: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],

    });
  }
  public resetForm():void{
    this.form.reset();
  }
  public cssValidator(campoForm : FormControl): any{
    return {'is-invalid': campoForm?.errors && campoForm?.touched}
  }

}
