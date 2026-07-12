import { COUPLE, CONTACTS } from "@/data/wedding";
import { formatParentsRel } from "@/lib/family";

export const Intro = () => {
  return (
    <section className="px-8 py-16 text-center leading-relaxed text-neutral-700">
      <p>
        {formatParentsRel(CONTACTS.groom, "groom").replace("\n", " ")} {COUPLE.groom.name}
        <br />
        {formatParentsRel(CONTACTS.bride, "bride").replace("\n", " ")} {COUPLE.bride.name}
      </p>
      <p className="mt-6">두 사람이 새로운 시작을 함께합니다.</p>
    </section>
  );
};
