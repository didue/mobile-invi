type SectionHeadingProps = {
  title: string;
  sub: readonly string[];
};

export function SectionHeading({ title, sub }: SectionHeadingProps) {
  return (
    <>
      <div className="section-title">{title}</div>
      {sub.length > 0 && (
        <div className="section-sub">
          {sub.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
