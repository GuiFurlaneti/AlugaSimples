using AluguelDeCasas.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AluguelDeCasas.Data
{
	public class BancoContext : DbContext
	{
		public BancoContext(DbContextOptions<BancoContext> options) : base(options)
		{
		}

		public DbSet<ReservaPendenteModel> RESERVAS_PENDENTES { get; set; }


	}
}
