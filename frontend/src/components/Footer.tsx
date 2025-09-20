import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 mt-12 py-8 transition-colors duration-300">
      <div className="container mx-auto grid md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <h3 className="font-bold text-lg mb-2">TunTun Sweet Shop Pvt. Ltd.</h3>
          <p>Delivering sweetness since 1995.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:text-pink-500">Home</Link></li>
            <li><Link href="/about" className="hover:text-pink-500">About</Link></li>
            <li><Link href="/sweets" className="hover:text-pink-500">Sweets</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p>Email: contact@tuntunsweets.com</p>
          <p>📞 +91 98765 43210</p>
          <div className="flex gap-3 mt-2 justify-center md:justify-start">
            <a href="#" className="hover:text-blue-600">Facebook</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
            <a href="#" className="hover:text-pink-600">Instagram</a>
          </div>
        </div>
      </div>
      <p className="text-center text-sm mt-6 text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} TunTun Sweet Shop Pvt. Ltd. All rights reserved.
      </p>
    </footer>
  );
}
