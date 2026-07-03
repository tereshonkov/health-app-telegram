import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import TabBar from "../layout/TabBar";
import Home from "../pages/Home/Home";
import History from "../pages/History/History";
import Reminders from "../pages/Reminders/Reminders";
import Profile from "../pages/Profile/Profile";
import Add from "../pages/Add/Add";
import styles from "../App.module.css";

function Layout() {
  return (
    <div className={styles.screen}>
      <main className={styles.body}>
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/history", element: <History /> },
      { path: "/reminders", element: <Reminders /> },
      { path: "/profile", element: <Profile /> },
      { path: "/add", element: <Add /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
