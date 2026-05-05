# Habito Life — Rediseño Web V2
### Documento de entrega para el cliente

---

## Introducción

Este documento resume todo el trabajo realizado en el rediseño del sitio web de Habito Life. El objetivo fue transformar la presencia digital de la marca para posicionarla como una marca premium dentro del mercado de suplementos, diferenciándola visualmente de la competencia y mejorando cada paso del proceso de compra.

Se mantuvieron todos los contenidos reales del sitio original — productos, precios, la oferta de membresía, y el copy — y se reconstruyó completamente la capa visual y la estructura de navegación.

---

## ¿Qué se construyó?

El rediseño comprende **seis páginas completas**, cada una con una función específica dentro del camino de conversión:

| Página | Archivo | Función |
|---|---|---|
| Inicio | `index.html` | Presentación de la marca, productos destacados, membresía |
| Todos los productos | `all-products.html` | Catálogo completo con filtros por categoría |
| Detalle de producto | `product.html` | Página individual de producto con galería e ingredientes |
| Nosotros | `about.html` | Historia de la marca, valores, propósito |
| Contacto | `contact.html` | Formulario de contacto + preguntas frecuentes |
| Unirse | `join.html` | Página de conversión principal — oferta de membresía |

---

## Decisiones de diseño

A continuación se explica cada decisión de diseño tomada, comparando el sitio original con el nuevo, y el razonamiento detrás de cada cambio.

---

### 1. Modo oscuro como sistema visual base

**Sitio original:** Fondo blanco/claro con paleta de acentos verdes — un patrón muy común en la industria de suplementos que hace que la marca se mezcle con decenas de tiendas similares en Shopify.

**Nuevo diseño:** Fondos oscuros profundos (`#1C1F29` como base, `#22252F` para secciones elevadas) con un acento rojo bold (`#D42F2F`).

**Por qué:** El modo oscuro transmite una imagen premium, crea el contraste visual necesario para que la fotografía de productos resalte, y posiciona a Habito de manera inmediata como una marca diferente al típico estilo "marca verde de salud". El rojo comunica energía, urgencia y acción — valores que se alinean directamente con la psicología del cliente en el mercado de suplementos. El patrón de fondos alternados (base oscura / oscuro ligeramente elevado) genera profundidad sin necesidad de bordes o tarjetas pesadas.

---

### 2. Sistema tipográfico

**Sitio original:** Tipografías por defecto del tema de Shopify — funcionales pero genéricas.

**Nuevo diseño:** Sistema de dos tipografías — **Plus Jakarta Sans** (para display, títulos y elementos de marca) combinada con **Inter** (para cuerpo de texto y UI).

**Por qué:** Plus Jakarta Sans tiene un carácter geométrico y confiado que se lee como moderno y serio en tamaños grandes. Inter es el estándar de la industria para legibilidad en tamaños pequeños en pantalla. La combinación le da a la marca una autoridad editorial — se lee como una marca que se toma en serio a sí misma, sin perder accesibilidad.

---

### 3. Barra de navegación sticky con efecto blur al hacer scroll

**Sitio original:** Navbar fija estándar, siempre visible con fondo sólido.

**Nuevo diseño:** La barra de navegación comienza transparente sobre el hero y adquiere un efecto de vidrio esmerilado (`backdrop-filter: blur(16px)`) cuando el usuario hace scroll más allá de los primeros 20px.

**Por qué:** La transición de transparente a vidrio esmerilado es un patrón moderno de UX (usado por Apple, Linear, Notion, entre otros). Mantiene la sección hero inmersiva en la primera impresión y luego se vuelve funcional a medida que el usuario navega. El contenido de la barra se alinea con el contenedor de página (máximo 1200px de ancho) para mantener consistencia visual.

---

### 4. Marquee animado de beneficios

**Sitio original:** Sin equivalente — solo secciones estáticas.

**Nuevo diseño:** Un marquee horizontal continuo con 10 etiquetas de beneficios (Steady Endurance, Muscle Support, Lean Strength, entre otros) ubicado entre el hero y la sección de productos.

**Por qué:** El marquee comunica el alcance de los productos de un vistazo sin requerir que el usuario lea una lista de puntos. Agrega energía cinética a la página sin el costo de ancho de banda de un video. También refuerza el vocabulario de la marca de manera subliminal mientras el usuario hace scroll. Se respeta la preferencia del sistema `prefers-reduced-motion` — la animación se pausa para usuarios que tienen activada esa configuración de accesibilidad.

---

### 5. Animaciones de scroll con GSAP

**Sitio original:** Sin animaciones de scroll — página completamente estática.

**Nuevo diseño:** Las secciones y grillas de productos aparecen con animaciones de fade + desplazamiento hacia arriba al hacer scroll, usando GSAP 3 + ScrollTrigger.

**Por qué:** Las revelaciones al hacer scroll guían la atención del usuario, crean una sensación de descubrimiento y hacen que la página se sienta viva. Se eligió GSAP sobre animaciones CSS puras porque permite un control preciso sobre la aceleración (easing), duración y timing escalonado (stagger), además de tener mejor compatibilidad entre navegadores. Las animaciones son sutiles — sirven al contenido en lugar de distraer del mismo.

---

### 6. La membresía como motor principal del negocio

**Sitio original:** La oferta de membresía existe pero no está priorizada en la jerarquía visual del diseño.

**Nuevo diseño:** Una sección CTA roja de ancho completo aparece tanto en la página de inicio como en la página Nosotros, y `join.html` es una página de conversión completa con selector de productos, resumen de bundle y formulario de pedido.

**Por qué:** La oferta de membresía $75 por $150 es el diferenciador más fuerte de Habito. Posicionarla de manera prominente en cada página asegura que sea vista, entendida y accionada. La sección roja crea una interrupción visual fuerte — señala "esto es importante" sin ser agresiva.

---

### 7. Diseño de tarjetas de producto

**Sitio original:** Grilla de productos estándar de Shopify con tarjetas blancas.

**Nuevo diseño:** Tarjetas oscuras con un sutil resplandor radial rojo en la base de cada imagen de producto, layout limpio de categoría/nombre/precio, y un botón "Add +" que aparece al pasar el cursor.

**Por qué:** El efecto de resplandor le da presencia a los frascos de suplementos sin necesitar fotografía profesional con fondos personalizados. El layout minimalista de la tarjeta mantiene el foco en el nombre y precio del producto. El botón "Add +" que se revela al hacer hover mantiene la grilla limpia en reposo mientras sigue siendo accionable.

---

### 8. Sección de propuesta de valor

**Sitio original:** Beneficios listados en bloques de texto estándar.

**Nuevo diseño:** Una sección dedicada "Why Habito" con tres tarjetas de valor (Premium Ingredients, Proven Results, Community Support) y una cita destacada: *"You pay for the product, not the marketing."*

**Por qué:** Los compradores de suplementos son escépticos por defecto — han sido defraudados por el hype antes. La sección aborda directamente ese escepticismo y les da una razón para confiar en la marca antes de ver un precio. El formato de cita destacada es memorable y fácil de recordar.

---

### 9. Acordeón de preguntas frecuentes (FAQ)

**Sitio original:** Sin sección de preguntas frecuentes en la página de inicio.

**Nuevo diseño:** Acordeón FAQ en la página de inicio y uno más detallado en la página de contacto (5 preguntas que cubren envíos, devoluciones, pruebas de terceros, membresía y envíos internacionales).

**Por qué:** Las FAQs reducen la carga de soporte al cliente y eliminan la fricción en el momento de compra. El formato de acordeón mantiene la página compacta — las preguntas se pueden escanear rápidamente y las respuestas solo ocupan espacio cuando se necesitan.

---

### 10. Arquitectura de seis páginas

**Sitio original:** Tienda Shopify multi-página con decenas de páginas generadas por el sistema.

**Nuevo diseño:** Estructura enfocada de seis páginas que cubre cada paso crítico del camino de conversión: descubrir → explorar → decidir → confiar → consultar → comprar.

**Por qué:** Una arquitectura de información enfocada elimina la fatiga de decisión. Cada página tiene un trabajo claro y definido. La página Join es el destino de conversión principal; todas las demás páginas apuntan hacia ella.

---

## Resumen de cambios

| Elemento | Antes | Ahora | Razón |
|---|---|---|---|
| Paleta de colores | Claro / verde | Oscuro / rojo | Posicionamiento premium, energía |
| Tipografía | Default del tema | Plus Jakarta Sans + Inter | Autoridad editorial |
| Navbar | Sólida / estática | Transparente → blur al scroll | UX moderno, hero inmersivo |
| Animaciones | Ninguna | GSAP scroll reveals | Engagement, atención guiada |
| CTA de membresía | Enterrada | Prominente en cada página | Motor principal del negocio |
| Tarjetas de producto | Blancas Shopify | Oscuras + glow + hover | Premium, foco en producto |
| Beneficios | Listas de texto | Marquee animado | Kinético, escaneable |
| FAQ | Ninguna en inicio | Acordeón en inicio + contacto | Reducir fricción, reducir soporte |
| Páginas | Muchas (sistema Shopify) | 6 páginas enfocadas | Camino de conversión claro |

---

## Aspectos técnicos

- **Sin dependencias de backend** — el prototipo es HTML/CSS/JavaScript puro, funciona en cualquier servidor o servicio de hosting estático.
- **GSAP 3.12.5 + ScrollTrigger** cargados desde CDN — no requieren instalación ni build process.
- **Google Fonts** cargadas vía CDN — Plus Jakarta Sans e Inter.
- **Totalmente responsivo** — todos los breakpoints están implementados (mobile 390px, tablet 768px, desktop 1200px).
- **Accesibilidad** — roles ARIA, `aria-expanded` en acordeones, `aria-hidden` en el marquee, `focus-visible` para navegación con teclado, landmarks `<main>`, `aria-current` en navbar.
- **18 imágenes reales de productos** incluidas en la carpeta `images/products/`.

---

## Cómo ver el diseño

**Opción A — Online (recomendada para revisión remota)**

El sitio está disponible en GitHub Pages:
`https://jdussan94.github.io/habito-rework/`

Solo abre el enlace en tu navegador — no requiere instalar nada.

**Opción B — Local**

Si preferís verlo desde tu computadora:
1. Abrí una terminal en la carpeta del proyecto
2. Ejecutá: `python -m http.server 8080`
3. Abrí el navegador en: `http://localhost:8080`
4. Recomendado: Chrome o Edge al 100% de zoom

---

## Preguntas frecuentes del cliente

**¿Se pueden cambiar los colores?**
Sí — todo el sistema de colores está definido en un solo lugar del CSS. Cambiar el acento rojo o los fondos oscuros toma aproximadamente 5 minutos.

**¿Se pueden cambiar las tipografías?**
Sí — ambas fuentes se cargan desde Google Fonts. Se pueden reemplazar fácilmente. La combinación actual (Plus Jakarta Sans + Inter) fue elegida por legibilidad premium, pero nada está bloqueado.

**¿Pueden agregarse más productos?**
Agregar un producto son tres pasos: colocar la imagen en la carpeta `images/products/`, agregar el HTML de la tarjeta en `all-products.html`, listo. Es una plantilla simple.

**¿Puede conectarse a una tienda real / pagos?**
Este es un prototipo de frontend. Conectarlo a Shopify, WooCommerce o un proveedor de pagos es la siguiente fase — este prototipo nos permite tener el diseño aprobado antes de conectar el backend.

**¿Por qué se cambió el verde por el rojo?**
El verde es el color por defecto de las marcas de salud — señala "natural y seguro" pero también se mezcla con todos los competidores. El rojo señala energía, acción y urgencia — cualidades que coinciden con los objetivos del cliente objetivo de Habito. También crea un contraste mucho más fuerte sobre el fondo oscuro.

**¿Por qué modo oscuro si el sitio original era claro?**
El modo oscuro consistentemente se percibe como más premium en e-commerce. Hace que la fotografía de productos resalte, reduce la fatiga visual en navegación nocturna, y señala inmediatamente que esta no es una tienda de suplementos genérica.

---

## Próximos pasos

Una vez revisado el prototipo, los siguientes pasos naturales son:

1. **Feedback del cliente** — recopilar comentarios y priorizar revisiones (must-have / nice-to-have / fuera de scope)
2. **Finalización de contenidos** — descripciones finales de productos, fotos del equipo, imágenes de marca
3. **Integración con backend** — Shopify, WooCommerce u otro sistema de e-commerce
4. **Hosting y dominio** — configuración del dominio y servidor de producción
5. **SEO** — meta tags, Open Graph images, sitemap
6. **Analytics** — configuración de Google Analytics / GA4

---

*Documento preparado por el equipo de desarrollo.*
*Sitio en vivo: https://jdussan94.github.io/habito-rework/*
