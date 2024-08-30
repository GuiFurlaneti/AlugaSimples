using AluguelDeCasas.Data;
using AluguelDeCasas.Models;
using AluguelDeCasas.Repositorio;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroDeAluno.Repositorio
{
	public class ReservaPendenteRepositorio : IReservaPendenteRepositorio
	{
		private readonly BancoContext _bancoContext;
		private readonly BancoContextAprovados _bancoContextAprovados;
		private readonly BancoContextLogin _bancoContextLogin;
		public ReservaPendenteRepositorio(BancoContext bancoContext, BancoContextAprovados bancoContextAprovados, BancoContextLogin bancoContextLogin)
		{
			_bancoContext = bancoContext;
			_bancoContextAprovados = bancoContextAprovados;
			_bancoContextLogin = bancoContextLogin;
		}

		public ReservaPendenteModel BuscarEditar(int id)
		{
			#pragma warning disable CS8603
			return _bancoContext.RESERVAS_PENDENTES.FirstOrDefault(x => x.Id == id);

		}

		public ReservaPendenteModel BuscarAprovados(int id)
		{
			#pragma warning disable CS8603
			return _bancoContextAprovados.RESERVAS_APROVADAS.FirstOrDefault(x => x.Id == id);

		}

		public ReservaPendenteModel Adicionar(ReservaPendenteModel reserva)
		{
			_bancoContext.Add(reserva);
			_bancoContext.SaveChanges();
			return reserva;
		}

		public List<ReservaPendenteModel> ListarTodasReservasPendentes()
		{
			return _bancoContext.RESERVAS_PENDENTES.ToList();
		}

		public List<ReservaPendenteModel> ListarTodasReservas()
		{
			return _bancoContextAprovados.RESERVAS_APROVADAS.ToList();
		}

		public ReservaPendenteModel Excluir(int id) 
		{
			ReservaPendenteModel reservaDB = BuscarEditar(id);
			if (reservaDB == null) throw new System.Exception("Houve um erro ao atulizar as informações da reserva");

			_bancoContext.Remove(reservaDB);
			_bancoContext.SaveChanges();
			return reservaDB;
		}

		public ReservaPendenteModel AprovarReserva(ReservaPendenteModel reserva)
		{
			_bancoContextAprovados.Add(reserva);
			_bancoContextAprovados.SaveChanges();
			return reserva;
		}

		public ReservaPendenteModel AlterarReserva(ReservaPendenteModel reserva)
		{
			ReservaPendenteModel reservaDB = BuscarAprovados(reserva.Id);
			if (reservaDB == null) throw new System.Exception("Houve um erro ao atulizar as informações da reserva");

			reservaDB.NOME = reserva.NOME;
			reservaDB.CONTATO = reserva.CONTATO;
			reservaDB.TIPO_EVENTO = reserva.TIPO_EVENTO;
			reservaDB.PAGAMENTO = reserva.PAGAMENTO;
			reservaDB.SERVICOS_ADD = reserva.SERVICOS_ADD;
			reservaDB.DIA_ENTRADA = reserva.DIA_ENTRADA;
			reservaDB.DIA_SAIDA = reserva.DIA_SAIDA;

			_bancoContextAprovados.Update(reservaDB);
			_bancoContextAprovados.SaveChanges();
			return reservaDB;
		}

		public ReservaPendenteModel ExcluirReservaAprovada(int id)
		{
			ReservaPendenteModel reservaDB = BuscarAprovados(id);
			if (reservaDB == null) throw new System.Exception("Houve um erro ao atulizar as informações da reserva");

			_bancoContextAprovados.Remove(reservaDB);
			_bancoContextAprovados.SaveChanges();
			return reservaDB;
		}

		public UsuarioCliente ValidarLoginAutenticado(string user, string psw)
		{
			#pragma warning disable CS8603
			return _bancoContextLogin.CLIENTES_LOGINS.FirstOrDefault(x => x.USUARIO == user);

		}


	}
}
