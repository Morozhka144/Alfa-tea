import { useState } from 'react';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faAward } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

export default function ServerProfileCard() {
  const [rating, setRating] = useState(4);

  return (
    <div className="glass-card rounded-3xl px-5 py-5 flex items-center gap-4" id="server-card">
      {/* Avatar */}
      <div className="avatar-ring flex-shrink-0">
        <img
          alt="Артём"
          className="w-14 h-14 rounded-full object-cover block"
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
        />
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-figtree text-white/60 text-[11px] uppercase tracking-widest mb-0.5">Ваш Официант</p>
        <h2 className="font-outfit font-semibold text-white text-xl leading-tight">Артём</h2>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="cursor-pointer"
              onClick={() => setRating(star)}
            >
              <FontAwesomeIcon
                icon={star <= rating ? faStar : faStarRegular}
                className={`text-sm ${star <= rating ? 'text-yellow-400' : 'text-white/30'}`}
              />
            </span>
          ))}
          <span className="font-figtree text-white/50 text-[11px] ml-1">{rating}.0</span>
        </div>
      </div>
      {/* Badge */}
      <div className="flex-shrink-0 flex flex-col items-center gap-1">
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <FontAwesomeIcon icon={faAward} className="text-yellow-300 text-base" />
        </div>
        <span className="font-figtree text-white/50 text-[9px] text-center leading-tight">
          Лучший<br />месяца
        </span>
      </div>
    </div>
  );
}
