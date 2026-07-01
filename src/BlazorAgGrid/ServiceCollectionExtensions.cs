using Microsoft.Extensions.DependencyInjection;
using System;

namespace BlazorAgGrid
{
    /// <summary>
    /// Optional library-wide configuration. Register via
    /// <see cref="ServiceCollectionExtensions.AddBlazorAgGrid"/>.
    /// </summary>
    public class BlazorAgGridOptions
    {
        /// <summary>
        /// ag-Grid Enterprise license key. Supply this at runtime from
        /// configuration (environment variable, user-secrets, or an approved
        /// secret store such as Azure Key Vault). NEVER hardcode or commit a key.
        /// When null/empty the grid still runs in watermarked trial mode.
        /// </summary>
        public string LicenseKey { get; set; }
    }

    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Registers optional BlazorAgGrid configuration (e.g. the Enterprise
        /// license key). Calling this is optional; the component resolves the
        /// options lazily and works without it.
        /// </summary>
        public static IServiceCollection AddBlazorAgGrid(this IServiceCollection services,
            Action<BlazorAgGridOptions> configure = null)
        {
            var options = new BlazorAgGridOptions();
            configure?.Invoke(options);
            services.AddSingleton(options);
            return services;
        }
    }
}
