using AluguelDeCasas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AluguelDeCasas.Repositorio
{
	public interface IReservaPendenteRepositorio
	{
		ReservaPendenteModel BuscarEditar(int id);
		ReservaPendenteModel BuscarAprovados(int id);
		ReservaPendenteModel Adicionar(ReservaPendenteModel reserva);
		List<ReservaPendenteModel> ListarTodasReservasPendentes();
		List<ReservaPendenteModel> ListarTodasReservas();
		ReservaPendenteModel Excluir(int id);
		ReservaPendenteModel AprovarReserva(ReservaPendenteModel reserva);
		ReservaPendenteModel AlterarReserva(ReservaPendenteModel reserva);
		ReservaPendenteModel ExcluirReservaAprovada(int id);
		UsuarioCliente ValidarLoginAutenticado(string user, string psw);
	}
}
