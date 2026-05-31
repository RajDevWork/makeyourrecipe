import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Camera,
  Save,
  User,
  Mail,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { updateProfile } from "../store/slices/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    avatar: null,
  });

  const [previewAvatar, setPreviewAvatar] = useState(
    user?.avatar
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        avatar: file,
      });

      setPreviewAvatar(
        URL.createObjectURL(file)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await dispatch(updateProfile(formData));

      toast.success(
        "Profile updated successfully"
      );
    } catch (error) {
      toast.error(
        "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Hero Skeleton */}
        <div
          className="
            h-[220px]
            rounded-[40px]
            bg-slate-200
            dark:bg-slate-900
            animate-pulse
            mb-10
          "
        />

        {/* Form Skeleton */}
        <div
          className="
            rounded-[32px]
            border
            border-slate-200
            dark:border-slate-800
            bg-white
            dark:bg-slate-900
            p-8
          "
        >
          {/* Avatar */}
          <div className="flex justify-center mb-10">
            <div
              className="
                h-36
                w-36
                rounded-full
                bg-slate-200
                dark:bg-slate-800
                animate-pulse
              "
            />
          </div>

          {/* Name */}
          <div className="mb-6">
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3" />

            <div className="h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>

          {/* Email */}
          <div className="mb-6">
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3" />

            <div className="h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>

          {/* Bio */}
          <div className="mb-6">
            <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3" />

            <div className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>

          {/* Button */}
          <div className="h-14 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
}



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[40px] mb-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500" />

          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 px-8 py-14 md:px-12 text-white">

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/20
                  backdrop-blur-md
                "
              >
                <User className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-4xl md:text-6xl font-black">
                  Profile Settings
                </h1>

                <p className="mt-2 text-white/90">
                  Manage your personal information and account details.
                </p>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            rounded-[32px]
            border
            border-slate-200
            dark:border-slate-800
            bg-white
            dark:bg-slate-900
            p-6
            md:p-10
            shadow-sm
          "
        >

          {/* Avatar */}
          <div className="flex justify-center mb-10">
            <div className="relative">

              <img
                src={
                  previewAvatar ||
                  `https://ui-avatars.com/api/?name=${user?.name}&background=f97316&color=fff`
                }
                alt="Profile"
                className="
                  h-36
                  w-36
                  rounded-full
                  object-cover
                  border-4
                  border-white
                  shadow-xl
                "
              />

              <label
                className="
                  absolute
                  bottom-2
                  right-2
                  flex
                  h-12
                  w-12
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-r
                  from-orange-500
                  via-amber-500
                  to-rose-500
                  text-white
                  shadow-lg
                  hover:scale-105
                  transition-all
                "
              >
                <Camera className="h-5 w-5" />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <User className="h-4 w-4" />
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-800
                  px-4
                  py-3
                  outline-none
                  focus:border-orange-500
                  focus:ring-4
                  focus:ring-orange-500/10
                   text-white
                "
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Mail className="h-4 w-4" />
                Email Address
              </label>

              <input
                type="email"
                value={user?.email}
                disabled
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-slate-100
                  dark:bg-slate-800
                  text-white
                  px-4
                  py-3
                  cursor-not-allowed
                "
              />
            </div>

            {/* Bio */}
            <div>
              <label className="mb-2 flex items-center  text-white gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <FileText className="h-4 w-4" />
                Bio
              </label>

              <textarea
                name="bio"
                rows="5"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                className="
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-800
                  px-4
                  py-3
                  outline-none
                  focus:border-orange-500
                  focus:ring-4
                  focus:ring-orange-500/10
                "
              />
            </div>

            {/* Button */}
            <button
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
                via-amber-500
                to-rose-500
                px-6
                py-4
                font-semibold
                text-white
                shadow-lg
                shadow-orange-500/20
                hover:scale-[1.01]
                transition-all
              "
            >
              <Save className="h-4 w-4" />

              {loading
                ? "Saving Changes..."
                : "Save Changes"}
            </button>

          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;