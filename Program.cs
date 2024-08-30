using AluguelDeCasas.Data;
using AluguelDeCasas.Repositorio;
using CadastroDeAluno.Repositorio;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();


// Configuração do Entity Framework Core
builder.Services.AddDbContext<BancoContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DataBase")));

builder.Services.AddScoped<IReservaPendenteRepositorio, ReservaPendenteRepositorio>();

// Configuração do Entity Framework Core
builder.Services.AddDbContext<BancoContextAprovados>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DataBase")));

// Configuração do Entity Framework Core
builder.Services.AddDbContext<BancoContextLogin>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DataBase")));

builder.Services.AddScoped<IReservaPendenteRepositorio, ReservaPendenteRepositorio>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Home/Error");
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
	name: "default",
	pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
