export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      <div className="glass-effect rounded-3xl p-12 max-w-md w-full mx-4">
        <h1
          className="text-4xl font-bold mb-2 text-center gradient-text"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Welcome Back
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
          Login to continue your job search
        </p>

        {/* Login form will be added here */}
        <div className="text-center text-slate-500 dark:text-slate-400">
          Login page - Coming soon!
        </div>
      </div>
    </div>
  );
}
