import type { Locale } from '@/i18n/messages';

type Faq = { q: string; a: string };

const nl: Faq[] = [
  {
    q: 'Wat als ik een mens in de keten wil?',
    a: 'Altijd jij. Een Techwiz pakt het volume aan; jij neemt de besluiten. Ik handel nooit zelf een betaling, contract of nieuwe hire af zonder jou. Alles wat risicovol is laat ik eerst in Telegram zien. Je kunt elk onderwerp markeren als "eerst vragen", dan beslis ik daar nooit zelfstandig over.',
  },
  {
    q: 'Hoe is dit anders dan ChatGPT?',
    a: 'ChatGPT vergeet alles na elk gesprek. Een Techwiz heeft persistent geheugen, connect met jouw tools en acteert namens jou 24/7 - zonder dat je hem hoeft te prompten. Hij start de dag met een briefing en sluit af met een wrap-up.',
  },
  {
    q: 'Hoe lang duurt setup?',
    a: 'Instant Appie: 24 uur, wij doen het. Bouw zelf je Techwiz (€65 PDF gids): paar uur eigen werk.',
  },
  {
    q: 'Hoe veilig is mijn data?',
    a: 'Volledig. Je Techwiz draait op een dedicated private server. Je gesprekken en data trainen nooit een publiek model. Enterprise-grade security, persoonlijke aandacht.',
  },
  {
    q: 'Wat als Appie iets verkeerd doet?',
    a: 'Dan zegt-ie het. Eerlijk, kort, met wat-ik-nu-doe. Reversibele dingen lost ik zelf op; bij iets onomkeerbaars vraag ik vooraf. En ik leer ervan: dezelfde fout een tweede keer is een bug, niet een mens.',
  },
  {
    q: 'Kan ik na maand 1 stoppen?',
    a: 'Ja. Geen lock-in. Ik draai op jouw private server, jouw data blijft van jou. Tevreden of geld terug - als ik je niet meer tijd bespaar dan ik kost, betaal je niets.',
  },
];

const en: Faq[] = [
  {
    q: 'What if I want a human in the loop?',
    a: 'Always you. A Techwiz handles the volume; you make the decisions. I never settle a payment, contract or new hire without you. Anything risky I show in Telegram first. You can flag any topic as "ask first" and I will never decide on it alone.',
  },
  {
    q: 'How is this different from ChatGPT?',
    a: 'ChatGPT forgets everything after each chat. A Techwiz has persistent memory, connects to your tools, and acts on your behalf 24/7 without you having to prompt him. He starts the day with a briefing and closes it with a wrap-up.',
  },
  {
    q: 'How long does setup take?',
    a: 'Instant Appie: 24 hours, we do it. Build your own (€65 PDF guide): a few hours of your own work.',
  },
  {
    q: 'How secure is my data?',
    a: 'Fully. Your Techwiz runs on a dedicated private server. Your conversations and data never train a public model. Enterprise-grade security, personal attention.',
  },
  {
    q: 'What if Appie gets something wrong?',
    a: 'Then he says so. Honest, short, with what-I-am-doing-now. Reversible things I fix myself; for irreversible things I ask first. And I learn from it: the same mistake twice is a bug, not a person.',
  },
  {
    q: 'Can I cancel after month 1?',
    a: 'Yes. No lock-in. I run on your private server, your data stays yours. Money-back guarantee: if I do not save you more time than I cost, you pay nothing.',
  },
];

export const FAQS_BY_LOCALE: Record<Locale, Faq[]> = { nl, en };

// Back-compat shim for any importers still using FAQS — defaults to NL.
export const FAQS: Faq[] = nl;
