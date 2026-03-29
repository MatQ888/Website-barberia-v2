import { useState } from "react";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { API } from "../App";
import { CalendarCheck, Check, Spinner } from "@phosphor-icons/react";
import { es } from "date-fns/locale";
import { format } from "date-fns";

const Booking = ({ services }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleDateSelect = async (date) => {
    if (!date) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setLoadingSlots(true);

    try {
      const dateStr = format(date, "yyyy-MM-dd");
      const response = await axios.post(`${API}/bookings/available-slots`, {
        date: dateStr,
      });
      setAvailableSlots(response.data.available_slots);
      if (response.data.available_slots.length === 0) {
        toast.info(response.data.message || "No hay horarios disponibles");
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      toast.error("Error al cargar horarios disponibles");
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !selectedService || !name || !phone) {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    setSubmitting(true);

    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      await axios.post(`${API}/bookings`, {
        name,
        phone,
        service_id: selectedService,
        date: dateStr,
        time: selectedTime,
      });

      setBookingComplete(true);
      toast.success("¡Reserva confirmada!");

      // Reset form after delay
      setTimeout(() => {
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedService("");
        setName("");
        setPhone("");
        setAvailableSlots([]);
        setBookingComplete(false);
      }, 5000);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error(
        error.response?.data?.detail || "Error al crear la reserva"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Disable past dates and Sundays
  const disabledDays = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  if (bookingComplete) {
    return (
      <section
        id="reservar"
        className="section bg-[#0A0A0A]"
        data-testid="booking-section"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#C5832B] flex items-center justify-center">
              <Check size={40} weight="bold" className="text-[#F5F5F0]" />
            </div>
            <h2
              className="font-['Playfair_Display'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F5F0] tracking-tight mb-4"
              data-testid="booking-success-title"
            >
              ¡Reserva Confirmada!
            </h2>
            <p className="text-[#9CA3AF] text-lg mb-4">
              Te esperamos el{" "}
              <span className="text-[#C5832B] font-semibold">
                {format(selectedDate, "d 'de' MMMM", { locale: es })}
              </span>{" "}
              a las{" "}
              <span className="text-[#C5832B] font-semibold">{selectedTime}h</span>
            </p>
            <p className="text-[#9CA3AF]">
              Recibirás una confirmación por teléfono.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="reservar"
      className="section bg-[#0A0A0A]"
      data-testid="booking-section"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#C5832B] mb-4">
              Cita Previa
            </p>
            <h2
              className="font-['Playfair_Display'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F5F0] tracking-tight mb-4"
              data-testid="booking-title"
            >
              Reserva Tu Cita
            </h2>
            <p className="text-[#9CA3AF] max-w-lg mx-auto">
              Selecciona el servicio, fecha y hora que mejor te convenga
            </p>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Calendar */}
            <div className="card p-6">
              <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#F5F5F0] mb-6">
                Selecciona Fecha
              </h3>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={disabledDays}
                  locale={es}
                  className="rounded-none border-0"
                  data-testid="booking-calendar"
                />
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="mt-6">
                  <h4 className="font-medium text-[#F5F5F0] mb-4">
                    Horarios Disponibles
                  </h4>
                  {loadingSlots ? (
                    <div className="flex items-center justify-center py-8">
                      <Spinner size={24} className="animate-spin text-[#C5832B]" />
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div
                      className="grid grid-cols-4 gap-2"
                      data-testid="time-slots-grid"
                    >
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`time-slot ${
                            selectedTime === slot ? "selected" : ""
                          }`}
                          data-testid={`time-slot-${slot}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#9CA3AF] text-sm text-center py-4">
                      No hay horarios disponibles para este día
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="card p-6">
              <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#F5F5F0] mb-6">
                Tus Datos
              </h3>

              <div className="space-y-6">
                {/* Service Select */}
                <div>
                  <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    Servicio
                  </label>
                  <Select
                    value={selectedService}
                    onValueChange={setSelectedService}
                  >
                    <SelectTrigger
                      className="w-full bg-[#1A1A1A] border-[#333333] text-[#F5F5F0]"
                      data-testid="service-select-trigger"
                    >
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-[#333333]">
                      {services.map((service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id}
                          className="text-[#F5F5F0] focus:bg-[#2A2A2A] focus:text-[#F5F5F0]"
                          data-testid={`service-option-${service.id}`}
                        >
                          {service.name} - {service.price}€
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    Nombre
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="bg-[#1A1A1A] border-[#333333] text-[#F5F5F0] placeholder:text-[#666666]"
                    data-testid="booking-name-input"
                    required
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                    Teléfono
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Tu teléfono"
                    className="bg-[#1A1A1A] border-[#333333] text-[#F5F5F0] placeholder:text-[#666666]"
                    data-testid="booking-phone-input"
                    required
                  />
                </div>

                {/* Summary */}
                {selectedDate && selectedTime && selectedService && (
                  <div
                    className="p-4 bg-[#2A2A2A] border border-[#333333]"
                    data-testid="booking-summary"
                  >
                    <h4 className="font-medium text-[#F5F5F0] mb-2">
                      Resumen de tu cita
                    </h4>
                    <p className="text-sm text-[#9CA3AF]">
                      <span className="text-[#C5832B]">
                        {services.find((s) => s.id === selectedService)?.name}
                      </span>{" "}
                      el{" "}
                      <span className="text-[#F5F5F0]">
                        {format(selectedDate, "d 'de' MMMM", { locale: es })}
                      </span>{" "}
                      a las{" "}
                      <span className="text-[#F5F5F0]">{selectedTime}h</span>
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={
                    submitting ||
                    !selectedDate ||
                    !selectedTime ||
                    !selectedService ||
                    !name ||
                    !phone
                  }
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="booking-submit-btn"
                >
                  {submitting ? (
                    <Spinner size={20} className="animate-spin mr-2" />
                  ) : (
                    <CalendarCheck size={20} weight="fill" className="mr-2" />
                  )}
                  {submitting ? "Reservando..." : "Confirmar Reserva"}
                </Button>
              </div>
            </div>
          </form>

          {/* Hours Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-[#9CA3AF]">
              <span className="font-semibold text-[#F5F5F0]">Horario:</span>{" "}
              Lunes a Viernes 9:00-13:00 y 16:30-20:30 | Sábados 9:00-14:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
