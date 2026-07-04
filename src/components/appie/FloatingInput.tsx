'use client';

// Aetheris HUD input: darker-than-panel field with a bottom-only gold border
// that expands to the full perimeter on focus. Floating mono label, sharp 4px
// corners. Works for input and textarea via the `multiline` flag.

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

  // Base field: deepest surface, sharp corners, full thin border + bottom accent.
  const baseClass =
    'peer w-full rounded-sm bg-[#00110c]/80 px-4 pb-3 pt-7 text-base text-[#cce9dd] outline-none ring-0 backdrop-blur-xl transition placeholder:text-[#a2d0bf]/30 border border-b-2';
  const borderClass = error
    ? 'border-[#ffb4ab]/40 border-b-[#ffb4ab] focus:border-[#ffb4ab]'
    : focused
    ? 'border-[#dfb771] hud-glow-box'
    : 'border-[#a2d0bf]/12 border-b-[#dfb771]/40 hover:border-[#a2d0bf]/25';

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 z-10 origin-top-left transition-all ${
          isFloating
            ? 'top-2 hud-mono text-[10px] uppercase tracking-[0.2em] text-[#fdd38a]'
            : 'top-1/2 -translate-y-1/2 text-sm text-[#a2d0bf]/70'
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
        <p className="mt-2 pl-1 hud-mono text-xs text-[#ffb4ab]">{error}</p>
      ) : hint ? (
        <p className="mt-2 pl-1 text-xs text-[#a2d0bf]/50">{hint}</p>
      ) : null}
    </div>
  );
}
