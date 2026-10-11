import { ContactButton } from "@/app/_sections/ContactButton";
import { SectionHeading } from "@/components/common/SectionHeading";
import { COUPLE, CONTACTS } from "@/data/family";
import { INVITATION_MESSAGE, SECTION_TEXTS } from "@/data/wedding";
import { formatGivenName, formatParentName, formatRel } from "@/lib/familyFormat";

export const Intro = () => {
  return (
    <section className="px-4 py-16 text-center leading-relaxed text-[var(--ink-hard)]">
      <SectionHeading {...SECTION_TEXTS.intro} />
      <div className="invitation-msg">
        <p>
          {INVITATION_MESSAGE.acrostic.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              <b>{line.charAt(0)}</b>
              {line.slice(1)}
            </span>
          ))}
        </p>
        <p>
          {INVITATION_MESSAGE.closing.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>
      <div className="intro-box">
        <p className="intro-parents groom">
          {`${formatParentName(CONTACTS.groom, "father")} · ${formatParentName(CONTACTS.groom, "mother")} `}
          <span>의 {formatRel(CONTACTS.groom, "groom")}</span>
        </p>
        <p className="intro-parents bride">
          {`${formatParentName(CONTACTS.bride, "father")} · ${formatParentName(CONTACTS.bride, "mother")} `}
          <span>의 {formatRel(CONTACTS.bride, "bride")}</span>
        </p>
        <p className="intro-name groom">{formatGivenName(COUPLE.groom.name)}</p>
        <p className="intro-amp" aria-hidden="true">&amp;</p>
        <p className="intro-name bride">{formatGivenName(COUPLE.bride.name)}</p>
      </div>
      <ContactButton />
    </section>
  );
};
