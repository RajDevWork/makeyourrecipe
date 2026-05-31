import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChefHat,
  ArrowRight,
} from "lucide-react";
import { login } from "../store/slices/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(login(formData));

    if (result.payload?.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-orange-500/20 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-pink-500/20 blur-[140px]" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-900" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            shadow-[0_20px_80px_rgba(0,0,0,0.5)]
            p-8
          "
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="
                mx-auto
                mb-5
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-3xl
                bg-gradient-to-r
                from-orange-500
                via-pink-500
                to-purple-500
                shadow-lg
                shadow-orange-500/30
              "
            >
              <ChefHat className="h-10 w-10 text-white" />
            </motion.div>

            <h1 className="text-4xl font-extrabold text-white">
              Welcome Back
            </h1>

            <p className="mt-3 text-gray-400">
              Sign in to continue your culinary journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    py-4
                    pl-12
                    pr-4
                    text-white
                    placeholder:text-gray-500
                    outline-none
                    transition-all
                    duration-300
                    focus:border-orange-500
                    focus:ring-4
                    focus:ring-orange-500/20
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    py-4
                    pl-12
                    pr-12
                    text-white
                    placeholder:text-gray-500
                    outline-none
                    transition-all
                    duration-300
                    focus:border-orange-500
                    focus:ring-4
                    focus:ring-orange-500/20
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 bg-transparent"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-orange-400 hover:text-orange-300"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-orange-500
                via-pink-500
                to-purple-500
                py-4
                font-semibold
                text-white
                shadow-lg
                shadow-orange-500/30
                transition-all
              "
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-white/10" />
            <span className="px-4 text-sm text-gray-500">
              or continue with
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                py-3
                text-white
                transition-all
                hover:bg-white/10
              "
            >
              Google
            </button>

            <button
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                py-3
                text-white
                transition-all
                hover:bg-white/10
              "
            >
              GitHub
            </button>
          </div>

          {/* Register */}
          <p className="mt-8 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-orange-400 hover:text-orange-300"
            >
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;