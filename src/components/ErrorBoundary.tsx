import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-4xl font-bold text-cyan mb-4 uppercase tracking-tighter italic">Vortex AI System Error</h1>
          <p className="text-silver/60 mb-8 font-mono">Quantum link severed. Component failed to materialize.</p>
          <pre className="bg-white/5 p-4 rounded text-left overflow-auto max-w-full text-xs text-red-400">
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-8 py-3 bg-cyan text-black font-bold rounded-lg hover:bg-white transition-all"
          >
            Reboot System
          </button>
        </div>
      );
    }

    return this.children;
  }
}

export default ErrorBoundary;
