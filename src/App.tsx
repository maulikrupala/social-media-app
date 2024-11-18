import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ApolloProvider, useQuery } from "@apollo/client";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import Login from "./components/auth/Login";
import { auth } from "./services/firebaseConfig";
import Header from "./components/common/Header";
import SignUp from "./components/auth/SignUp";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import { client } from "./graphql/apollo-client";
import { GET_POSTS } from "./graphql/graphql";

export type User = {
  id: string;
  email: string | null;
  displayName: string | null;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => unsubscribe();
  }, []);


  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header user={user} />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <SignUp />}
              />
              <Route
                path="/"
                element={user ? <Feed user={user} /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile/:id"
                element={
                  user ? <Profile user={user} /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/create-post"
                element={
                  user ? <CreatePost user={user} /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}
