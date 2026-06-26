import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="flex items-center justify-between pt-12 pb-4 px-1" id="header">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center shadow-lg shadow-red-500/30">
          <span className="font-outfit font-bold text-white text-base leading-none">A</span>
        </div>
        <span className="font-outfit font-semibold text-white text-[15px] tracking-wide">Alfa-Чаевые</span>
      </div>
      <div className="success-badge rounded-full px-3 py-1 flex items-center gap-1.5">
        <FontAwesomeIcon icon={faShieldHalved} className="text-brand-green text-[10px]" />
        <span className="font-figtree text-brand-green text-[11px] font-medium">Защищено</span>
      </div>
    </header>
  );
}
