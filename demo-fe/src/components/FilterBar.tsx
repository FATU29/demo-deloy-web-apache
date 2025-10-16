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
  }> = [
    { value: "all", label: "All", count: totalCount },
    { value: "active", label: "Active", count: activeCount },
    { value: "completed", label: "Completed", count: completedCount },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {filterButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => onFilterChange(btn.value)}
            className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === btn.value
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {btn.label} <span className="ml-1 text-sm">({btn.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
