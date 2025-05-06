"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-gray-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Pithub</h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-400">
          A modern platform to host and track your projects and contributions, just like GitHub.
        </p>
        <div className="space-x-4">
          <Link
            href="/signup"
            className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition"
          >
            Sign up for free
          </Link>
          <Link
            href="/login"
            className="border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition"
          >
            login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Track Contributions</h3>
            <p className="text-gray-400">
              Visualize your activity and commits with a contribution graph.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Create Repositories</h3>
            <p className="text-gray-400">
              Organize your work in private or public repositories.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Collaborate Easily</h3>
            <p className="text-gray-400">
              Share and collaborate with friends or the community.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join developers building the future.
        </h2>
        <p className="text-gray-400 mb-8">Get started with Pithub today.</p>
        <Link
          href="/signup"
          className="bg-green-600 text-white px-8 py-3 rounded-md font-medium hover:bg-green-700 transition"
        >
          Sign Up
        </Link>
      </section>
    </main>
  );
}
