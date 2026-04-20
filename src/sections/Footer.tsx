import { Mail, Phone, MapPin } from 'lucide-react';

const platformLinks = ['Assessments', 'Modules', 'Results', 'Certificates', 'Employer Portal'];
const resourceLinks = ['Study Materials', 'Practice Tests', 'Industry Standards', 'FAQ', 'Contact'];

export default function Footer() {
  return (
    <footer
      className="pt-20 pb-10 px-6 lg:px-16"
      style={{
        backgroundColor: 'var(--black)',
        borderTop: '1px solid var(--border-subtle)',
        zIndex: 2,
        position: 'relative',
      }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L28 28H4L16 2Z" fill="#D4943A" />
                <path d="M16 8L24 26H8L16 8Z" fill="#1A3A5C" />
              </svg>
              <span className="font-sans font-medium text-sm tracking-wider uppercase text-[var(--white)]">
                City Surface Training
              </span>
            </div>
            <p className="font-sans text-sm text-[var(--grey)] leading-relaxed">
              Assessing and certifying the next generation of surface restoration technicians across Ghana.
            </p>
          </div>

          {/* Col 2: Platform */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-[var(--white)] mb-5">
              Platform
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link}>
                  <span className="font-sans text-sm text-[var(--grey)] hover:text-[var(--orange)] transition-colors duration-200 cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-[var(--white)] mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <span className="font-sans text-sm text-[var(--grey)] hover:text-[var(--orange)] transition-colors duration-200 cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-[var(--white)] mb-5">
              Connect
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--orange)] flex-shrink-0" />
                <span className="font-sans text-sm text-[var(--grey)]">
                  info@citysurfacetraining.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--orange)] flex-shrink-0" />
                <span className="font-sans text-sm text-[var(--grey)]">+233 XX XXX XXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--orange)] flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-[var(--grey)]">Accra, Ghana</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-6 mt-12 gap-4"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <span className="font-sans text-xs text-[var(--grey)]">
            2025 City Surface Training. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <span
                key={item}
                className="font-sans text-xs text-[var(--grey)] hover:text-[var(--orange)] transition-colors duration-200 cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
