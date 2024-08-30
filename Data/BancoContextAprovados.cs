using AluguelDeCasas.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AluguelDeCasas.Data
{
	public class BancoContextAprovados : DbContext
	{
		public BancoContextAprovados(DbContextOptions<BancoContextAprovados> options) : base(options)
		{
		}

		public DbSet<ReservaPendenteModel> RESERVAS_APROVADAS { get; set; }
	}
}
