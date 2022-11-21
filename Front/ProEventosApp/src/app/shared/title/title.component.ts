import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  //Usado para colocar o titulo de cada componente
  @Input() titulo="";
  @Input() subtitulo="Desde 2021";
  @Input() iconClass="fa fa-user";
  @Input() botaoListar=false;
  constructor(private router: Router) {  }

  ngOnInit() {
  }
  listar(): void{
    this.router.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`]);
  }

}
