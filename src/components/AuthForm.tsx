import { useState } from "react";

type AuthFormProps = {
  onLogin: (username: string) => void;
};

export default function AuthForm({ onLogin }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      // simulate login
      onLogin(username);
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-96 space-y-4 rounded-2xl bg-gray-800 p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Crypto Dashboard Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-2 font-semibold hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
