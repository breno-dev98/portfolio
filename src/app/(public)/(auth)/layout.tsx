import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-background px-4 py-8 sm:py-12 relative overflow-hidden"
      style={{
        backgroundImage: "var(--gradient-hero)",
      }}
    >
      <div
        className="w-full max-w-[440px] bg-card p-6 sm:p-8 md:p-10 rounded-2xl border border-border/50 relative z-10"
        style={{
          boxShadow: "var(--shadow-elegant)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
