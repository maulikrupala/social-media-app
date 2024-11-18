import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName });
    } catch (error) {
      setError("Failed to create an account. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg">
      <h2 className="text-4xl font-bold text-center mb-8">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="displayName"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#6366F1] text-white py-3 px-4 rounded-md hover:bg-[#5558E3] transition duration-300"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-6 text-center text-base">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#6366F1] hover:text-[#5558E3] hover:underline"
        >
          Log In
        </Link>
      </p>
    </div>
  );
}
