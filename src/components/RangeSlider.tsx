import React from 'react';

interface RangeSliderProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <span className="text-sm font-medium text-gray-700">
          {value}{unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="slider-track"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
};

export default RangeSlider;