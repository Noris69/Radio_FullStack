import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconSrc?: string; // Make iconSrc optional by adding ?
  showPasswordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  iconSrc,
  showPasswordToggle,
}) => {
  return (
    <div className="flex gap-3 justify-between px-4 py-2 mt-4 w-full text-base leading-6 rounded-xl border border-solid border-slate-200 text-slate-400 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
      <div className="flex gap-3">
        {iconSrc && (
          <img
            loading="lazy"
            src={iconSrc}
            alt=""
            className="shrink-0 self-start w-6 aspect-square"
          />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="bg-transparent border-none outline-none"
        />
      </div>
      {showPasswordToggle && (
        <button type="button" aria-label="Toggle password visibility">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8490c271fc0d703731a997ca01fa3869cfb6b6c0be4302bc48656fe6e7c2b67?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
            alt=""
            className="shrink-0 self-start w-6 aspect-square "
          />
        </button>
      )}
    </div>
  );
};

export default InputField;
