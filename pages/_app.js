import "../styles/globals.css";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import firebase from "firebase";
import Loading from "../components/Loading";
import Router from "next/router";

import ProgressBar from "@badrap/bar-of-progress";
const progress = new ProgressBar({
  size: 4,
  color: "#FCBC37",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        {
          merge: true,
        }
      );
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
