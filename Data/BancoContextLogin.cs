using AluguelDeCasas.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AluguelDeCasas.Data
{
	public class BancoContextLogin : DbContext
	{
		public BancoContextLogin(DbContextOptions<BancoContextLogin> options) : base(options)
		{
		}
		public DbSet<UsuarioCliente> CLIENTES_LOGINS { get; set; }
	}
}
