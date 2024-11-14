import Dashboard from "./components/dashboard/Dashboard";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <Dashboard/>
    </SnackbarProvider>
  );
}

export default App;
