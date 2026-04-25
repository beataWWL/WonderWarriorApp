import Image from "next/image";
import Link from "next/link";

const SUBSTACK_URL = "https://substack.com/@thewonderwarrior";
const SUBSTACK_DISPLAY = "substack.com/@thewonderwarrior";

export default function CommunityPage() {
  return (
    <main className="max-w-[960px] mx-auto px-6 pt-16 pb-24">
      <header className="text-center mb-12">
        <p className="font-label font-semibold text-ember text-[0.75rem] uppercase tracking-[0.4em] mb-3">
          The Journey Continues
        </p>
        <h1 className="font-display brand-gradient text-[clamp(2rem,4.5vw,3rem)] leading-[1.2] mb-5">
          Join the Wonder Warrior Community
        </h1>
        <p className="font-serif italic text-muted text-[1.15rem] leading-[1.7] max-w-[640px] mx-auto">
          The seven Practices are a beginning, not an end. Come keep practicing
          with me on Substack — short letters from my own life, the questions
          I&rsquo;m living with, and an ongoing conversation with other Wonder
          Warriors finding their way.
        </p>
      </header>

      <section className="grid gap-10 md:grid-cols-[auto,1fr] md:items-center max-w-[820px] mx-auto">
        <BrandedQrCard />

        <div className="text-center md:text-left">
          <p className="font-label font-semibold text-lightning text-[0.72rem] uppercase tracking-[0.4em] mb-3">
            Two ways in
          </p>
          <h2 className="font-display text-clarity text-[1.4rem] leading-snug mb-4">
            Scan or tap to subscribe
          </h2>
          <p className="font-serif italic text-muted text-[1rem] leading-[1.7] mb-6">
            Point your phone&rsquo;s camera at the code, or open the link
            below. Subscribing is free; paid tiers support the work and unlock
            the full archive.
          </p>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-flame inline-block font-label font-bold uppercase tracking-[0.3em] text-[0.78rem] text-white px-9 py-3.5 rounded-full transition hover:opacity-90"
          >
            Open the Substack →
          </a>
          <p className="font-body text-muted text-[0.85rem] mt-4 break-all">
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noreferrer"
              className="text-lightning hover:text-ember transition"
            >
              {SUBSTACK_DISPLAY}
            </a>
          </p>
        </div>
      </section>

      <section className="mt-16 max-w-[640px] mx-auto text-center">
        <p className="font-serif italic text-muted text-[1.05rem] leading-[1.8]">
          However you arrived here — keep going. Practice. Notice. Ask. Wonder
          finds you when you stop looking for it elsewhere.
        </p>
      </section>

      <div className="flex justify-center mt-12">
        <Link
          href="/"
          className="font-label font-semibold uppercase tracking-[0.3em] text-[0.75rem] text-lightning px-8 py-3 rounded-full border border-lightning/40 transition hover:bg-lightning/8 hover:border-lightning hover:shadow-[0_0_20px_rgba(0,212,255,0.25)]"
        >
          ← Return to Home
        </Link>
      </div>
    </main>
  );
}

/**
 * Recreates the branded QR card from wonderwarrior_qr_branded_1.html.
 * Cyan top-left + bottom-right corner brackets, flame top-right + bottom-left.
 * Two divider rules with a small diamond between, framing the QR.
 * Centered "The Wonder Warrior" overlay sits on top of the high-EC QR.
 */
function BrandedQrCard() {
  return (
    <div
      className="relative w-[340px] mx-auto bg-deep-ocean border border-edge p-9 pt-11"
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,107,26,0.08), 0 0 60px rgba(0,212,255,0.07), 0 0 40px rgba(255,107,26,0.05), 0 24px 64px rgba(0,0,0,0.5)",
      }}
    >
      {/* Cyan brackets — top-left and bottom-right */}
      <span className="absolute top-2.5 left-2.5 w-5 h-5 border-t border-l border-lightning opacity-40" />
      <span className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b border-r border-lightning opacity-40" />
      {/* Flame brackets — top-right and bottom-left */}
      <span className="absolute top-2.5 right-2.5 w-5 h-5 border-t border-r border-flame opacity-40" />
      <span className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b border-l border-flame opacity-40" />

      <p className="font-label font-semibold text-ember text-center text-[0.625rem] uppercase tracking-[0.4em] mb-4">
        Scan to Subscribe
      </p>

      <Divider />

      <div className="flex justify-center mb-5">
        <div
          className="relative bg-clarity p-3.5 border border-lightning/20"
          style={{
            boxShadow:
              "0 0 30px rgba(0,212,255,0.1), 0 0 15px rgba(255,107,26,0.08)",
          }}
        >
          <Image
            src="/wonder-warrior-qr.png"
            alt={`QR code linking to ${SUBSTACK_DISPLAY}`}
            width={220}
            height={220}
            priority
          />
          <div
            className="absolute top-1/2 left-1/2 bg-clarity px-2 py-1 text-center leading-tight pointer-events-none"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <span className="block font-display font-bold text-abyss text-[0.625rem] tracking-[0.03em]">
              The Wonder
            </span>
            <span className="block font-display font-bold text-abyss text-[0.625rem] tracking-[0.03em]">
              Warrior
            </span>
          </div>
        </div>
      </div>

      <Divider />

      <div className="text-center mt-5">
        <h3 className="font-display brand-gradient text-[1.6rem] leading-tight mb-2">
          The Wonder
          <br />
          Warrior
        </h3>
        <p
          className="font-serif italic text-[0.8rem] tracking-[0.1em] mb-5"
          style={{ color: "rgba(0,212,255,0.5)" }}
        >
          On Substack
        </p>
        <span
          className="btn-flame inline-block font-label font-semibold text-white text-[0.625rem] tracking-[0.3em] uppercase px-7 py-2.5 rounded-full"
        >
          Read &amp; Subscribe
        </span>
      </div>

      <div className="text-center mt-6">
        <span className="inline-block w-1 h-1 rounded-full bg-lightning mx-1.5 align-middle" style={{ boxShadow: "0 0 6px var(--color-lightning)" }} />
        <span className="inline-block w-1 h-1 rounded-full bg-flame mx-1.5 align-middle" style={{ boxShadow: "0 0 6px var(--color-flame)" }} />
        <span className="inline-block w-1 h-1 rounded-full bg-lightning mx-1.5 align-middle" style={{ boxShadow: "0 0 6px var(--color-lightning)" }} />
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,212,255,0.4), transparent)",
        }}
      />
      <span
        className="w-[5px] h-[5px] flex-shrink-0"
        style={{
          background:
            "linear-gradient(135deg, var(--color-lightning), var(--color-flame))",
          transform: "rotate(45deg)",
        }}
      />
      <span
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,212,255,0.4), transparent)",
        }}
      />
    </div>
  );
}
