import { Phone, CalendarCheck } from "@phosphor-icons/react";

const Hero = ({ businessInfo }) => {
  const handleScrollToBooking = (e) => {
    e.preventDefault();
    const element = document.querySelector("#reservar");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="hero-section relative flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/7697709/pexels-photo-7697709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1920')`,
      }}
      data-testid="hero-section"
    >
      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl">
          {/* Overline */}
          <p
            className="text-xs uppercase tracking-[0.2em] font-bold text-[#C5832B] mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            Barbería en Almería
          </p>

          {/* Title */}
          <h1
            className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#F5F5F0] tracking-tight leading-[1.1] mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            data-testid="hero-title"
          >
            The Corner Barber
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg lg:text-xl text-[#9CA3AF] max-w-xl mb-10 leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            data-testid="hero-subtitle"
          >
            Profesionalidad, estilo y buen ambiente en el corazón de Almería.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <button
              onClick={handleScrollToBooking}
              className="btn-primary flex items-center justify-center gap-2"
              data-testid="hero-booking-cta"
            >
              <CalendarCheck size={20} weight="fill" />
              <span>Reservar Cita</span>
            </button>
            <a
              href={`tel:${businessInfo?.phone || "+34677837593"}`}
              className="btn-secondary flex items-center justify-center gap-2"
              data-testid="hero-call-cta"
            >
              <Phone size={20} weight="fill" />
              <span>677 83 75 93</span>
            </a>
          </div>

          {/* Rating badge */}
          <div
            className="mt-12 flex items-center gap-3 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${star <= 5 ? "star-filled" : "text-[#333333]"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[#F5F5F0] font-semibold">4.9</span>
            <span className="text-[#9CA3AF] text-sm">+100 reseñas</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
        <div className="w-6 h-10 border-2 border-[#333333] rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-[#C5832B] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
