import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface SuccessOverlayProps {
  visible: boolean;
  amount: number;
  onClose: () => void;
}

export default function SuccessOverlay({ visible, amount, onClose }: SuccessOverlayProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-8">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="glass-card relative rounded-3xl px-8 py-10 flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-1"
          style={{ background: 'rgba(89,188,146,0.2)', border: '1px solid rgba(89,188,146,0.5)' }}
        >
          <FontAwesomeIcon icon={faCheck} className="text-brand-green text-2xl" />
        </div>
        <h3 className="font-outfit font-semibold text-white text-2xl">Спасибо!</h3>
        <p className="font-figtree text-white/65 text-sm text-center leading-relaxed">
          Чаевые для <span className="text-white font-medium">Артёма</span> успешно отправлены.<br />Приятного вечера!
        </p>
        <div className="w-full h-px bg-white/15 my-1"></div>
        <p className="font-outfit text-white text-3xl font-light">{amount} <span className="text-xl text-white/60">₽</span></p>
        <button
          className="primary-btn w-full rounded-2xl py-3.5 mt-2"
          onClick={onClose}
        >
          <span className="font-outfit font-semibold text-white text-[15px]">Готово</span>
        </button>
      </div>
    </div>
  );
}
