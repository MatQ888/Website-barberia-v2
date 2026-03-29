const Services = ({ services }) => {
  return (
    <section
      id="servicios"
      className="section bg-[#1A1A1A]"
      data-testid="services-section"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#C5832B] mb-4">
              Nuestros Servicios
            </p>
            <h2
              className="font-['Playfair_Display'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F5F0] tracking-tight"
              data-testid="services-title"
            >
              Carta de Servicios
            </h2>
          </div>

          {/* Services List */}
          <div className="border border-[#333333] p-8 lg:p-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="service-item"
                data-testid={`service-item-${service.id}`}
              >
                <div className="flex-1">
                  <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#F5F5F0]">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] mt-1">
                    {service.description}
                  </p>
                </div>
                <div className="service-line hidden sm:block" />
                <div className="text-[#C5832B] font-bold text-xl ml-4">
                  {service.price.toFixed(0)}€
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="text-center text-sm text-[#9CA3AF] mt-8">
            * Todos los servicios requieren cita previa
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
