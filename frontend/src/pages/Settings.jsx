import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun, Globe, Lock, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { toggleDarkMode } from '../store/slices/themeSlice';
import authService from '../services/authService';

const Settings = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await authService.changePassword(passwordData.currentPassword, passwordData.newPassword);
      toast.success('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

if (loading) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Hero Skeleton */}
        <div
          className="
            h-[220px]
            rounded-[40px]
            mb-10
            animate-pulse
            bg-gradient-to-r
            from-slate-200
            via-orange-100
            to-slate-200
            dark:from-slate-800
            dark:via-slate-700
            dark:to-slate-800
          "
        />

        <div className="space-y-8">

          {/* Settings Card 1 */}
          <div
            className="
              rounded-[32px]
              border
              border-slate-200
              dark:border-slate-800
              bg-white
              dark:bg-slate-900
              p-6
            "
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />

              <div>
                <div className="h-6 w-40 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-2" />
                <div className="h-4 w-64 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
              </div>
            </div>

            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-slate-100
                  dark:bg-slate-800
                  p-4
                  mb-4
                "
              >
                <div>
                  <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-700 animate-pulse mb-2" />
                  <div className="h-4 w-56 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
                </div>

                <div className="h-7 w-14 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Settings Card 2 */}
          <div
            className="
              rounded-[32px]
              border
              border-slate-200
              dark:border-slate-800
              bg-white
              dark:bg-slate-900
              p-6
            "
          >
            <div className="h-6 w-44 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-6" />

            {[...Array(2)].map((_, i) => (
              <div key={i} className="mb-6">
                <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3" />

                <div className="h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              </div>
            ))}

            <div className="h-12 w-40 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>

          {/* Settings Card 3 */}
          <div
            className="
              rounded-[32px]
              border
              border-slate-200
              dark:border-slate-800
              bg-white
              dark:bg-slate-900
              p-6
            "
          >
            <div className="h-6 w-52 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-6" />

            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-slate-100
                  dark:bg-slate-800
                  p-4
                  mb-4
                "
              >
                <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />

                <div className="h-7 w-14 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[40px] mb-10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500" />

      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 px-8 py-14 md:px-12 text-white">
        <h1 className="text-4xl md:text-6xl font-black">
          Settings
        </h1>

        <p className="mt-3 text-white/90">
          Manage your preferences, notifications and security.
        </p>
      </div>
    </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <div className="rounded-[32px]
border
border-slate-200
dark:border-slate-800
bg-white
dark:bg-slate-900
p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br
from-orange-500
via-amber-500
to-rose-500">
              {darkMode ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-white" />}
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch between light and dark theme</p>
              </div>
              <button
                onClick={() => dispatch(toggleDarkMode())}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="rounded-[32px]
border
border-slate-200
dark:border-slate-800
bg-white
dark:bg-slate-900
p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br
from-orange-500
via-amber-500
to-rose-500">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Notifications</h2>
          </div>
          
          <div className="space-y-3">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Recipe Updates</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="rounded-[32px]
border
border-slate-200
dark:border-slate-800
bg-white
dark:bg-slate-900
p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br
from-orange-500
via-amber-500
to-rose-500">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
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
placeholder-gray-500
dark:placeholder-gray-400
outline-none
focus:border-orange-500
focus:ring-4
focus:ring-orange-500/10
"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
                className="
w-full
rounded-2xl
border
border-slate-200
dark:border-slate-700
bg-white
dark:bg-slate-800
placeholder-gray-500
dark:placeholder-gray-400
outline-none
px-4
py-3
outline-none
focus:border-orange-500
focus:ring-4
focus:ring-orange-500/10
"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
                className="
w-full
rounded-2xl
border
border-slate-200
dark:border-slate-700
bg-white
dark:bg-slate-800
placeholder-gray-500
dark:placeholder-gray-400
outline-none
px-4
py-3
outline-none
focus:border-orange-500
focus:ring-4
focus:ring-orange-500/10
"
                placeholder="Confirm new password"
              />
            </div>
            <button type="submit" disabled={loading} className="
flex
items-center
gap-2
rounded-2xl
bg-gradient-to-r
from-orange-500
via-amber-500
to-rose-500
px-6
py-3
font-semibold
text-white
shadow-lg
shadow-orange-500/20
hover:scale-[1.02]
transition-all
">
              <Save className="w-4 h-4" />
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Settings;