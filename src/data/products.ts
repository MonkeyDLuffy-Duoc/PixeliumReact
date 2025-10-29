  export type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    imageSrc: string;
    imageSrc2: string;
    imageSrc3: string;
    imageSrc4: string;
}
//damos estructura para producto

export const products: Product[] = [ 	
    // Lista de productos en formato TypeScript/JSON
    {
      id: 1,
      title: "Catan",
      description: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.",
      category: "Juegos de Mesa",
      price: 29990,
      imageSrc: "/img/catan.jpg", // Usando el código como referencia de imagen
      imageSrc2: "/img/catan-detalle-1.png", // Usando el código como referencia de imagen
      imageSrc3: "/img/catan-detalle-2.png", // Usando el código como referencia de imagen
      imageSrc4: "/img/catan-detalle-3.jpg" // Usando el código como referencia de imagen
    },
    {
      id: 2,
      title: "Carcassonne",
      description: "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.",
      category: "Juegos de Mesa",
      price: 24990,
      imageSrc: "/img/carcasone.webp",
      imageSrc2: "/img/carcasone-detalle-1.png",
      imageSrc3: "/img/carcasone-detalle-2.png",
      imageSrc4: "/img/carcasone-detalle-3.png"
    },
    {
      id: 3,
      title: "Controlador Inalámbrico Xbox Series X",
      description: "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.",
      category: "Accesorios",
      price: 59990,
      imageSrc: "/img/mando xbox.webp",
      imageSrc2: "/img/mando-xbox-detalle-1.png",
      imageSrc3: "/img/mando-xbox-detalle-2.png",
      imageSrc4: "/img/mando-xbox-detalle-3.png"
    },
    {
      id: 4,
      title: "Auriculares Gamer HyperX Cloud II",
      description: "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.",
      category: "Accesorios",
      price: 79990,
      imageSrc: "/img/HYPERXX.png",
      imageSrc2: "/img/audifono-detalle-1.png",
      imageSrc3: "/img/audifono-detalle-2.png",
      imageSrc4: "/img/audifono-detalle-3.png"
    },
    {
      id: 5,
      title: "PlayStation 5",
      description: "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.",
      category: "Consolas",
      price: 549990,
      imageSrc: "/img/play_5.webp",
      imageSrc2: "/img/play-detalle-1.png",
      imageSrc3: "/img/play-detalle-2.png",
      imageSrc4: "/img/play-detalle-3.png",
    },
    {
      id: 6,
      title: "PC Gamer ASUS ROG Strix",
      description: "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.",
      category: "Computadores Gamers",
      price: 1299990,
      imageSrc: "/img/PC_ASUS.webp",
      imageSrc2: "/img/pc-asus-detalle-1.png",
      imageSrc3: "/img/pc-asus-detalle-2.png",
      imageSrc4: "/img/pc-asus-detalle-3.png"
    },
    {
      id: 7,
      title: "Silla Gamer Secretlab Titan",
      description: "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.",
      category: "Sillas Gamers",
      price: 349990,
      imageSrc: "/img/silla gamer.webp",
      imageSrc2: "/img/silla_detalle_1.png",
      imageSrc3: "/img/silla_detalle_2.png",
      imageSrc4: "/img/silla_detalle_3.png"
    },
    {
      id: 8,
      title: "Mouse Gamer Logitech G502 HERO",
      description: "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.",
      category: "Mouse",
      price: 49990,
      imageSrc: "/img/mouse_gamer.webp",
      imageSrc2: "/img/mouse_detalle_1.png",
      imageSrc3: "/img/mouse_detalle_2.png",
      imageSrc4: "/img/mouse_detalle_3.png"
    },
    {
      id: 9,
      title: "Mousepad Razer Goliathus Extended Chroma",
      description: "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.",
      category: "Mousepad",
      price: 29990,
      imageSrc: "/img/mousepad.jpg",
      imageSrc2: "/img/mousepad_detalle_1.jpg",
      imageSrc3: "/img/mousepad_detalle_2.jpg",
      imageSrc4: "/img/mousepad_detalle_3.jpg"
    },
    {
      id: 10,
      title: "Polera Gamer Personalizada 'Level-Up'",
      description: "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.",
      category: "Poleras Personalizadas",
      price: 14990,
      imageSrc: "/img/Camiseta-level.jpg",
      imageSrc2: "/img/polera_gamer_detalle_1.png",
      imageSrc3: "/img/polera_gamer_detalle_2.png",
      imageSrc4: "/img/polera_gamer_detalle_3.png"
    }
]