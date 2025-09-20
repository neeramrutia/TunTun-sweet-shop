export default function HomePage() {
  return (
    <section className="text-center py-16">
      <h1 className="text-5xl font-extrabold mb-6 text-pink-600">
        🍬 TunTun's Sweet Shop Pvt. Ltd.
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Bringing happiness through sweets since 1995. 
        We manufacture, supply, and deliver premium quality Indian sweets across the globe.
      </p>

      <div className="mt-10 flex justify-center gap-6">
        <a
          href="/about"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white hover:opacity-90"
        >
          About Us
        </a>
        <a
          href="/sweets"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90"
        >
          Explore Sweets
        </a>
      </div>
    </section>
  );
}
