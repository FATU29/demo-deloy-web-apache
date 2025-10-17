export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-white/20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              About This App
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Learn more about our Todo List application
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-blue-600">✨</span>
              What is This?
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              A modern, full-stack todo list application designed to help you
              stay organized and productive. Manage your daily tasks with an
              intuitive interface, beautiful design, and powerful features.
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-green-600">🚀</span>
              Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: "✅", text: "Create, edit, and delete tasks" },
                { icon: "🎯", text: "Mark tasks as complete" },
                { icon: "🔍", text: "Filter by status (All/Active/Completed)" },
                { icon: "📊", text: "Real-time statistics dashboard" },
                { icon: "💾", text: "PostgreSQL database storage" },
                { icon: "🎨", text: "Beautiful, responsive design" },
                { icon: "⚡", text: "Fast and smooth animations" },
                { icon: "📱", text: "Mobile-friendly interface" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-sm sm:text-base text-gray-700 font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-indigo-600">🛠️</span>
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { name: "React 19", color: "from-cyan-500 to-blue-500" },
                { name: "TypeScript", color: "from-blue-500 to-indigo-600" },
                { name: "Tailwind CSS", color: "from-sky-400 to-cyan-500" },
                { name: "Node.js", color: "from-green-500 to-emerald-600" },
                { name: "Express.js", color: "from-gray-600 to-gray-700" },
                { name: "PostgreSQL", color: "from-blue-600 to-indigo-700" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className={`p-4 sm:p-5 bg-gradient-to-br ${tech.color} rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-center`}
                >
                  <p className="text-sm sm:text-base font-bold text-white">
                    {tech.name}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Version & Info */}
          <section className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Version
                </p>
                <p className="text-lg sm:text-xl font-bold text-blue-600 mt-1">
                  1.0.0
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Status
                </p>
                <p className="text-lg sm:text-xl font-bold text-green-600 mt-1">
                  Active
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Release
                </p>
                <p className="text-lg sm:text-xl font-bold text-purple-600 mt-1">
                  Oct 2025
                </p>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <section className="text-center py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Built with ❤️ using modern web technologies
            </p>
            <p className="text-xs text-gray-500 mt-2">
              © 2025 Todo List App. All rights reserved.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
