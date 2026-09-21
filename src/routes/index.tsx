import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Star,
  Menu,
  X,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MessageCircle,
} from "lucide-react";
import bannerAsset from "@/assets/banner-henrique-juliano-itajai.png.asset.json";
const CAPA_EVENTO = bannerAsset.url;

const TITLE =
  "Pré-Venda - Henrique & Juliano em Itajaí/SC | Acesso Antecipado";
const DESCRIPTION =
  "Pré-venda exclusiva - Henrique & Juliano em Itajaí/SC, dia 16 de Outubro de 2026 no Centreventos. Garanta seu ingresso!";

const WHATSAPP_GROUP = "https://chat.whatsapp.com/LLHhHWpW3ve5vOK1plEExa?mode=hqrc";
const TARGET_DATE = new Date("2026-09-09T15:00:00Z"); // 12h BRT

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
    scripts: [
      {
        type: "text/javascript",
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1064883003190898');fbq('track', 'PageView');`,
      },
    ],
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

  const left = now === null ? 0 : TARGET_DATE.getTime() - now;
  const diff = Math.max(left, 0);
  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    expired: now !== null && left <= 0,
    days: pad(Math.floor(diff / 86400000)),
    hours: pad(Math.floor((diff % 86400000) / 3600000)),
    minutes: pad(Math.floor((diff % 3600000) / 60000)),
    seconds: pad(Math.floor((diff % 60000) / 1000)),
  };
}

function goToGroup() {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "Lead");
  }
  window.open(WHATSAPP_GROUP, "_blank");
}

function MetaPixelNoScript() {
  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=1064883003190898&ev=PageView&noscript=1"
        alt=""
      />
    </noscript>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const NAV_LINKS = [
  { label: "Início", id: "top" },
  { label: "Vantagens", id: "benefits" },
  { label: "Evento", id: "info" },
  { label: "Garantir", id: "cta" },
];

function VipButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      onClick={goToGroup}
      className="inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-[#39b54a] to-[#2e8b3e] px-8 py-4 text-lg font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:from-[#2e8b3e] hover:to-[#39b54a] hover:shadow-[0_5px_15px_rgba(57,181,74,0.3)]"
    >
      <MessageCircle className="h-5 w-5" />
      {children}
    </button>
  );
}

function CountdownBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-[80px] rounded-lg bg-[#39b54a] p-4 text-white">
      <div className="text-3xl font-black">{value}</div>
      <div className="mt-1 text-xs uppercase text-green-100">{label}</div>
    </div>
  );
}

const BENEFITS = [
  {
    title: "🎯 ACESSO ANTECIPADO",
    text: "Compre seus ingressos antes da venda geral, garantindo os melhores lugares",
  },
  {
    title: "💰 PREÇO DE PRÉ-VENDA",
    text: "Valores exclusivos da pré-venda, mais baixos que a venda geral",
  },
  {
    title: "🔔 NOTIFICAÇÃO IMEDIATA",
    text: "Seja avisado na hora que os ingressos forem liberados",
  },
  {
    title: "🎁 BÔNUS EXCLUSIVOS",
    text: "Os 15 primeiros a garantir o ingresso ganharão uma foto com o Henrique & Juliano no camarim e um copo oficial do evento autografado pelos artistas.",
  },
];

function Index() {
  const c = useCountdown();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans">
      <MetaPixelNoScript />
      {/* HEADER */}
      <header className="fixed top-0 z-50 h-[76px] w-full border-b-4 border-[#39b54a] bg-black text-white shadow-lg">
        <div className="container mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav("top"); }}>
            <img
              src="https://s3.guicheweb.com.br/nova_marca/logogw.png"
              alt="Guichê Web"
              className="h-8 md:h-10"
            />
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium uppercase lg:flex">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                className="transition hover:text-[#39b54a]"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={goToGroup}
              className="rounded bg-[#39b54a] px-6 py-2 font-bold text-white transition hover:bg-green-600"
            >
              ENTRAR
            </button>
          </nav>
          <button
            className="text-2xl lg:hidden"
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        {menuOpen && (
          <div className="absolute top-[76px] left-0 w-full border-b-4 border-[#39b54a] bg-black px-4 py-4 shadow-lg lg:hidden">
            <nav className="flex flex-col gap-4 text-sm font-medium uppercase">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleNav(l.id)}
                  className="text-left transition hover:text-[#39b54a]"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => { setMenuOpen(false); goToGroup(); }}
                className="rounded bg-[#39b54a] px-6 py-2 font-bold text-white transition hover:bg-green-600"
              >
                ENTRAR
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* BANNER */}
      <section id="top" className="relative mt-20">
        <img
          src={CAPA_EVENTO}
          alt="Henrique & Juliano - Itajaí/SC"
          className="block w-full bg-[#e8e8e8] object-contain"
        />
        <div className="absolute bottom-[-1px] left-0 w-full rotate-180 overflow-hidden leading-[0]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block h-[60px] w-[calc(100%+1.3px)]"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#f4f4f4"
            />
          </svg>
        </div>
      </section>

      <main className="container relative z-10 mx-auto -mt-24 max-w-6xl px-4 pb-20">
        {/* HEADLINE */}
        <div className="mb-8 overflow-hidden rounded-lg bg-white p-8 text-center shadow-lg">
          <div className="mb-4 inline-block rounded-[20px] bg-[#e74c3c] px-4 py-2 text-sm font-bold text-white">
            {c.expired
              ? "🔥 PRÉ-VENDA ABERTA! 🔥"
              : "🔥 PRÉ-VENDA EXCLUSIVA DIA 09/09 ÀS 12H! 🔥"}
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            GARANTA SEU INGRESSO NA <span className="text-[#39b54a]">PRÉ-VENDA</span>
            <br />
            HENRIQUE &amp; JULIANO - ITAJAÍ/SC
          </h1>

          <p className="mb-6 text-lg text-gray-600">
            Entre para o <strong>Grupo VIP</strong> e tenha acesso antecipado aos ingressos
            <br />
            antes da venda geral!
          </p>

          <VipButton>ENTRAR NO GRUPO VIP</VipButton>

          <div className="mt-6 flex justify-center gap-4">
            <CountdownBox value={c.days} label="Dias" />
            <CountdownBox value={c.hours} label="Horas" />
            <CountdownBox value={c.minutes} label="Min" />
            <CountdownBox value={c.seconds} label="Seg" />
          </div>
        </div>

        {/* BENEFÍCIOS */}
        <div id="benefits" className="mb-8 scroll-mt-24 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            ✨ VANTAGENS DO GRUPO VIP
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="mb-[15px] rounded-lg border-l-4 border-[#39b54a] bg-white p-5 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-bold text-gray-800">{b.title}</h3>
                <p className="text-gray-600">{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* INFORMAÇÕES DO EVENTO */}
        <div id="info" className="mb-8 scroll-mt-24 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            📍 INFORMAÇÕES DO EVENTO
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="text-center">
              <img
                src={CAPA_EVENTO}
                alt="Henrique & Juliano - Itajaí/SC"
                className="mx-auto w-full max-w-sm rounded-lg shadow-md"
              />
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-3 text-xl font-bold text-[#39b54a]">
                  🎙 Henrique &amp; Juliano em Itajaí
                </h3>

                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center">
                    <Calendar className="mr-3 h-4 w-4 text-[#39b54a]" />
                    <strong>Data:</strong>&nbsp;16 de Outubro de 2026 (Sexta-feira)
                  </p>
                  <p className="flex items-center">
                    <MapPin className="mr-3 h-4 w-4 shrink-0 text-[#39b54a]" />
                    <strong>Local:</strong>&nbsp;Centreventos - Itajaí/SC
                  </p>
                  <p className="flex items-center">
                    <Clock className="mr-3 h-4 w-4 text-[#39b54a]" />
                    <strong>Horário:</strong>&nbsp;A partir das 20:00
                  </p>
                  <p className="flex items-center">
                    <Star className="mr-3 h-4 w-4 text-[#39b54a]" />
                    <strong>Classificação:</strong>&nbsp;Livre
                  </p>
                </div>
              </div>

              <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
                <p className="text-center font-bold text-green-700">
                  🎉 <strong>PRÉ-VENDA DIA 09/09 ÀS 12H!</strong>
                  <br />
                  Garanta seu ingresso antes de todo mundo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA FINAL */}
        <div id="cta" className="mb-8 scroll-mt-24 rounded-lg bg-white p-8 text-center shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            NÃO DEIXE PARA A ÚLTIMA HORA!
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            A <strong className="text-[#39b54a]">PRÉ-VENDA</strong> é por tempo limitado.
            <br />
            Entre no <strong>Grupo VIP</strong> e garanta seu ingresso com preço exclusivo!
          </p>
          <VipButton>ENTRAR NO GRUPO VIP AGORA</VipButton>
          <p className="mt-4 text-sm text-gray-500">
            ⏰ Vagas limitadas no grupo - Garanta sua vaga!
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black py-12 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <img
                src="https://s3.guicheweb.com.br/nova_marca/logogw.png"
                alt="Guichê Web"
                className="mb-4 h-10"
              />
              <p className="text-gray-400">
                Guichê Web Comercialização de Ingressos Ltda
                <br />
                CNPJ: 18.797.249/0001-35
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-bold">LINKS ÚTEIS</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://guicheweb.octadesk.com/kb" className="transition hover:text-white">
                    Dúvidas Frequentes
                  </a>
                </li>
                <li>
                  <a
                    href="https://guicheweb.notion.site/Termos-Pol-ticas-b5713f88c432496a8cb3683da9be7dfd"
                    className="transition hover:text-white"
                  >
                    Termos e Políticas
                  </a>
                </li>
                <li>
                  <a href="https://abrape.com.br/" className="transition hover:text-white">
                    ABRAPE
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-bold">REDES SOCIAIS</h4>
              <div className="flex space-x-4 text-gray-400">
                <a href="https://www.facebook.com/GuicheWeb/" aria-label="Facebook" className="transition hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://instagr.am/guicheweb" aria-label="Instagram" className="transition hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UC9-7SFPICgrmnZRXhmpFVug"
                  aria-label="YouTube"
                  className="transition hover:text-white"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="https://twitter.com/guicheweb" aria-label="Twitter" className="transition hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://wa.me/5548999511111" aria-label="WhatsApp" className="transition hover:text-white">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Guichê Web. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
