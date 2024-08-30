using Microsoft.AspNetCore.Mvc;

namespace AluguelDeCasas.Controllers
{
	public class ServicosController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
