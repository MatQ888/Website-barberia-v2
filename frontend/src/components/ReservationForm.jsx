import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

// 1. Configuración de horarios permitidos (Lógica de negocio fija)
const ALLOWED_TIMES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
];

export const ReservationForm = ({ onSubmit }) => {
  // --- ESTADOS ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [occupiedHours, setOccupiedHours] = useState([]); // Horas dinámicas de n8n

  // --- FUNCIONES DE SOPORTE ---

  // Consulta a n8n para ver qué horas están pilladas en el Sheets
 const fetchAvailability = async (selectedDate) => {
  try {
    // 1. USA LA URL DE "TEST" DE TU WEBHOOK DE DISPONIBILIDAD
    // Importante: Debe terminar en ?date= (o el nombre que uses)
    const response = await fetch(`http://localhost:5678/webhook-test/TU_ID_AQUI?date=${selectedDate}`, {
      method: 'GET', // El de disponibilidad es GET
    });

    const data = await response.json();
    setOccupiedHours(data.busy || []);
  } catch (error) {
    console.error("Error consultando disponibilidad:", error);
  }
};

  
  // --- HANDLERS (Manejadores de eventos) ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Si cambia la fecha, disparamos la consulta de disponibilidad
    if (name === 'date' && value) {
      fetchAvailability(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      toast.success('¡Reserva confirmada! Te esperamos en La Cochinita Loca.');
      
      // Limpiar formulario tras éxito
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2'
      });
      setOccupiedHours([]);
    } catch (error) {
      toast.error('Error al realizar la reserva. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER ---
  return (
    <section id="reservar" className="reservation-section">
      <div className="container">
        <div className="reservation-wrapper">
          {/* Columna de información */}
          <div className="reservation-info">
            <h2 className="reservation-title">Reserva tu Mesa</h2>
            <p className="reservation-description">
              No te quedes sin probar nuestros platos más populares. 
              Completa el formulario y asegura tu lugar en La Cochinita Loca.
            </p>
            
            <div className="reservation-highlights">
              <div className="highlight-item">
                <Calendar className="highlight-icon" />
                <div>
                  <h4>Reserva Fácil</h4>
                  <p>Completa el formulario en menos de 2 minutos</p>
                </div>
              </div>
              <div className="highlight-item">
                <Clock className="highlight-icon" />
                <div>
                  <h4>Confirmación Rápida</h4>
                  <p>Respuesta inmediata en pantalla</p>
                </div>
              </div>
              <div className="highlight-item">
                <Users className="highlight-icon" />
                <div>
                  <h4>Para Grupos</h4>
                  <p>Ideal para celebraciones y eventos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna del Formulario */}
          <div className="reservation-form-wrapper">
            <form onSubmit={handleSubmit} className="reservation-form">
              
              {/* Nombre */}
              <div className="form-group">
                <Label htmlFor="name">Nombre Completo *</Label>
                <div className="input-wrapper">
                  <User className="input-icon" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email y Teléfono */}
              <div className="form-row">
                <div className="form-group">
                  <Label htmlFor="email">Email *</Label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <div className="input-wrapper">
                    <Phone className="input-icon" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="600 00 00 00"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Fecha y Hora */}
              <div className="form-row">
                <div className="form-group">
                  <Label htmlFor="date">Fecha *</Label>
                  <div className="input-wrapper">
                    <Calendar className="input-icon" />
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <Label htmlFor="time">Hora *</Label>
                  <div className="input-wrapper">
                    <Clock className="input-icon" />
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="" disabled>Selecciona una hora</option>
                      {ALLOWED_TIMES.map((time) => {
                        const isBusy = occupiedHours.includes(time);
                        return (
                          <option key={time} value={time} disabled={isBusy}>
                            {time} {isBusy ? ' - (OCUPADO)' : ''}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {/* Número de personas */}
              <div className="form-group">
                <Label htmlFor="guests">Número de Personas</Label>
                <div className="input-wrapper">
                  <Users className="input-icon" />
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
                    ))}
                    <option value="10+">Más de 10 personas</option>
                  </select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="btn-submit"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar Reserva'}
              </Button>

              <p className="form-note">
                También puedes llamarnos directamente al <strong>919 48 44 88</strong>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
