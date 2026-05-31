import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChefHat,
  Mail,
  Phone,
  MapPin,
  AtSign,
} from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/careers' },
      { name: 'Blog', path: '/blog' },
    ],
    Resources: [
      { name: 'Help Center', path: '/help' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
    Recipes: [
      { name: 'Browse Recipes', path: '/explore' },
      { name: 'Popular Recipes', path: '/explore?sort=popular' },
      { name: 'New Recipes', path: '/explore?sort=new' },
      { name: 'Categories', path: '/categories' },
    ],
  };

  const socialIcons = [
  {
    icon: ChefHat,
    href: 'https://facebook.com',
    color: 'hover:text-blue-600',
  }
];

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0">
      <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[150px]" />
    </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
  <Link
    to="/"
    className="flex items-center gap-3 mb-6"
  >
    <div
      className="
        h-12
        w-12
        rounded-2xl
        bg-gradient-to-br
        from-orange-500
        via-amber-500
        to-rose-500
        flex
        items-center
        justify-center
      "
    >
      <ChefHat className="h-6 w-6 text-white" />
    </div>

    <span
      className="
        text-3xl
        font-black
        bg-gradient-to-r
        from-orange-500
        via-amber-500
        to-rose-500
        bg-clip-text
        text-transparent
      "
    >
      RecipeBook
    </span>
  </Link>

  <p className="max-w-md text-slate-400 leading-relaxed">
    Discover, save and share incredible recipes with a passionate
    community of food lovers around the world.
  </p>
</div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold
text-white
mb-5">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-400
hover:text-orange-400
transition-colors
duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div
  className="
    mt-14
    rounded-3xl
    border
    border-slate-800
    bg-slate-900/50
    p-8
  "
>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 text-slate-400">
              <Mail className="h-5 w-5 text-orange-400" />
              <span>support@recipebook.com</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
              <Phone className="w-5 h-5 text-orange-500" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span>123 Foodie Street, Culinary City, FC 12345</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {currentYear} RecipeBook. Crafted with ❤️ for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;