'use client';

// Linear-style tall input with floating label, backdrop blur, gold focus ring.
// Works for input and textarea via the `multiline` flag.

import { useId, useState } from 'react';

type BaseProps = {
  label: string;
  hint?: string;
  error?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  testId?: string;
};

type InputProps = BaseProps & {
  multiline?: false;
  type?: 'text' | 'email';
  inputMode?: 'text' | 'email' | 'tel';
};

type TextareaProps = BaseProps & {
  multiline: true;
  rows?: number;
};

type Props = InputProps | TextareaProps;

export default function FloatingInput(props: Props) {
  const { label, hint, error, value, onChange, placeholder, autoFocus, testId } = props;
  const id = useId();
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;
  const baseClass =
    'peer w-full rounded-2xl border bg-white/[0.04] px-4 pb-3 pt-7 text-base text-white outline-none ring-0 backdrop-blur-xl transition placeholder:text-white/25 focus:bg-white/[0.06]';
  const borderClass = error
    ? 'border-[#FF9C92]/60 focus:border-[#FF9C92]'
    : focused
    ? 'border-[#DFB771]'
    : 'border-white/10 hover:border-white/20';

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 z-10 origin-top-left transition-all ${
          isFloating
            ? 'top-2 text-[10px] uppercase tracking-[0.18em] text-[#DFB771]'
            : 'top-1/2 -translate-y-1/2 text-sm text-white/55'
        }`}
      >
        {label}
      </label>
      {props.multiline ? (
        <textarea
          id={id}
          rows={props.rows ?? 4}
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={isFloating ? placeholder : ''}
          className={`${baseClass} ${borderClass} resize-none`}
          data-testid={testId}
        />
      ) : (
        <input
          id={id}
          type={props.type ?? 'text'}
          inputMode={props.inputMode}
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={isFloating ? placeholder : ''}
          className={`${baseClass} ${borderClass} h-14`}
          data-testid={testId}
        />
      )}
      {error ? (
        <p className="mt-2 pl-1 text-xs text-[#FF9C92]">{error}</p>
      ) : hint ? (
        <p className="mt-2 pl-1 text-xs text-white/45">{hint}</p>
      ) : null}
    </div>
  );
}
