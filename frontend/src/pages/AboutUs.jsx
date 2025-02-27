import React from "react";

export const AboutUs = () => {
  return (
    <section className="h-screen bg-gray-900 text-gray-100">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-6">
          About FileChain
        </h1>

        <p className="text-lg text-gray-300 text-center mb-8">
          FileChain is a decentralized file storage platform designed to give users complete control over their data. 
          By leveraging blockchain and IPFS, we ensure secure, tamper-proof, and efficient file storage without reliance on centralized servers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 border border-gray-700 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-400 mb-3">
              Why Choose Decentralized Storage?
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>🔐 Your data stays in your hands—no third-party control.</li>
              <li>📡 Reliable & censorship-resistant file access.</li>
              <li>⚡ Efficient, cost-effective, and scalable storage.</li>
              <li>🛡 Blockchain-backed security for file integrity.</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-700 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-400 mb-3">
              What Makes FileChain Different?
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>✅ Fully decentralized with **no single point of failure**.</li>
              <li>✅ Secure file transactions powered by **Ethereum smart contracts**.</li>
              <li>✅ **IPFS-based storage**, making files accessible anytime, anywhere.</li>
              <li>✅ Users have **full control over file access and sharing permissions**.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-blue-400">Our Mission</h2>
          <p className="text-lg text-gray-300 mt-2">
            We believe in a future where **data ownership belongs to individuals, not corporations**. Our goal is to build a seamless, secure, and decentralized file-sharing network where privacy and transparency go hand in hand.
          </p>
        </div>
      </div>
    </section>
  );
};
