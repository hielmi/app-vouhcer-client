import { useEffect } from "react";
import "./index.css";
import { BrowserRouter, Route, RouteObject, Routes } from "react-router-dom";
import AdminDashboard from "./pages/Admin";
import AdminVoucherPage from "./pages/Admin/Voucher";
import HomePage from "./pages/HomePage";
import voucherServices from "./service/voucher";
import { useVoucherContext } from "./hooks/useVoucherContext";
import Swal from "sweetalert2";
import HistoryPage from "./pages/Member/HistoryPage";
import LoginPage from "./pages/Auth/Login";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/Auth/Register";
import {
  ProtectedRoute,
  ProtectedRouteJustAdmin,
} from "./utils/ProtectedRoute";
import useUserContext from "./hooks/useUserContext";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRouteJustAdmin>
        <AdminDashboard />
      </ProtectedRouteJustAdmin>
    ),
  },
  {
    path: "/admin/voucher",
    element: (
      <ProtectedRoute>
        <AdminVoucherPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/member/history",
    element: (
      <ProtectedRoute>
        <HistoryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

function App() {
  const { setVouchers } = useVoucherContext();
  const { setUser, setAuthenticated } = useUserContext();

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const { data } = await voucherServices.getAllVouchers();
        if (data.status) {
          setVouchers(data.data);
        } else {
          throw new Error("Failed to fetch vouchers");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, check your internet",
        });
      }
    };

    fetchVouchers();
  }, [setVouchers, setUser, setAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
