import { Scissors, Clock, Star } from "@phosphor-icons/react";

const About = () => {
  const features = [
    {
      icon: <Scissors size={32} weight="light" />,
      title: "Experiencia",
      description: "Casi una década perfeccionando el arte del corte",
    },
    {
      icon: <Clock size={32} weight="light" />,
      title: "Puntualidad",
      description: "Respetamos tu tiempo con cita previa garantizada",
    },
    {
      icon: <Star size={32} weight="light" />,
      title: "Calidad",
      description: "Productos premium y técnicas actualizadas",
    },
  ];

  return (
    <section
      id="sobre-nosotros"
      className="section bg-[#0A0A0A]"
      data-testid="about-section"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1747830280502-f33d7305a714?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxtYWxlJTIwYmFyYmVyJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzc0NDc0MjAwfDA&ixlib=rb-4.1.0&q=85"
                alt="David - El especialista de The Corner Barber"
                className="w-full h-full object-cover"
                data-testid="about-image"
              />
            </div>
            {/* Accent border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#C5832B] -z-10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#C5832B] mb-4">
              El Especialista
            </p>
            <h2
              className="font-['Playfair_Display'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F5F0] tracking-tight mb-6"
              data-testid="about-title"
            >
              Conoce a David
            </h2>
            <p className="text-[#9CA3AF] text-base leading-relaxed mb-6">
              Llevamos casi una década definiendo el estilo de nuestros clientes.
              Al frente se encuentra David, un especialista apasionado por las
              tendencias actuales y conocido por su trato cercano y profesional.
            </p>
            <p className="text-[#9CA3AF] text-base leading-relaxed mb-10">
              Aquí no solo vienes a cortarte el pelo, vienes a disfrutar de un
              buen rato. Un ambiente donde la conversación y la confianza son la
              norma.
            </p>

            {/* Features */}
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                  data-testid={`about-feature-${index}`}
                >
                  <div className="text-[#C5832B]">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-[#F5F5F0] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#9CA3AF]">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
