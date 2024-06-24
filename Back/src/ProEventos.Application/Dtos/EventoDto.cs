

using Newtonsoft.Json.Serialization;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório."),
         //MinLength(3, ErrorMessage ="{0} deve ter no minímo 3 caracteres."),
         //MaxLength(50,ErrorMessage ="{0} dever ter no máximo 50 caractees.")]
         StringLength(50,MinimumLength =3,ErrorMessage ="Intervalo permitido de 3 a 50 caracteres.")]
        public string Tema { get; set; }

        [Display(Name ="Qtd Pessoas")]
        [Range(1,120000, ErrorMessage ="{0} não pode ser menor que 1 e maior que 120.000")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(jpe?g|png|gif|bmp))$)", ErrorMessage ="Não é uma imagem válida.(gif,png,jpg,jpeg)")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório")]
        [Phone(ErrorMessage ="O campo {0} deve ser um número válido.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        Display(Name ="e-mail"),
        EmailAddress(ErrorMessage ="É necessário ser um {0} válido.")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes{ get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}
