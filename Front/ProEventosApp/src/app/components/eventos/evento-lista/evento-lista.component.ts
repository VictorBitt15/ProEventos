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
  public eventoId = 0;
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
    this.carregarEventos();
    this.spinner.show();
  }
  public carregarEventos():void{
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
  openModal(event:any, template: TemplateRef<any>, eventoId: number):void{
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template,{class: 'modal-sm'});
  }
  confirm():void{
    this.modalRef.hide();
    this.spinner.show();
    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result:any)=>{
        if(result.message === 'Deletado'){
          this.toastr.success('O evento foi deletado com sucesso!','Deletado!');
          this.spinner.hide();
          this.carregarEventos();
        }
      },
      (error: any)=>{
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`,'Erro');
        this.spinner.hide();
      },
      ()=>this.spinner.hide(),
    );

  }
  decline():void{
    this.modalRef.hide();
  }
  detalheEvento(id: number): void{
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

}
