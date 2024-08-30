using AluguelDeCasas.Models;
using AluguelDeCasas.Repositorio;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AluguelDeCasas.Controllers
{
	public class LoginController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		private readonly IReservaPendenteRepositorio _reservaPendenteRepositorio;
		public LoginController(IReservaPendenteRepositorio reservaPendenteRepositorio)
		{
			_reservaPendenteRepositorio = reservaPendenteRepositorio;

		}

		public IActionResult ValidarLoginAutenticado(string user, string psw)
		{
			UsuarioCliente loginUsuario = _reservaPendenteRepositorio.ValidarLoginAutenticado(user, psw);

			if (loginUsuario == null)
			{
				var result = new
				{
					Success = false,
					Message = "ACESSO NEGADO",
					Codigo = "0"
				};
				return Json(result);
			}

			else {
				var userBda = loginUsuario.USUARIO;
				var pswBda = loginUsuario.SENHA;
				if (user == userBda) {
					if (psw == pswBda) {
						var result = new
						{
							Success = true,
							Message = "ACESSO PERMITIDO",
							Codigo = "0"
						};
						return Json(result);
					}
					else
					{
						var result = new
						{
							Success = false,
							Message = "ACESSO NEGADO",
							Codigo = "0"
						};
						return Json(result);
					}
				}
				else
				{
					var result = new
					{
						Success = false,
						Message = "ACESSO NEGADO",
						Codigo = "0"
					};
					return Json(result);
				}
			}

		}

	}
}
