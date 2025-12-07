import { ExecutionResult } from "../types";

let pyodideInstance: any = null;
let pyodideReadyPromise: Promise<any> | null = null;

const initPyodide = async () => {
  if (!pyodideReadyPromise) {
    pyodideReadyPromise = (async () => {
      // @ts-ignore
      if (window.loadPyodide) {
        // @ts-ignore
        pyodideInstance = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });
        
        // Load micropip to handle python package installation
        await pyodideInstance.loadPackage("micropip");
        const micropip = pyodideInstance.pyimport("micropip");
        
        // Install pandas (standard)
        await pyodideInstance.loadPackage("pandas");
        
        // Install openpyxl via micropip to ensure availability for Excel operations
        await micropip.install("openpyxl");
        
        return pyodideInstance;
      }
      throw new Error("Pyodide not loaded in window");
    })();
  }
  return pyodideReadyPromise;
};

export const runPythonCode = async (code: string): Promise<ExecutionResult> => {
  try {
    const pyodide = await initPyodide();
    
    // Reset stdout buffer
    pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
    `);

    // Run the user code
    await pyodide.runPythonAsync(code);

    // Get stdout
    const stdout = pyodide.runPython("sys.stdout.getvalue()");
    return { output: stdout };

  } catch (err: any) {
    return { output: "", error: err.message };
  }
};

export const isPyodideReady = () => !!pyodideInstance;