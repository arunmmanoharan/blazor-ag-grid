using System;
using System.Net.Http;
using System.Threading.Tasks;
using BlazorAgGrid;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Example1.Client
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

            // Optional ag-Grid Enterprise license key from configuration; never commit a key.
            builder.Services.AddBlazorAgGrid(o => o.LicenseKey = builder.Configuration["AgGridLicenseKey"]);

            await builder.Build().RunAsync();
        }
    }
}
