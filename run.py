import subprocess
import os
import sys
import threading
import time
import webbrowser

def stream_output(process, name):
    """Reads lines from the process stdout and prints them with a prefix."""
    for line in iter(process.stdout.readline, ''):
        print(f"[{name}] {line.strip()}")
    process.stdout.close()
    process.wait()

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(root_dir, "backend")
    frontend_dir = os.path.join(root_dir, "frontend")
    
    # Command for backend (checks for virtual environment)
    venv_python = os.path.join(backend_dir, "venv", "Scripts", "python.exe")
    if os.path.exists(venv_python):
        backend_cmd = f'"{venv_python}" -m uvicorn main:app --reload'
    else:
        # Fallback to system python if venv doesn't exist
        backend_cmd = "python -m uvicorn main:app --reload"
        
    # Command for frontend
    frontend_cmd = "npm run dev"

    print("========================================================")
    print("      Starting Study Assistant - Full Stack Server      ")
    print("========================================================")
    print("[SYSTEM] Booting up both Frontend and Backend...\n")

    try:
        # Start Backend Process
        backend_proc = subprocess.Popen(
            backend_cmd,
            cwd=backend_dir,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
        
        t_backend = threading.Thread(target=stream_output, args=(backend_proc, "BACKEND"))
        t_backend.daemon = True
        t_backend.start()

        print("[SYSTEM] Waiting 10 seconds for backend to fully start before launching frontend...")
        time.sleep(10)
        
        # Start Frontend Process
        frontend_proc = subprocess.Popen(
            frontend_cmd,
            cwd=frontend_dir,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )

        t_frontend = threading.Thread(target=stream_output, args=(frontend_proc, "FRONTEND"))
        t_frontend.daemon = True
        t_frontend.start()

        # Wait a couple of seconds for Vite to bind port, then open the browser
        print("[SYSTEM] Waiting 5 seconds for Vite server to bind port...")
        time.sleep(5)
        print("[SYSTEM] Opening Browser to http://localhost:5173 ...")
        webbrowser.open("http://localhost:5173")
        
        print("\n[SYSTEM] Servers are running! Press Ctrl+C in this terminal to stop both.\n")

        # Keep main thread alive to catch KeyboardInterrupt
        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        print("\n[SYSTEM] Shutting down servers...")
        try:
            # Kill the processes gracefully
            if sys.platform == 'win32':
                subprocess.call(['taskkill', '/F', '/T', '/PID', str(backend_proc.pid)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                subprocess.call(['taskkill', '/F', '/T', '/PID', str(frontend_proc.pid)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            else:
                backend_proc.terminate()
                frontend_proc.terminate()
        except Exception as e:
            pass
        print("[SYSTEM] Shutdown complete. Goodbye!")
        sys.exit(0)

if __name__ == "__main__":
    main()
