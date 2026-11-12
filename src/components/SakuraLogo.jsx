const petal = "M0 -3 C-7 -6 -9 -12 -5 -17 C-3 -19 -1 -18 0 -15 C1 -18 3 -19 5 -17 C9 -12 7 -6 0 -3Z";
const letterR = "M18 32V3h14c7 0 10 4 10 10s-3 10-10 10H18m14 0 11 9";
const letterZ = "M61 3h25L61 32h25";

export default function SakuraLogo() {
  return (
    <svg className="brand-logo" viewBox="0 0 104 76" aria-hidden="true" focusable="false">
      <g className="brand-logo-flower" transform="translate(52 56)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <path key={angle} d={petal} transform={`rotate(${angle})`} />
        ))}
        <circle className="brand-logo-center" r="3.3" />
      </g>
      <g transform="translate(52 0) scale(1.3) translate(-52 0)">
        <g className="brand-logo-letter-halo">
          <path d={letterR} transform="translate(8 0)" />
          <path d={letterZ} transform="translate(-8 0)" />
        </g>
        <g className="brand-logo-letter">
          <path d={letterR} transform="translate(8 0)" />
          <path d={letterZ} transform="translate(-8 0)" />
        </g>
      </g>
    </svg>
  );
}
