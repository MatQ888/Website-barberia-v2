# PRD - La Cochinita Loca - Sitio Web de Reservas

## 📋 Información del Proyecto

**Nombre**: La Cochinita Loca - Sitio Web de Reservas  
**Fecha de Inicio**: 12 de Diciembre, 2025  
**Tipo**: Landing page con sistema de reservas para restaurante mexicano

---

## 🎯 Descripción del Problema Original

Crear una página web de reservas para "La Cochinita Loca", un restaurante mexicano auténtico ubicado en Madrid (C. de Torija, 10). El sitio debe mostrar información del restaurante, menú, galería de fotos, y permitir a los usuarios hacer reservas de mesa.

---

## 👥 Usuarios Objetivo

1. **Comensales locales**: Personas en Madrid buscando comida mexicana auténtica
2. **Grupos y celebraciones**: Amigos, familias que quieren reservar para eventos
3. **Turistas**: Visitantes en Madrid buscando experiencias gastronómicas mexicanas
4. **Comunidad LGBTQ+**: El restaurante es inclusivo y amigable con esta comunidad

---

## 🎨 Arquitectura y Tecnologías

### Frontend
- **Framework**: React 19
- **Componentes UI**: Shadcn UI
- **Estilos**: Tailwind CSS + Custom CSS
- **Routing**: React Router DOM
- **Notificaciones**: Sonner (toasts)

### Backend (Pendiente)
- **Framework**: FastAPI (Python)
- **Base de Datos**: MongoDB
- **Motor**: Motor (async MongoDB)

### Diseño
- **Paleta de colores**: 
  - Primario: #ECEC75 (lime-amarillo vibrante)
  - Oscuro: #e6e67c (tono más oscuro para cards)
  - Negro: #0f172a (botones y texto)
  - Blanco: #ffffff (contenedores)
- **Tipografía**: 
  - Serif (Crimson Text) para títulos principales
  - Sans-serif para texto de cuerpo

---

## ✅ Funcionalidades Implementadas

### Fase 1: Frontend con Mock Data (Completado - 12 Dic 2025)

#### Componentes Creados:
1. **Header** (`/app/frontend/src/components/Header.jsx`)
   - Logo del restaurante
   - Navegación: Menú, Galería, FAQ, Reservar
   - Sticky header con fondo blanco

2. **Hero Section** (`/app/frontend/src/components/Hero.jsx`)
   - Título principal con tipografía serif
   - Rating y número de reseñas (4.5 estrellas, 5,500 reseñas)
   - Dirección y teléfono del restaurante
   - Botones CTA: "Reservar Mesa" (negro) y "Ver Menú" (outline)
   - Imagen de fondo con overlay lime-amarillo

3. **Menu Section** (`/app/frontend/src/components/Menu.jsx`)
   - Grid de 4 categorías: Tacos, Entrantes, Bebidas, Postres
   - Cada card muestra emoji, título, descripción y lista de items
   - Sección "Opciones para disfrutar" con badges

4. **Features Section** (`/app/frontend/src/components/Features.jsx`)
   - 5 características del restaurante
   - Iconos en círculos lime-amarillo
   - Cards con hover effects

5. **Gallery** (`/app/frontend/src/components/Gallery.jsx`)
   - Grid de 6 imágenes profesionales de Unsplash
   - Hover overlay con caption
   - Imágenes optimizadas de comida mexicana

6. **Reservation Form** (`/app/frontend/src/components/ReservationForm.jsx`)
   - Formulario con validación
   - Campos: nombre, email, teléfono, fecha, hora, número de personas
   - Iconos Lucide React en cada input
   - Toast notifications con Sonner
   - Funcionalidad con mock data

7. **Testimonials** (`/app/frontend/src/components/Testimonials.jsx`)
   - 3 testimonios de clientes
   - Rating con estrellas
   - Cards con hover effects

8. **FAQ** (`/app/frontend/src/components/FAQ.jsx`)
   - Accordion con 5 preguntas frecuentes
   - Componente Shadcn Accordion
   - Animaciones smooth

9. **Footer** (`/app/frontend/src/components/Footer.jsx`)
   - Información de contacto
   - Horarios del restaurante
   - Copyright

#### Archivos de Datos:
- **mockData.js** (`/app/frontend/src/mockData.js`)
  - Información del restaurante
  - Platos y menú
  - Características
  - Galería de imágenes
  - FAQs
  - Testimonios
  - Función `mockReservation()` para simular envío de reservas

#### Estilos:
- **App.css** actualizado con diseño completo siguiendo las guías lime-amarillo
- Variables CSS personalizadas
- Responsive design para mobile, tablet y desktop
- Animaciones y transiciones suaves
- Hover effects en cards y botones

---

## 🔄 Funcionalidades Pendientes

### Fase 2: Backend Development (P0 - Siguiente)

#### Modelos MongoDB:
```python
# Modelo Reservation
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "phone": String,
  "date": Date,
  "time": String,
  "guests": Number,
  "status": String (pending, confirmed, cancelled),
  "created_at": DateTime,
  "updated_at": DateTime
}
```

#### Endpoints API:
1. **POST /api/reservations** - Crear nueva reserva
   - Input: nombre, email, teléfono, fecha, hora, número de personas
   - Output: confirmación con ID de reserva
   - Validaciones: email formato, teléfono, fecha futura

2. **GET /api/reservations/{id}** - Consultar reserva por ID
   - Output: datos de la reserva

3. **GET /api/reservations** - Listar todas las reservas (admin)
   - Filtros opcionales: fecha, estado
   - Paginación

4. **PUT /api/reservations/{id}** - Actualizar reserva
   - Cambiar fecha, hora, número de personas

5. **DELETE /api/reservations/{id}** - Cancelar reserva

#### Integración Frontend-Backend:
- Reemplazar `mockReservation()` en `mockData.js` con llamadas reales a API
- Usar axios para hacer POST a `/api/reservations`
- Manejar estados de carga y errores
- Toast messages para éxito/error

---

## 📝 Protocolo de Integración Backend

### Pasos:
1. Crear modelo `Reservation` en `/app/backend/models/reservation.py`
2. Crear endpoints en `/app/backend/server.py` con prefix `/api`
3. Implementar validaciones con Pydantic
4. Agregar manejo de errores apropiado
5. En frontend, crear `/app/frontend/src/services/api.js` con funciones para llamar APIs
6. Actualizar `ReservationForm.jsx` para usar el servicio API real
7. Remover o comentar `mockReservation()` de `mockData.js`
8. Testing completo del flujo de reservas

---

## 🎯 Backlog Priorizado

### P0 (Crítico - Próximo)
- [ ] Implementar backend con MongoDB
- [ ] CRUD completo de reservas
- [ ] Integrar frontend con backend
- [ ] Testing end-to-end

### P1 (Alta prioridad)
- [ ] Panel de administración para ver reservas
- [ ] Validación de disponibilidad (evitar doble reserva)
- [ ] Email de confirmación de reserva
- [ ] Página de confirmación de reserva

### P2 (Media prioridad)
- [ ] Sistema de autenticación para admin
- [ ] Dashboard con métricas de reservas
- [ ] Exportar reservas a CSV
- [ ] Integración con Google Maps para ubicación
- [ ] Menú descargable en PDF

### P3 (Baja prioridad)
- [ ] Sistema de reviews/valoraciones
- [ ] Galería expandible (lightbox)
- [ ] Multi-idioma (inglés/español)
- [ ] Integración con redes sociales
- [ ] Blog de recetas mexicanas

---

## 📊 Métricas de Éxito

1. **Conversión de reservas**: % de visitantes que completan una reserva
2. **Tiempo de carga**: < 3 segundos
3. **Tasa de rebote**: < 40%
4. **Dispositivos móviles**: > 60% de visitas
5. **Formularios completados**: > 70% de los iniciados

---

## 🚀 Próximos Pasos Inmediatos

1. Obtener confirmación del usuario para proceder con backend
2. Crear modelos MongoDB para reservas
3. Implementar endpoints API con validaciones
4. Integrar frontend con backend
5. Testing completo usando testing_agent_v3
6. Deploy y verificación en producción

---

## 📌 Notas Importantes

- **Mock Data**: Actualmente usando `mockData.js` para simular reservas
- **Diseño**: Siguiendo guías lime-amarillo (#ECEC75) con tipografía serif/sans-serif
- **Componentes**: Usando Shadcn UI (accordion, button, input, etc.)
- **Iconos**: Lucide React para todos los iconos
- **Imágenes**: 8 imágenes profesionales de Unsplash optimizadas

---

**Última Actualización**: 12 de Diciembre, 2025
