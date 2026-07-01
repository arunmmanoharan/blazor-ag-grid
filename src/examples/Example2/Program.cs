using System;
using System.Net.Http;
using System.Threading.Tasks;
using BlazorAgGrid;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Example2
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

            // Optional ag-Grid Enterprise license key, sourced from configuration
            // (wwwroot/appsettings*.json). NEVER commit a real key. When absent the
            // grid runs in watermarked trial mode.
            builder.Services.AddBlazorAgGrid(o => o.LicenseKey = builder.Configuration["AgGridLicenseKey"]);

            await builder.Build().RunAsync();
        }
    }
}
