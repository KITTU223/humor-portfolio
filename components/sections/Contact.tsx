import CopyEmail from "@/components/contact/CopyEmail";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/data/site";

const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Let's build something")}`;

const socials = [
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
  { label: "Résumé", href: site.links.resume },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 overflow-hidden bg-lime py-24 sm:py-36" aria-labelledby="contact-title">
      <div className="shell">
        <p className="annot mb-8">06 / Let&apos;s do business. Or something.</p>

        <h2 id="contact-title" className="text-mega" data-reveal="lines">
          <span className="line">
            <span>Got an idea?</span>
          </span>
          <span className="line">
            <span>
              I know a <span className="font-serif normal-case italic">guy.</span>
            </span>
          </span>
        </h2>
        <p className="punchline mt-6 text-3xl sm:text-4xl" data-reveal="joke">
          Unfortunately, that guy is me.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-lg text-xl leading-relaxed sm:text-2xl">
              Whether you need a website, mobile app, custom software, or something that doesn&apos;t exist yet,
              let&apos;s talk.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Magnetic>
                <a href={mailto} className="btn btn-primary min-h-16 px-8 text-base">
                  Let&apos;s build something <span aria-hidden="true">↗</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href={site.links.krutonic} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-16 px-8 text-base">
                  See Krutonic <span aria-hidden="true">↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-6">
            <CopyEmail email={site.email} />
            <ul className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn min-h-11 border-ink px-5 hover:bg-ink hover:text-lime"
                  >
                    {social.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="annot">Based in {site.location} · Working with clients anywhere with Wi-Fi.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
