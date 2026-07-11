import { COUPLE } from "@/data/wedding";

export const Intro = () => {
  return (
    <section className="px-8 py-16 text-center leading-relaxed text-neutral-700">
      <p>
        {COUPLE.groom.rel.replace("\n", " ")} {COUPLE.groom.name}
        <br />
        {COUPLE.bride.rel.replace("\n", " ")} {COUPLE.bride.name}
      </p>
      <p className="mt-6">두 사람이 새로운 시작을 함께합니다.</p>
    </section>
  );
};
