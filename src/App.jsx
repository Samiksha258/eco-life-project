import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
 
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("Samiksha");
 
  if (!loggedIn) {
    return <LoginPage onLogin={(name) => { setUser(name || "Samiksha"); setLoggedIn(true); }} />;
  }
 
  return <Dashboard userName={user} />;
}