import { useState } from "react";
import Router from "./app/Router/Router";
import { useEffect } from "react";
import axiosInstance, { setAccessToken } from "./shared/lib/axiosInstance";

function App() {
  const [user, setUser] = useState({ status: "logging", data: null });
  useEffect(() => {
    axiosInstance("/refreshTokens")
      .then((res) => {
        setUser({ status: "logged", data: res.data.user });
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser({ status: "guest", data: null });
        setAccessToken("");
      });
  }, []);

  return <Router setUser={setUser} user={user} />;
  //  передать юзеров позже
}

export default App;
