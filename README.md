# Teleprompter Banda Rharux — Homenaje Andy Rharux

PWA offline de alto contraste diseñada para tablets en vivo y ensayos para bandas de rock.

## Características Implementadas (MVP)

1. **Setlist Completo (10 Canciones):**
   - Extraído directamente del documento del evento con acordes, secciones y BPMs.
   - Navegación instantánea mediante el panel lateral de Setlist.

2. **Motor de Tiempo Determinista (Master Clock):**
   - El scroll avanza automáticamente y de forma continua siguiendo los tiempos de cada verso/coro/solo.
   - Botón de Reproducir/Pausar gigante, salto de canción anterior/siguiente y ajuste rápido (+5s / -5s).
   - Control de velocidad en vivo (`0.8x`, `1.0x`, `1.2x`).

3. **Pase Automático de Canción (Auto-Advance):**
   - Al terminar la canción, muestra una cuenta regresiva visual de 5 segundos y pasa automáticamente a la siguiente del setlist (con opción de cancelar o saltar de inmediato).

4. **Sincronización por Voz (Modo Experimental):**
   - Botón `Voz ON/OFF` en la barra inferior.
   - Escucha continuamente mediante la API de voz y al detectar palabras del verso actual realiza un ajuste suave de fase hacia la línea correspondiente.
   - Si no hay voz o el ruido ambiente la bloquea, el reloj maestro sigue su curso sin interrumpir el prompter.

5. **Diseño de Escenario:**
   - Fondo negro puro (OLED) con acordes en amarillo brillante y tipografía legible a 2 metros de distancia.
   - Resaltado activo que mantiene la línea actual centrada suavemente.
   - Pantalla siempre encendida (*Screen Wake Lock API*).

6. **Atajos para Pedales Bluetooth / Teclado:**
   - **Espacio / Enter:** Reproducir / Pausar
   - **Flecha Abajo / AvPág:** Adelantar 5s
   - **Flecha Arriba / RePág:** Atrasar 5s
   - **Flecha Derecha / N:** Siguiente canción
   - **Flecha Izquierda / P:** Canción anterior
   - **R:** Reiniciar canción
   - **V:** Activar/desactivar modo voz
   - **S:** Abrir/cerrar menú de canciones

## Cómo Ejecutar en Local y Probar en la Tablet

### 1. Iniciar el servidor local:
```bash
npm run dev -- --host
```

### 2. Abrir en la Tablet Samsung:
1. Conecta la tablet a la misma red Wi-Fi que la computadora (o comparte internet desde la computadora/celular).
2. Abre Google Chrome en la tablet y entra a la IP que muestra la terminal (ejemplo: `http://192.168.1.XX:5173`).
3. En el menú de Chrome de la tablet (3 puntos), selecciona **"Agregar a la pantalla principal"** o **"Instalar aplicación"**.
4. ¡Listo! Ya abre como una app nativa en pantalla completa y funciona **100% offline**.
