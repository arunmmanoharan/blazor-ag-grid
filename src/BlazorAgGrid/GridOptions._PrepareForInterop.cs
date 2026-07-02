using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlazorAgGrid
{
    // Adds support for event to make preparations and adjustments
    // of the <c>GridOptions</c> instance before being passed off
    // to JavaScript interop.  This can be used to adjust GridOptions
    // internals, convert values, add proxies and surrogates, etc.
    public partial class GridOptions
    {
        // Defines an event that will be invoked just before the
        // GridOption instance will be passed off to JS interop
        internal event EventHandler<PrepareForInteropEventArgs> PrepareForInterop;

        // Invoke any registered event handler with an instance of the JS
        // runtime and the interop module which can be used by any interop
        // proxies or surrogates
        internal virtual void FirePrepareForInterop(IJSRuntime js, IJSObjectReference module)
        {
            var ev = new PrepareForInteropEventArgs(js, module);
            PrepareForInterop?.Invoke(this, ev);
        }

        // Registered event handlers will be passed an instance
        // of this event argument, which contains a reference to
        // the JS runtime, the interop module, and other possible
        // state in the future
        internal class PrepareForInteropEventArgs : EventArgs
        {
            public PrepareForInteropEventArgs(IJSRuntime js, IJSObjectReference module)
            {
                JS = js;
                Module = module;
            }

            public IJSRuntime JS { get; }

            public IJSObjectReference Module { get; }
        }
    }
}
