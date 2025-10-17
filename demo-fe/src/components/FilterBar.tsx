import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { ListTodo, Clock, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

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
  const filterOptions = [
    {
      value: "all" as const,
      label: "All Tasks",
      count: totalCount,
      icon: ListTodo,
    },
    {
      value: "active" as const,
      label: "Active",
      count: activeCount,
      icon: Clock,
    },
    {
      value: "completed" as const,
      label: "Completed",
      count: completedCount,
      icon: CheckCircle,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Tasks</CardTitle>
        <CardDescription>View all, active, or completed tasks</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {filterOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              variant={filter === option.value ? "default" : "outline"}
              className="h-auto py-4 justify-between"
            >
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{option.label}</span>
              </span>
              <Badge
                variant={filter === option.value ? "secondary" : "default"}
              >
                {option.count}
              </Badge>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
