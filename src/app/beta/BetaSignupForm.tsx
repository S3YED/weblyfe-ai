'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const USE_CASES = [
  'E-mail en inbox beheren',
  'Lead-opvolging en CRM',
  'Agendabeheer en afspraken',
  'Content en social media',
  'Financiele admin (facturen, herinneringen)',
  'Combinatie van bovenstaande',
] as const;

type FieldError = { field: string; message: string };

type FormState = {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message: string;
  fieldErrors: Record<string, string>;
};

const INITIAL_VALUES = {
  name: '',
  email: '',
  company: '',
  primary_use_case: '',
  telegram_handle: '',
  why_5_plekken: '',
} as const;

export default function BetaSignupForm() {
  const [values, setValues] = useState<Record<keyof typeof INITIAL_VALUES, string>>({
    ...INITIAL_VALUES,
  });
  const [state, setState] = useState<FormState>({
    status: 'idle',
    message: '',
    fieldErrors: {},
  });

  function update<K extends keyof typeof INITIAL_VALUES>(field: K, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setState((prev) => {
      if (!prev.fieldErrors[field]) return prev;
      const next = { ...prev.fieldErrors };
      delete next[field];
      return { ...prev, fieldErrors: next };
    });
  }

  function clientValidate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (values.name.trim().length < 2) errs.name = 'Vul je voor- en achternaam in.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      errs.email = 'Ongeldig e-mailadres.';
    if (values.company.trim().length < 2) errs.company = 'Bedrijfsnaam is verplicht.';
    if (!values.primary_use_case) errs.primary_use_case = 'Kies een use case.';
    const why = values.why_5_plekken.trim();
    if (why.length < 30 || why.length > 500)
      errs.why_5_plekken = 'Schrijf 30 tot 500 tekens.';
    return errs;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.status === 'submitting') return;

    const clientErrors = clientValidate();
    if (Object.keys(clientErrors).length > 0) {
      setState({
        status: 'error',
        message: 'Controleer de gemarkeerde velden.',
        fieldErrors: clientErrors,
      });
      return;
    }

    setState({ status: 'submitting', message: '', fieldErrors: {} });

    try {
      const res = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        errors?: FieldError[];
      };

      if (!res.ok || !data.success) {
        const fieldErrors: Record<string, string> = {};
        if (data.errors?.length) {
          for (const e of data.errors) fieldErrors[e.field] = e.message;
        }
        setState({
          status: 'error',
          message:
            data.message || 'Er ging iets mis. Stuur een e-mail naar seyed@weblyfe.nl.',
          fieldErrors,
        });
        return;
      }

      setState({
        status: 'success',
        message: 'Aanmelding ontvangen. Seyed neemt binnen 24u contact op.',
        fieldErrors: {},
      });
      setValues({ ...INITIAL_VALUES });
    } catch {
      setState({
        status: 'error',
        message: 'Er ging iets mis. Stuur een e-mail naar seyed@weblyfe.nl.',
        fieldErrors: {},
      });
    }
  }

  if (state.status === 'success') {
    return (
      <div className="rounded-3xl bg-[#1a2e27]/60 border border-[#DFB771]/40 p-8 md:p-12 text-center max-w-2xl mx-auto">
        <CheckCircle2 className="w-14 h-14 text-[#DFB771] mx-auto mb-4" />
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Aanmelding ontvangen.
        </h3>
        <p className="text-[#F6FEFC]/75 leading-relaxed">
          Seyed neemt persoonlijk binnen 24 uur contact met je op. Check je inbox voor
          de bevestigingsmail.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-xl bg-[#031D16]/60 border border-[#247459]/40 text-[#F6FEFC] placeholder-[#F6FEFC]/40 px-4 py-3 text-base focus:outline-none focus:border-[#DFB771] transition-colors';

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl mx-auto" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-2">
          Voornaam + achternaam
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          className={inputClass}
          aria-invalid={!!state.fieldErrors.name}
        />
        {state.fieldErrors.name && (
          <p className="text-red-400 text-xs mt-1">{state.fieldErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2">
          Jouw e-mailadres
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          className={inputClass}
          aria-invalid={!!state.fieldErrors.email}
        />
        {state.fieldErrors.email && (
          <p className="text-red-400 text-xs mt-1">{state.fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-semibold mb-2">
          Bedrijfsnaam
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          value={values.company}
          onChange={(e) => update('company', e.target.value)}
          className={inputClass}
          aria-invalid={!!state.fieldErrors.company}
        />
        {state.fieldErrors.company && (
          <p className="text-red-400 text-xs mt-1">{state.fieldErrors.company}</p>
        )}
      </div>

      <div>
        <label htmlFor="primary_use_case" className="block text-sm font-semibold mb-2">
          Waarvoor wil je Appie inzetten?
        </label>
        <select
          id="primary_use_case"
          name="primary_use_case"
          required
          value={values.primary_use_case}
          onChange={(e) => update('primary_use_case', e.target.value)}
          className={inputClass}
          aria-invalid={!!state.fieldErrors.primary_use_case}
        >
          <option value="" disabled>
            Kies een primaire use case
          </option>
          {USE_CASES.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {state.fieldErrors.primary_use_case && (
          <p className="text-red-400 text-xs mt-1">
            {state.fieldErrors.primary_use_case}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="telegram_handle" className="block text-sm font-semibold mb-2">
          Telegram-gebruikersnaam (optioneel)
        </label>
        <input
          id="telegram_handle"
          name="telegram_handle"
          type="text"
          placeholder="@jouw-handle"
          value={values.telegram_handle}
          onChange={(e) => update('telegram_handle', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="why_5_plekken" className="block text-sm font-semibold mb-2">
          Waarom wil jij een van de 5-10 beta-plekken?
        </label>
        <textarea
          id="why_5_plekken"
          name="why_5_plekken"
          required
          rows={4}
          maxLength={500}
          minLength={30}
          value={values.why_5_plekken}
          onChange={(e) => update('why_5_plekken', e.target.value)}
          className={inputClass}
          aria-invalid={!!state.fieldErrors.why_5_plekken}
        />
        <div className="flex justify-between mt-1 text-xs">
          <span className="text-red-400">
            {state.fieldErrors.why_5_plekken || ''}
          </span>
          <span className="text-[#F6FEFC]/50">
            {values.why_5_plekken.length}/500
          </span>
        </div>
      </div>

      {state.status === 'error' && state.message && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-200"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#FFD99A] disabled:opacity-60 disabled:cursor-not-allowed text-[#031D16] font-bold px-7 py-4 rounded-xl transition-colors"
      >
        {state.status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Versturen...
          </>
        ) : (
          'Verstuur aanmelding'
        )}
      </button>

      <p className="text-xs text-[#F6FEFC]/50 text-center">
        We bewaren je gegevens alleen voor de beta-aanmelding. Geen spam, geen
        nieuwsbrieven.
      </p>
    </form>
  );
}
