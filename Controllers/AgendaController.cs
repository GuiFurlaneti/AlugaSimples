using AluguelDeCasas.Models;
using AluguelDeCasas.Repositorio;
using Microsoft.AspNetCore.Mvc;

namespace AluguelDeCasas.Controllers
{
	public class AgendaController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		private readonly IReservaPendenteRepositorio _reservaPendenteRepositorio;
		public AgendaController(IReservaPendenteRepositorio reservaPendenteRepositorio)
		{
			_reservaPendenteRepositorio = reservaPendenteRepositorio;

		}

		[HttpPost]
		public IActionResult IncluirSolicitacao(ReservaPendenteModel reserva)
		{
			_reservaPendenteRepositorio.Adicionar(reserva);
			return RedirectToAction("Index");
		}

	}
}
