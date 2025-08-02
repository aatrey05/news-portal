import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Login requested for email: ${email} (mock)`);
  }

  return (
    <main className="flex justify-center items-center p-8 min-h-screen bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <div className="form-control mb-4">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input input-bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Your password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </main>
  );
}
