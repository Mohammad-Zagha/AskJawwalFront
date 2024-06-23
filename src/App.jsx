import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import LayoutOne from "./components/LayoutOne";
import LandingPage from "./pages/LandingPage";
import SignInCode from "./pages/signin-code/SignInCode";
import SignIn from "./pages/Signin/SignIn";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutOne />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route path="/Chat" element={<Home/>} ></Route>
        <Route path="/login" element={<SignIn/>} ></Route>
      </Routes>
      
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
