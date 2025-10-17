export default function SettingsPage() {
  return (
    <div className="animate-fade-in">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-white/20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              Settings
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Configure your application preferences
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 sm:space-y-8">
          {/* API Configuration */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-blue-600">🔌</span>
              API Configuration
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base font-semibold text-gray-700">
                    Backend URL:
                  </span>
                  <code className="text-xs sm:text-sm bg-white px-3 py-1.5 rounded-lg border border-blue-200 text-blue-700 font-mono">
                    {import.meta.env.VITE_API_URL ||
                      "http://localhost:3000/api"}
                  </code>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Connected</span>
                </div>
              </div>
            </div>
          </section>

          {/* Display Preferences */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-purple-600">🎨</span>
              Display Preferences
            </h2>
            <div className="space-y-4">
              {[
                { label: "Theme", value: "Light Mode", icon: "☀️" },
                { label: "Language", value: "English", icon: "🌍" },
                { label: "Animation", value: "Enabled", icon: "✨" },
                { label: "Notifications", value: "Enabled", icon: "🔔" },
              ].map((setting, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 sm:p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{setting.icon}</span>
                    <span className="text-sm sm:text-base font-semibold text-gray-700">
                      {setting.label}
                    </span>
                  </div>
                  <span className="text-sm sm:text-base text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg font-medium">
                    {setting.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Data Management */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-green-600">💾</span>
              Data Management
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button className="p-4 sm:p-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export Data
              </button>
              <button className="p-4 sm:p-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Import Data
              </button>
            </div>
          </section>

          {/* Danger Zone */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
              <span>⚠️</span>
              Danger Zone
            </h2>
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    Clear All Tasks
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Permanently delete all your tasks. This action cannot be
                    undone.
                  </p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    Clear All Data
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Info */}
          <section className="text-center py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Settings are stored locally in your browser
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
