"use client";

import { useState } from "react";
import { login } from "@/app/actions/auth";
import { Bricolage_Grotesque } from "next/font/google";
import { Button } from "@/components/ui/Button";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500"] });

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await login(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c0c0c] px-6">
      <div className="w-full max-w-sm">
        <h1 className={`${bricolage.className} mb-10 text-2xl font-medium text-white/90`}>
          Admin
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/80 placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/80 placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors"
          />

          {error && (
            <p className="text-xs text-red-400/80">{error}</p>
          )}

          <Button type="submit" variant="primaryBlock" disabled={loading} className="mt-2">
            {loading ? "..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
