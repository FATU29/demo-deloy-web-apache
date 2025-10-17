interface FilterBarProps {
  filter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
}

export default function FilterBar({
  filter,
  onFilterChange,
  totalCount,
  activeCount,
  completedCount,
}: FilterBarProps) {
  const filterButtons: Array<{
    value: "all" | "active" | "completed";
    label: string;
    count: number;
    icon: string;
    color: string;
    activeColor: string;
  }> = [
    { 
      value: "all", 
      label: "All Tasks", 
      count: totalCount,
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      color: "from-blue-500 to-indigo-600",
      activeColor: "bg-gradient-to-r from-blue-600 to-indigo-700"
    },
    { 
      value: "active", 
      label: "Active", 
      count: activeCount,
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "from-amber-500 to-orange-600",
      activeColor: "bg-gradient-to-r from-amber-600 to-orange-700"
    },
    { 
      value: "completed", 
      label: "Completed", 
      count: completedCount,
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "from-green-500 to-emerald-600",
      activeColor: "bg-gradient-to-r from-green-600 to-emerald-700"
    },
  ];

  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-3 sm:p-4 border border-white/20">
        <div className="flex items-center gap-2 mb-3 px-1">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h3 className="text-sm font-semibold text-gray-700">Filter Tasks</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => onFilterChange(btn.value)}
              className={`
                group relative px-4 py-3.5 sm:py-4 rounded-xl font-semibold transition-all duration-300 
                ${filter === btn.value
                  ? `${btn.activeColor} text-white shadow-lg scale-[1.02]`
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md"
                }
              `}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`
                    w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300
                    ${filter === btn.value
                      ? "bg-white/20"
                      : `bg-gradient-to-br ${btn.color} text-white shadow-sm`
                    }
                  `}>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={btn.icon} />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base whitespace-nowrap">{btn.label}</span>
                </div>
                
                <div className={`
                  flex items-center justify-center min-w-[28px] sm:min-w-[32px] h-7 sm:h-8 rounded-lg font-bold text-sm sm:text-base transition-all duration-300
                  ${filter === btn.value
                    ? "bg-white/20 text-white"
                    : `bg-gradient-to-br ${btn.color} text-white shadow-sm`
                  }
                `}>
                  {btn.count}
                </div>
              </div>
              
              {/* Active Indicator */}
              {filter === btn.value && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
