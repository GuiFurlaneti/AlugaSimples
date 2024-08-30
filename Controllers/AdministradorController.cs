using AluguelDeCasas.Models;
using AluguelDeCasas.Repositorio;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace AluguelDeCasas.Controllers
{
	public class AdministradorController : Controller
	{
		public IActionResult Index(string validate)
		{
			if (validate == "true") {

				return View();
			}
			else
			{
				var result = new
				{
					Success = false,
					Message = "NÃO PERMITIDO",
					Codigo = "404"
				};
				return View("~/Views/Login/Index.cshtml");
			}

		}

		private readonly IReservaPendenteRepositorio _reservaPendenteRepositorio;
		public AdministradorController(IReservaPendenteRepositorio reservaPendenteRepositorio)
		{
			_reservaPendenteRepositorio = reservaPendenteRepositorio;

		}

		public IActionResult BuscarEditar(int id)
		{
			ReservaPendenteModel reserva = _reservaPendenteRepositorio.BuscarEditar(id);
			return new JsonResult(reserva);
		}

		public IActionResult BuscarEditarAprovados(int id)
		{
			ReservaPendenteModel reserva = _reservaPendenteRepositorio.BuscarAprovados(id);
			return new JsonResult(reserva);
		}

		public IActionResult ListarReservasPendentes()
		{
			List<ReservaPendenteModel> reserva = _reservaPendenteRepositorio.ListarTodasReservasPendentes();
			return new JsonResult(reserva);
		}

		public IActionResult ExcluirSolicitacaoDeReserva(int id)
		{
			_reservaPendenteRepositorio.Excluir(id);
			var result = new
			{
				Success = true,
				Message = "Excluido com sucesso",
				Codigo = "0"
			};
			return Json(result);
		}

		public IActionResult IncluirReserva(ReservaPendenteModel reserva)
		{
			_reservaPendenteRepositorio.AprovarReserva(reserva);
			var result = new
			{
				Success = true,
				Message = "Aprovado com sucesso!",
				Codigo = "0"
			};
			return Json(result);
		}

		public IActionResult ListarReservasAprovadas()
		{
			List<ReservaPendenteModel> reserva = _reservaPendenteRepositorio.ListarTodasReservas();
			return new JsonResult(reserva);
		}

		public IActionResult AlterarReserva(ReservaPendenteModel reserva)
		{
			_reservaPendenteRepositorio.AlterarReserva(reserva);
			return RedirectToAction("Index");
		}

		public IActionResult ExcluirReserva(int id)
		{
			_reservaPendenteRepositorio.ExcluirReservaAprovada(id);
			var result = new
			{
				Success = true,
				Message = "Reserva excluida com sucesso",
				Codigo = "0"
			};
			return Json(result);
		}


	}

}
