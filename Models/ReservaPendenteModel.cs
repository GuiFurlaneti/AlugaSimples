using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AluguelDeCasas.Models
{
	public class ReservaPendenteModel
	{

		public int Id { get; set; }

		public string NOME { get; set; }

		public string CONTATO { get; set; }

		public string TIPO_EVENTO { get; set; }

		public string PAGAMENTO { get; set; }

		public string SERVICOS_ADD { get; set; }

		public string DIA_ENTRADA { get; set; }

		public string DIA_SAIDA { get; set; }
	}
}
