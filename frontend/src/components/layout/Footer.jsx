import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChefHat,
  FacebookIcon,
  InstagramIcon,
  GithubIcon,
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
    icon: FacebookIcon,
    href: 'https://facebook.com',
    color: 'hover:text-blue-600',
  },
  {
    icon: InstagramIcon,
    href: 'https://instagram.com',
    color: 'hover:text-pink-600',
  },
  {
    icon: GithubIcon,
    href: 'https://github.com',
    color: 'hover:text-gray-900 dark:hover:text-white',
  },
];

  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold gradient-text">RecipeBook</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Discover, share, and create amazing recipes with food lovers from around the world. 
              Join our community today!
            </p>
            <div className="flex space-x-3">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ${social.color} transition-colors duration-300`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
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
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
              <Mail className="w-5 h-5 text-orange-500" />
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
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {currentYear} RecipeBook. All rights reserved. Made with ❤️ for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;