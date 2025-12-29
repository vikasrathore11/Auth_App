import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { NavLink } from "react-router";

function OAuth2Button() {
    return (

        <div className="grid grid-cols-2 gap-4" >

            <NavLink
                to={`${import.meta.env.VITE_BASE_URL || "https://auth-app-backend-1-0.onrender.com"}/oauth2/authorization/google`}
                className="block"
            >
                <Button
                    type="button"
                    variant="outline" className="rounded-xl gap-2 cursor-pointer">
                    <svg className="h-5 w-5" viewBox="0 0 48 48">
                        <path
                            fill="#FFC107"
                            d="M43.6 20.1H42V20H24v8h11.3C33.7 32.1 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1 7.4 2.7l5.7-5.7C33.7 6.4 29 4.5 24 4.5 13.5 4.5 5 13 5 23.5S13.5 42.5 24 42.5 43 34 43 23.5c0-1.1-.1-2.2-.4-3.4z"
                        />
                    </svg>
                    Google
                </Button>

            </NavLink >
            <NavLink
                to={`${import.meta.env.VITE_BASE_URL || "https://auth-app-backend-1-0.onrender.com"}/oauth2/authorization/github`}
                className="block"
            >
                <Button
                    type="button" variant="outline" className="rounded-xl gap-2 cursor-pointer">
                    <Github className="h-5 w-5" />
                    GitHub
                </Button>
            </NavLink>
        </div >
    );
}


export default OAuth2Button;