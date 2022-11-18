import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  modalRef={} as BsModalRef;
  public eventos : Evento[] =[];
  public eventosFiltrados: Evento[] =[];
  widthImg = 50;
  marginImg = 2;
  isCollapsedImg = false;
  private _filtroLista = "";

  public get filtroLista():string{
    return this._filtroLista;
  }
  public set filtroLista(value:string){
    this._filtroLista=value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }
  public filtrarEventos(filtrarPor: string ): Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
       evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private eventoService: EventoService, private modalService: BsModalService) { }

 public ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void{
      this.eventoService.getEventos().subscribe(
        (_eventos: Evento[]) => {
          this.eventos = _eventos;
          this.eventosFiltrados = this.eventos;
          },
        error => console.log(error)
      );
  }
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template,{class: 'modal-sm'});
  }
  confirm():void{
    this.modalRef.hide();
  }
  decline():void{
    this.modalRef.hide();
  }
}
