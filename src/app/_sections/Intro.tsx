import { COUPLE, CONTACTS } from "@/data/family";
import { formatParentName, formatRel } from "@/lib/family";

export const Intro = () => {

  return (
    <section className="px-4 py-16 text-center leading-relaxed text-neutral-700">
      <p className="intro-box">
        
        {`${formatParentName(CONTACTS.groom, "father")} · ${formatParentName(CONTACTS.groom, "mother")} `}
        <span>의 {formatRel(CONTACTS.groom, 'groom')}</span> {COUPLE.groom.name}
        <br />
        {`${formatParentName(CONTACTS.bride, "father")} · ${formatParentName(CONTACTS.bride, "mother")} `}
        <span>의 {formatRel(CONTACTS.bride, 'bride')}</span> {COUPLE.bride.name}
      </p>
      <p className="mt-6">두 사람이 새로운 시작을 함께합니다.</p>
    </section>
  );
};
