import { useTheme } from "../context/ThemeContext";

export default function SectionDivider() {
  const { isDark } = useTheme();
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div
        className={`h-px w-full ${
          isDark ? "bg-[#f2efeb]/8" : "bg-[#27272b]/8"
        }`}
      />
    </div>
  );
}
