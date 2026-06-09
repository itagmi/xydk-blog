"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Bricolage_Grotesque } from "next/font/google";
import { createClient } from "@/lib/supabase/client";
import { parseAuthHashError } from "@/lib/auth/redirect";
import { Button } from "@/components/ui/Button";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500"] });

const inputClassName =
  "border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/80 placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const supabase = createClient();
    let subscription: { unsubscribe: () => void } | null = null;

    async function initSession() {
      const hashError = parseAuthHashError(window.location.hash);
      if (hashError) {
        setError(hashError);
        setChecking(false);
        return;
      }

      if (searchParams.get("error") === "auth_callback_failed") {
        setError("인증에 실패했습니다. 비밀번호 재설정을 다시 요청해주세요.");
        setChecking(false);
        return;
      }

      const code = searchParams.get("code");
      const tokenHash = searchParams.get("token_hash");
      const type = searchParams.get("type");

      try {
        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
          setReady(true);
          return;
        }

        if (tokenHash && type === "recovery") {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: "recovery",
          });
          if (verifyError) throw verifyError;
          setReady(true);
          return;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setReady(true);
          return;
        }

        const { data } = supabase.auth.onAuthStateChange((event) => {
          if (event === "PASSWORD_RECOVERY") {
            setReady(true);
            setChecking(false);
          }
        });
        subscription = data.subscription;

        await new Promise((resolve) => setTimeout(resolve, 150));

        const {
          data: { session: sessionAfterHash },
        } = await supabase.auth.getSession();
        if (sessionAfterHash) {
          setReady(true);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "비밀번호 재설정 링크가 유효하지 않거나 만료되었습니다.",
        );
      } finally {
        setChecking(false);
      }
    }

    void initSession();

    return () => {
      subscription?.unsubscribe();
    };
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    router.push("/admin/login?reset=success");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c0c0c] px-6">
      <div className="w-full max-w-sm">
        <h1
          className={`${bricolage.className} mb-3 text-2xl font-medium text-white/90`}
        >
          Reset password
        </h1>
        <p className="mb-10 text-sm leading-relaxed text-white/40">
          새 비밀번호를 입력해주세요.
        </p>

        {checking && <p className="text-sm text-white/40">링크 확인 중...</p>}

        {!checking && !ready && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-red-400/80">
              {error ??
                "유효한 재설정 링크가 아닙니다. 이메일의 링크를 다시 확인해주세요."}
            </p>
            <Link
              href="/admin/login"
              className="text-xs uppercase tracking-[0.12em] text-white/40 transition-colors hover:text-white/70"
            >
              로그인으로 돌아가기
            </Link>
          </div>
        )}

        {!checking && ready && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="New password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClassName}
            />
            <input
              type="password"
              placeholder="Confirm password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClassName}
            />

            {error && <p className="text-xs text-red-400/80">{error}</p>}

            <Button
              type="submit"
              variant="primaryBlock"
              disabled={loading}
              className="mt-2"
            >
              {loading ? "..." : "Update password"}
            </Button>

            <Link
              href="/admin/login"
              className="text-center text-xs uppercase tracking-[0.12em] text-white/30 transition-colors hover:text-white/60"
            >
              Cancel
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0c0c0c] px-6">
          <p className="text-sm text-white/40">Loading...</p>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
