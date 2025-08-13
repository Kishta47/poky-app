import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  className = "",
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200`}
          role="status"
          aria-label="Loading"
        />
        {/* Inner gradient ring */}
        <div
          className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-600 absolute top-0 left-0`}
          style={{
            background:
              "conic-gradient(from 0deg, #3b82f6, #8b5cf6, transparent, transparent)",
            borderRadius: "50%",
            mask: "radial-gradient(circle, transparent 60%, black 61%)",
            WebkitMask: "radial-gradient(circle, transparent 60%, black 61%)",
          }}
        />
        {/* Center dot */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            size === "small"
              ? "w-1 h-1"
              : size === "medium"
              ? "w-2 h-2"
              : "w-3 h-3"
          } bg-gradient-to-r from-blue-500 to-purple-600 rounded-full`}
        />
      </div>
    </div>
  );
};
