import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarDays, Clock3, MapPin, Menu, MessageCircle, X, ArrowUpRight, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import capaAsset from "@/assets/luan-santana-foz.png.asset.json";

const TITLE = "Luan Santana — Além do Registro em Foz do Iguaçu | Pré-venda";
const DESCRIPTION = "Luan Santana — Além do Registro, 12 de dezembro de 2026, no Estádio do ABC em Foz do Iguaçu/PR. Pré-venda em 06/10 às 12h.";
const WHATSAPP_GROUP = "https://chat.whatsapp.com/EaJ5XHfEp2YKj4ty6TBDoy?mode=hqrc";
const PRESALE_DATE = new Date("2026-10-06T15:00:00Z"); // 12h em Foz do Iguaçu (UTC-3)

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "text/javascript",
      children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1457176332895478');fbq('track', 'PageView');`,
    }],
  }),
  component: Index,
});

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = Math.max(PRESALE_DATE.getTime() - (now ?? PRESALE_DATE.getTime()), 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    started: now !== null && now >= PRESALE_DATE.getTime(),
    days: pad(Math.floor(remaining / 86400000)),
    hours: pad(Math.floor((remaining % 86400000) / 3600000)),
    minutes: pad(Math.floor((remaining % 3600000) / 60000)),
    seconds: pad(Math.floor((remaining % 60000) / 1000)),
  };
}

function goToGroup() {
  if (typeof window !== "undefined") {
    const pixel = (window as Window & { fbq?: (...args: string[]) => void }).fbq;
    pixel?.("track", "Lead");
    window.open(WHATSAPP_GROUP, "_blank", "noopener,noreferrer");
  }
}

function VipButton({ children }: { children: React.ReactNode }) {
  return (
    <Button onClick={goToGroup} size="lg" className="h-auto min-h-14 w-full max-w-sm whitespace-normal bg-event-lime px-6 py-3 text-center text-base font-bold text-event-ink hover:bg-event-lime/85 sm:w-auto">
      <MessageCircle aria-hidden="true" />{children}<ArrowUpRight aria-hidden="true" />
    </Button>
  );
}

function Index() {
  const countdown = useCountdown();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const links = [{ label: "Início", id: "inicio" }, { label: "O show", id: "evento" }, { label: "Pré-venda", id: "pre-venda" }];

  return (
    <div className="min-h-screen bg-event-ink font-sans text-event-light">
      <noscript><img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1457176332895478&ev=PageView&noscript=1" alt="" /></noscript>
      <header className="sticky top-0 z-50 border-b border-event-line bg-event-ink/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <Button variant="ghost" onClick={() => scrollTo("inicio")} className="h-auto px-0 text-left text-base font-black uppercase text-event-light hover:bg-transparent hover:text-event-lime">
            Luan Santana <span className="hidden font-normal text-event-muted sm:inline">/ Além do Registro</span>
          </Button>
          <nav aria-label="Navegação principal" className="hidden items-center gap-2 md:flex">
            {links.map(link => <Button key={link.id} variant="ghost" onClick={() => scrollTo(link.id)} className="text-event-muted hover:bg-event-surface hover:text-event-light">{link.label}</Button>)}
            <Button onClick={goToGroup} className="ml-3 bg-event-lime font-bold text-event-ink hover:bg-event-lime/85">Grupo VIP <ArrowUpRight aria-hidden="true" /></Button>
          </nav>
          <Button variant="ghost" size="icon" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="text-event-light hover:bg-event-surface hover:text-event-light md:hidden">
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
        {menuOpen && <nav aria-label="Navegação móvel" className="flex flex-col gap-1 border-t border-event-line px-5 py-3 md:hidden">
          {links.map(link => <Button key={link.id} variant="ghost" onClick={() => scrollTo(link.id)} className="justify-start text-event-light hover:bg-event-surface hover:text-event-light">{link.label}</Button>)}
          <Button onClick={() => { setMenuOpen(false); goToGroup(); }} className="mt-2 bg-event-lime text-event-ink hover:bg-event-lime/85">Entrar no grupo VIP</Button>
        </nav>}
      </header>

      <main>
        <section id="inicio" className="scroll-mt-20 border-b border-event-line">
          <div className="relative mx-auto flex min-h-[340px] max-h-[620px] justify-center overflow-hidden bg-event-surface sm:min-h-[480px]">
            <img src={capaAsset.url} alt="Flyer oficial de Luan Santana — Além do Registro, 12 de dezembro, Estádio do ABC, Foz do Iguaçu" className="h-auto max-h-[620px] w-full object-contain" fetchPriority="high" />
          </div>
          <div className="mx-auto max-w-6xl px-5 pb-14 pt-10 md:pb-20 md:pt-14">
            <p className="mb-4 text-sm font-bold uppercase text-event-lime">Foz do Iguaçu · 12 de dezembro</p>
            <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight md:text-6xl">Luan Santana <span className="block font-light normal-case text-event-muted">Além do Registro</span></h1>
            <p className="mt-5 max-w-2xl text-lg text-event-muted">Um encontro no Estádio do ABC. A pré-venda começa em 06/10, às 12h.</p>
            <div className="mt-8"><VipButton>Entrar no grupo VIP</VipButton></div>
          </div>
        </section>

        <section id="pre-venda" className="scroll-mt-20 border-b border-event-line bg-event-surface py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase text-event-lime">06 de outubro · 12h (horário de Brasília)</p>
              <h2 className="text-3xl font-black uppercase md:text-5xl">{countdown.started ? "Pré-venda iniciada" : "Falta pouco para a pré-venda"}</h2>
              <p className="mt-4 max-w-lg text-event-muted">Entre no grupo VIP para acompanhar as novidades sobre a pré-venda.</p>
            </div>
            {!countdown.started && <div aria-label="Contagem regressiva para a pré-venda" className="grid grid-cols-4 gap-2 sm:gap-3">
              {([ [countdown.days, "Dias"], [countdown.hours, "Horas"], [countdown.minutes, "Min"], [countdown.seconds, "Seg"] ] as const).map(([value, label]) => (
                <div key={label} className="flex h-20 w-[70px] flex-col items-center justify-center border border-event-line bg-event-ink sm:h-24 sm:w-20">
                  <span className="text-2xl font-black tabular-nums text-event-light sm:text-3xl">{value}</span>
                  <span className="mt-1 text-xs uppercase text-event-muted">{label}</span>
                </div>
              ))}
            </div>}
          </div>
        </section>

        <section id="evento" className="scroll-mt-20 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="mb-3 text-sm font-bold uppercase text-event-lime">O show</p>
            <h2 className="mb-10 text-3xl font-black uppercase md:text-5xl">Além do Registro</h2>
            <div className="grid gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:gap-16">
              <img src={capaAsset.url} alt="Capa do show Luan Santana — Além do Registro" className="w-full max-w-[360px] border border-event-line" loading="lazy" />
              <div className="self-center divide-y divide-event-line border-y border-event-line">
                <div className="flex gap-5 py-6"><CalendarDays className="mt-1 shrink-0 text-event-lime" aria-hidden="true" /><div><span className="text-xs font-bold uppercase text-event-muted">Data</span><p className="mt-1 text-xl font-semibold">12 de dezembro de 2026 · Sábado</p></div></div>
                <div className="flex gap-5 py-6"><MapPin className="mt-1 shrink-0 text-event-lime" aria-hidden="true" /><div><span className="text-xs font-bold uppercase text-event-muted">Local</span><p className="mt-1 text-xl font-semibold">Estádio do ABC</p><p className="text-event-muted">Foz do Iguaçu · PR</p></div></div>
                <div className="flex gap-5 py-6"><Clock3 className="mt-1 shrink-0 text-event-lime" aria-hidden="true" /><div><span className="text-xs font-bold uppercase text-event-muted">Pré-venda</span><p className="mt-1 text-xl font-semibold">06 de outubro · 12h</p><p className="text-event-muted">Horário de Brasília</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-event-line bg-event-surface py-16 text-center md:py-20">
          <div className="mx-auto max-w-2xl px-5">
            <p className="mb-3 text-sm font-bold uppercase text-event-lime">Luan Santana · Foz do Iguaçu</p>
            <h2 className="mb-5 text-3xl font-black uppercase md:text-5xl">Nos vemos no Estádio do ABC</h2>
            <p className="mb-8 text-event-muted">Acompanhe a pré-venda de 06/10 às 12h pelo grupo VIP.</p>
            <VipButton>Entrar no grupo VIP agora</VipButton>
          </div>
        </section>
      </main>

      <footer className="border-t border-event-line py-10 text-sm text-event-muted">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-5 md:flex-row">
          <div><p className="font-bold text-event-light">Guichê Web</p><p className="mt-2">Guichê Web Comercialização de Ingressos Ltda<br />CNPJ: 18.797.249/0001-35</p></div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="https://guicheweb.octadesk.com/kb" className="hover:text-event-light">Dúvidas Frequentes</a>
            <a href="https://guicheweb.notion.site/Termos-Pol-ticas-b5713f88c432496a8cb3683da9be7dfd" className="hover:text-event-light">Termos e Políticas</a>
            <a href="https://www.facebook.com/GuicheWeb/" aria-label="Facebook" className="hover:text-event-light"><Facebook className="size-5" /></a>
            <a href="https://instagr.am/guicheweb" aria-label="Instagram" className="hover:text-event-light"><Instagram className="size-5" /></a>
            <a href="https://www.youtube.com/channel/UC9-7SFPICgrmnZRXhmpFVug" aria-label="YouTube" className="hover:text-event-light"><Youtube className="size-5" /></a>
            <a href="https://twitter.com/guicheweb" aria-label="Twitter" className="hover:text-event-light"><Twitter className="size-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
