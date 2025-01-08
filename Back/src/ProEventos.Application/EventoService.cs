using System;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class EventoService : IEventoService
    {
        private readonly IGeralPersist geralPersist;
        private readonly IEventoPersist eventoPersist;
        private readonly IMapper _mapper;

        public EventoService(IGeralPersist geralPersist, IEventoPersist eventoPersist, IMapper mapper)
        {
            this.eventoPersist = eventoPersist;
            this.geralPersist = geralPersist;
            this._mapper = mapper;
        }
        public async Task<EventoDto> AddEventos(EventoDto model)
        {
            try
            {
                var evento = this._mapper.Map<Evento>(model);

                geralPersist.Add<Evento>(evento);
                if (await geralPersist.SaveChanvesAsync())
                {
                    var retorno = await eventoPersist.GetEventoByIdAsync(evento.Id, false);

                    return this._mapper.Map<EventoDto>(retorno);
                }
                return null;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<bool> DeleteEvento(int eventoId)
        {
            try
            {
                var evento = await eventoPersist.GetEventoByIdAsync(eventoId, false);
                if (evento == null) throw new Exception("Evento para delete não foi encontrado.");


                geralPersist.Delete<Evento>(evento);
                return await geralPersist.SaveChanvesAsync();

            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
        {
            try
            {
                var evento = await eventoPersist.GetEventoByIdAsync(eventoId, includePalestrantes);
                if (evento == null) return null;

                var resultado = this._mapper.Map<EventoDto>(evento);

                return resultado;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            try
            {
                var eventos = await eventoPersist.GetAllEventosAsync(includePalestrantes);
                if (eventos == null) return null;

                var resultado = this._mapper.Map<EventoDto[]>(eventos);

                return resultado;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            try
            {
                var eventos = await eventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
                if (eventos == null) return null;

                var resultado = this._mapper.Map<EventoDto[]>(eventos);

                return resultado; 
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<EventoDto> UpdateEvento(int eventoId, EventoDto model)
        {
            try
            {
                var evento = await eventoPersist.GetEventoByIdAsync(eventoId, false);
                if (evento == null) return null;

                //var resultado = this._mapper.Map<EventoDto>(evento);

                model.Id = evento.Id;

                this._mapper.Map(model, evento);

                geralPersist.Update<Evento>(evento);
                if (await geralPersist.SaveChanvesAsync())
                {
                    var eventoRetorno = await eventoPersist.GetEventoByIdAsync(evento.Id, false);
                    return this._mapper.Map<EventoDto>(eventoRetorno);
                }
                return null;

            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
    }
}