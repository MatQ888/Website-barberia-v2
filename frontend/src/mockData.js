// Mock data para La Cochinita Loca

export const restaurantInfo = {
  name: "La Pepa Maluca",
  tagline: "Raciones de calidad",
  address: "C. de Galileo, 22, Chamberí, 28015 Madrid",
  phone: "911997379",
  rating: 4.5,
  reviewCount: 5500,
  priceRange: "20-30€"
};

export const dishes = [
  {
    id: 1,
    category: "Tacos",
    title: "Tacos auténticos mexicanos",
    description: "Nuestros tacos están preparados con recetas tradicionales y los mejores ingredientes.",
    items: [
      "Tacos al pastor",
      "Tacos de suadero",
      "Quesadillas mexicanas",
      "Huaraches tradicionales"
    ],
    icon: "🌮"
  },
  {
    id: 2,
    category: "Entrantes",
    title: "Nachos y entrantes para compartir",
    description: "Perfectos para comenzar la experiencia.",
    items: [
      "Nachos con queso fundido",
      "Totopos con guacamole",
      "Entrantes mexicanos tradicionales"
    ],
    icon: "🧀"
  },
  {
    id: 3,
    category: "Bebidas",
    title: "Bebidas y cócteles",
    description: "Acompaña tu comida con nuestras bebidas.",
    items: [
      "Margaritas clásicas",
      "Cócteles mexicanos",
      "Cervezas y refrescos"
    ],
    icon: "🍹"
  },
  {
    id: 4,
    category: "Postres",
    title: "Postres",
    description: "El toque final perfecto.",
    items: [
      "Postres caseros inspirados en la cocina mexicana para cerrar la experiencia con sabor dulce."
    ],
    icon: "🍰"
  }
];

export const features = [
  {
    id: 1,
    title: "Auténtico sabor mexicano",
    description: "Recetas tradicionales preparadas con ingredientes de calidad.",
    icon: "chef-hat"
  },
  {
    id: 2,
    title: "Servicio rápido y amable",
    description: "Nuestro equipo se asegura de que disfrutes cada momento.",
    icon: "clock"
  },
  {
    id: 3,
    title: "Ambiente divertido",
    description: "Música, buena energía y un espacio perfecto para disfrutar con amigos.",
    icon: "music"
  },
  {
    id: 4,
    title: "Espacio inclusivo",
    description: "Somos un restaurante amigable con la comunidad LGBTQ+.",
    icon: "heart"
  },
  {
    id: 5,
    title: "Negocio liderado por mujeres",
    description: "Un proyecto impulsado por mujeres apasionadas por la gastronomía.",
    icon: "star"
  }
];

export const gallery = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1613409385222-3d0decb6742a",
    alt: "Tacos al pastor auténticos"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1606168159202-1f3fca458c18",
    alt: "Variedad de tacos mexicanos"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1690085664028-3b8465e4ac24",
    alt: "Nachos con queso fundido"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1681394420827-b4f3bcb9866a",
    alt: "Nachos tradicionales"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1711488735436-cccd5917b26c",
    alt: "Quesadillas mexicanas"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1618040996337-56904b7850b9",
    alt: "Quesadillas doradas"
  }
];

export const faqs = [
  {
    id: 1,
    question: "¿Dónde está ubicado el restaurante?",
    answer: "Nos encontramos en Calle de Torija 10, en el centro de Madrid, muy cerca de las principales zonas del centro."
  },
  {
    id: 2,
    question: "¿Cuál es el precio medio?",
    answer: "El precio medio por persona está entre 20 y 30 €, dependiendo de lo que elijas de la carta."
  },
  {
    id: 3,
    question: "¿Se puede reservar mesa?",
    answer: "Sí, puedes reservar fácilmente desde nuestra web o por teléfono."
  },
  {
    id: 4,
    question: "¿Ofrecéis comida para llevar?",
    answer: "Sí. Puedes pedir recogida sin entrar o entrega sin contacto."
  },
  {
    id: 5,
    question: "¿Es apto para grupos?",
    answer: "Sí, es un lugar ideal para grupos de amigos, celebraciones y cenas especiales."
  }
];

export const testimonials = [
  {
    id: 1,
    text: "Increíble experiencia de auténtica comida mexicana.",
    rating: 5
  },
  {
    id: 2,
    text: "Los nachos y tacos están buenísimos.",
    rating: 5
  },
  {
    id: 3,
    text: "Servicio rápido, camareros muy amables y ambiente genial.",
    rating: 5
  }
];

// Mock function para simular reservas
export const mockReservation = (reservationData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Reserva guardada (MOCK):", reservationData);
      resolve({
        success: true,
        id: Math.random().toString(36).substr(2, 9),
        message: "¡Reserva confirmada! Te esperamos en La Cochinita Loca."
      });
    }, 1000);
  });
};
