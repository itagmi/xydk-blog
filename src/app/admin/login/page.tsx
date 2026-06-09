"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "@/app/actions/auth";
import { Bricolage_Grotesque } from "next/font/google";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { getResetPasswordRedirectUrl } from "@/lib/auth/redirect";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500"] });

function LoginForm() {
  const searchParams = useSearchParams();
  const resetSuccess = searchParams.get("reset") === "success";
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    const result = await login(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  async function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResetLoading(true);
    setError(null);
    setInfo(null);

    const email = new FormData(e.currentTarget).get("email") as string;
    if (!email) {
      setError("이메일을 입력해주세요.");
      setResetLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: getResetPasswordRedirectUrl() },
    );

    if (resetError) {
      setError(resetError.message);
      setResetLoading(false);
      return;
    }

    setInfo("비밀번호 재설정 링크를 이메일로 보냈습니다. 메일함을 확인해주세요.");
    setResetLoading(false);
    setShowForgot(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c0c0c] px-6">
      <div className="w-full max-w-sm">
        <h1 className={`${bricolage.className} mb-10 text-2xl font-medium text-white/90`}>
          Admin
        </h1>

        {showForgot ? (
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-white/40">
              가입한 이메일을 입력하면 재설정 링크를 보내드립니다.
            </p>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/80 placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors"
            />

            {error && <p className="text-xs text-red-400/80">{error}</p>}

            <Button type="submit" variant="primaryBlock" disabled={resetLoading} className="mt-2">
              {resetLoading ? "..." : "Send reset link"}
            </Button>
            <button
              type="button"
              onClick={() => {
                setShowForgot(false);
                setError(null);
              }}
              className="text-xs uppercase tracking-[0.12em] text-white/30 transition-colors hover:text-white/60"
            >
              Back to sign in
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {resetSuccess && (
              <p className="text-xs text-emerald-400/80">
                비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요.
              </p>
            )}
            {info && <p className="text-xs text-emerald-400/80">{info}</p>}
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

            {error && <p className="text-xs text-red-400/80">{error}</p>}

            <Button type="submit" variant="primaryBlock" disabled={loading} className="mt-2">
              {loading ? "..." : "Sign in"}
            </Button>
            <button
              type="button"
              onClick={() => {
                setShowForgot(true);
                setError(null);
                setInfo(null);
              }}
              className="text-xs uppercase tracking-[0.12em] text-white/30 transition-colors hover:text-white/60"
            >
              Forgot password?
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0c0c0c]">
          <p className="text-sm text-white/40">Loading...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
