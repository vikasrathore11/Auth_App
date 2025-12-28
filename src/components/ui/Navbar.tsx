import { NavLink, useNavigate } from "react-router";
import { Button } from "./button";
import useAuth from "@/auth/store";
import { LogOut } from "lucide-react";

function Navbar() {

  const authStatus = useAuth(state => state.authStatus);
  const accessToken = useAuth(state => state.accessToken);
  const user = useAuth(state => state.user);
  const logout = useAuth(state => state.logout);
  const isLoggedIn = authStatus && !!accessToken;
  const navigate = useNavigate();
  return (
    <nav className="py-5 dark:border-b border-gray-700 flex md:flex-row gap-4 flex-col md:h-14 justify-around items-center">

      <div className="font-semibold flex gap-2 items-center">
        <span className="h-6 w-6 rounded-md bg-gradient-to-r from-primary to-primary/40 text-center">
          A
        </span>
        <span>Auth App</span>
      </div>

      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <NavLink to={"/dashboard/profile"}>{user?.name}  </NavLink>


            <Button size="sm" variant="outline" onClick={() => {
              logout();
              navigate("/");
            }} className="rounded-xl gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
            {/* <Button
              size="sm"
              variant="outline"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Button> */}
          </>
        ) : (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">
              <Button size="sm" variant="outline">Login</Button>
            </NavLink>
            <NavLink to="/signup">
              <Button size="sm" variant="outline">Signup</Button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
