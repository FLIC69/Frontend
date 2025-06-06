import React from 'react';

interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  error,
  autoComplete
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="text-error-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`input-field ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
        autoComplete={autoComplete}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default InputField;