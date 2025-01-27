import React from "react";

type ToggleSwitchProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        {/* Hidden input for state management */}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        {/* Toggle background */}
        <div
          className={`w-11 h-6 rounded-full transition-colors ${
            checked
              ? "bg-blue-600" // Active state
              : "bg-gray-200 dark:bg-gray-700" // Inactive state
          }`}
        ></div>
        {/* Toggle knob */}
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? "translate-x-5" : "translate-x-0" // Move knob to the right if checked
          }`}
        ></div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
