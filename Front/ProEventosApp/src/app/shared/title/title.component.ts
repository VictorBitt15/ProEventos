import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  //Usado para colocar o titulo de cada componente
  @Input() titulo= "";
  constructor() {  }

  ngOnInit() {
  }

}
