import { Outlet, Link, NavLink } from "react-router-dom";
import { Activity } from "lucide-react";

function Layout() {
  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#edfafd]/90 backdrop-blur border-b border-white/40">
  <div className="mx-auto max-w-7.5xl flex items-center justify-between px-7 py-4">
          <Link to="/" className="flex items-center gap-2">
  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center">
    <Activity className="text-white h-6 w-6" />
  </div>

  <span className="text-2xl font-bold text-slate-700">
    StressCare AI
  </span>
</Link>

          <nav className="flex items-center gap-1">
  {[
    { name: "Home", path: "/" },
    { name: "Prediction", path: "/prediction" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Weekly Report", path: "/report" },
    { name: "Recommendations", path: "/recommendations" },
    { name: "Interactive Hub", path: "/hub" },
    { name: "Games", path: "/games" },
    { name: "About", path: "/about" },
  ].map((item) => (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.path === "/"}
      className={({ isActive }) =>
        `px-5 py-2 rounded-full font-medium transition-all duration-300 ${
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
        }`
      }
    >
      {item.name}
    </NavLink>
  ))}
</nav>
        </div>
      </header>

      {/* Pages */}
      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
    <Outlet />
</main>

      {/* Footer */}
      <footer className="border-t py-6 text-center">
        © 2026 Stress Monitoring & Assistance System
      </footer>
    </>
  );
}

export default Layout;