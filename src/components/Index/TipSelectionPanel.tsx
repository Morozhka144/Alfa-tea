import { useState, useRef } from 'react';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faApplePay, faGooglePay } from '@fortawesome/free-brands-svg-icons';

const BILL_AMOUNT = 3400;

const CHIPS = [
  { label: '5%', percent: 5 },
  { label: '10%', percent: 10 },
  { label: '15%', percent: 15 },
  { label: '20%', percent: 20 },
  { label: 'Своя', percent: 'custom' as const },
];

interface TipSelectionPanelProps {
  onPay: (amount: number) => void;
}

export default function TipSelectionPanel({ onPay }: TipSelectionPanelProps) {
  const [tipAmount, setTipAmount] = useState<string>('340');
  const [activeChip, setActiveChip] = useState<number | 'custom'>(10);
  const [percentLabel, setPercentLabel] = useState<string>('10% от суммы счёта');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChipClick = (percent: number | 'custom') => {
    setActiveChip(percent);
    if (percent !== 'custom') {
      const calculated = Math.round(BILL_AMOUNT * (percent as number) / 100);
      setTipAmount(String(calculated));
      setPercentLabel(`${percent}% от суммы счёта`);
    } else {
      setTipAmount('');
      setPercentLabel('Введите свою сумму');
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setTipAmount(raw);
    const val = parseInt(raw) || 0;
    const autoPercent = BILL_AMOUNT > 0 ? Math.round((val / BILL_AMOUNT) * 100) : 0;

    const matchingChip = CHIPS.find(c => c.percent !== 'custom' && c.percent === autoPercent);

    if (matchingChip) {
      setActiveChip(matchingChip.percent as number);
      setPercentLabel(`${autoPercent}% от суммы счёта`);
    } else {
      setActiveChip('custom');
      setPercentLabel(val > 0 ? `${autoPercent}% от суммы счёта` : 'Введите свою сумму');
    }
  };

  const tipValue = parseInt(tipAmount) || 0;
  const payLabel = tipValue > 0 ? `Оплатить ${tipValue} ₽` : 'Оплатить';

  return (
    <div className="glass-card rounded-3xl px-5 pt-6 pb-5 flex flex-col gap-5" id="tip-card">
      {/* Bill Info */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-figtree text-white/55 text-[11px] uppercase tracking-widest mb-0.5">Сумма счёта</p>
          <p className="font-outfit text-white text-2xl font-semibold">3 400 <span className="text-lg text-white/70">₽</span></p>
        </div>
        <div className="text-right">
          <p className="font-figtree text-white/55 text-[11px] uppercase tracking-widest mb-0.5">Столик</p>
          <p className="font-outfit text-white text-2xl font-semibold">№ 7</p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/15"></div>

      {/* Tip Amount Display */}
      <div className="flex flex-col gap-1">
        <p className="font-figtree text-white/55 text-[11px] uppercase tracking-widest">Сумма чаевых</p>
        <div className="flex items-end gap-2">
          <input
            ref={inputRef}
            aria-label="Сумма чаевых"
            className="amount-input font-outfit text-4xl font-light text-white w-full pb-1 placeholder:text-white/30"
            id="tip-amount-input"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="0"
            type="number"
            value={tipAmount}
            onChange={handleInputChange}
          />
          <span className="font-outfit text-3xl text-white/50 pb-1.5 flex-shrink-0">₽</span>
        </div>
        <p className="font-figtree text-brand-green text-[12px] font-medium mt-0.5" id="tip-percent-label">{percentLabel}</p>
      </div>

      {/* Percentage Chips */}
      <div className="flex gap-2 overflow-x-auto scroll-snap-x pb-1 -mx-1 px-1" id="chip-row">
        {CHIPS.map((chip) => (
          <button
            key={chip.label}
            className={`tip-chip snap-start flex-shrink-0 rounded-full px-4 py-2.5 font-outfit font-medium text-white text-sm min-w-[56px] text-center${activeChip === chip.percent ? ' active' : ''}`}
            data-percent={chip.percent}
            onClick={() => handleChipClick(chip.percent)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/15"></div>

      {/* Pay Button */}
      <button
        className="primary-btn w-full rounded-2xl py-4 flex items-center justify-center gap-3 min-h-[56px]"
        id="pay-btn"
        onClick={() => onPay(tipValue)}
      >
        <FontAwesomeIcon icon={faBolt} className="text-white text-base" />
        <span className="font-outfit font-semibold text-white text-[16px] tracking-wide">{payLabel}</span>
      </button>

      {/* Payment Methods */}
      <div className="flex items-center justify-center gap-3 -mt-1">
        <div className="flex items-center gap-1.5 text-white/40">
          <FontAwesomeIcon icon={faApplePay} className="text-xl" />
        </div>
        <div className="w-px h-3 bg-white/20"></div>
        <div className="flex items-center gap-1.5 text-white/40">
          <FontAwesomeIcon icon={faGooglePay} className="text-xl" />
        </div>
        <div className="w-px h-3 bg-white/20"></div>
        <div className="flex items-center gap-1.5 text-white/40">
          <FontAwesomeIcon icon={faCreditCard} className="text-sm" />
          <span className="font-figtree text-[11px]">Карта</span>
        </div>
      </div>
    </div>
  );
}
