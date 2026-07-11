import { COUPLE, WEDDING_DATE } from "@/data/wedding";

const weddingDateLabel = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
}).format(WEDDING_DATE);

export const Header = () => {
  return (
    <section className="flex h-[36rem] w-full flex-col items-center justify-end gap-2 bg-neutral-200 pb-12 text-center">
      <p className="text-sm tracking-widest text-neutral-600">{weddingDateLabel}</p>
      <h1 className="text-2xl font-light text-neutral-800">
        {COUPLE.groom.name} <span className="mx-1">♥</span> {COUPLE.bride.name}
      </h1>
    </section>
  );
};
