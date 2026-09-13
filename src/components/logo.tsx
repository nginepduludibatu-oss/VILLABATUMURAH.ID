import React from 'react'

export function Logo({ className = "", size = "default" }: { className?: string, size?: "default" | "large" | "small" }) {
  const sizeClasses = {
    default: "h-10 w-10",
    large: "h-16 w-16",
    small: "h-8 w-8"
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        className={sizeClasses[size]}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Mountain background */}
        <path
          d="M10 90 L30 50 L50 75 L70 40 L90 90 Z"
          fill="#10b981"
          opacity="0.3"
        />
        
        {/* Main roof silhouette */}
        <path
          d="M20 55 L50 25 L80 55 L80 75 L20 75 Z"
          fill="#0194f3"
        />
        
        {/* Villa windows */}
        <rect x="35" y="60" width="12" height="10" fill="white" opacity="0.8" />
        <rect x="53" y="60" width="12" height="10" fill="white" opacity="0.8" />
        
        {/* Door */}
        <rect x="42" y="70" width="16" height="5" fill="white" opacity="0.6" />
        
        {/* Price badge */}
        <circle cx="85" cy="15" r="12" fill="#10b981" />
        <text
          x="85"
          y="19"
          fontSize="10"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
        >
          %
        </text>
      </svg>
      
      <div className="flex flex-col">
        <span className="text-xl font-bold text-traveloka">
          VillaBatu
        </span>
        <span className="text-sm font-medium text-emerald-600">
          Murah.ID
        </span>
      </div>
    </div>
  )
}