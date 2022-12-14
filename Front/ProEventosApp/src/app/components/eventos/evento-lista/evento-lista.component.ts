import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

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

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

 public ngOnInit(): void {
    this.getEventos();
    this.spinner.show();
  }
  public getEventos():void{
    this.eventoService.getEventos().subscribe({
      next:(eventos:Evento[])=> {
        this.eventos=eventos;
        this.eventosFiltrados = this.eventos;
      },
      error:(error:any)=>{
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos','Erro!');
      },
      complete:() => this.spinner.hide()
    });
  }
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template,{class: 'modal-sm'});
  }
  confirm():void{
    this.modalRef.hide();
    this.toastr.success('O evento soi deletado com sucesso!','Deletado!');
  }
  decline():void{
    this.modalRef.hide();
  }
  detalheEvento(id: number): void{
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

}
