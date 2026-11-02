export interface SongSection {
  type: 'intro' | 'verse' | 'chorus' | 'solo' | 'outro' | 'bridge';
  title?: string;
  durationSec?: number; // estimated or calibrated duration in seconds
  lines: {
    chords?: string;
    text: string;
  }[];
}

export interface Song {
  id: string;
  order: number;
  title: string;
  bpm?: number;
  tempoLabel?: string;
  estimatedDurationSec: number;
  sections: SongSection[];
}

export const SETLIST: Song[] = [
  {
    id: 'sr-muerte',
    order: 1,
    title: 'Sr. Muerte',
    tempoLabel: 'Arpeggio Am - Em',
    estimatedDurationSec: 210,
    sections: [
      {
        type: 'intro',
        title: 'Intro con Arpeggio',
        durationSec: 15,
        lines: [
          { chords: 'Am … Em, … Am … Em', text: '(Arpegio de entrada)' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 25,
        lines: [
          { chords: 'G', text: 'Un fantasma' },
          { chords: 'F, C', text: 'naufraga en la nada' },
          { chords: 'G', text: 'Por doquiera' },
          { chords: 'F, C', text: 'anda y daña' },
          { chords: 'Am Am7 Em', text: 'No sabes si a tu lado está, no sabes' },
          { chords: 'Am Am7 Em', text: 'No sabes cuando por ti vendrá, no sabes' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 25,
        lines: [
          { chords: 'G', text: 'En un cuadro de horror' },
          { chords: 'F, C', text: 'siempre estás presente' },
          { chords: 'G', text: 'Maldita confusión' },
          { chords: 'F, C', text: 'Tu corazón no siente' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 25,
        lines: [
          { chords: 'Am Am7 Em', text: 'Oooh Sr. Muerte, déjame vivir más' },
          { chords: 'Am Am7 Em', text: 'Conmigo Sr. Muerte, cuando terminarás ?' }
        ]
      },
      {
        type: 'solo',
        title: 'Guitarra',
        durationSec: 20,
        lines: [
          { chords: 'G, F, C x 2 Times', text: '[ Solo de Guitarra ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 3',
        durationSec: 30,
        lines: [
          { chords: 'Am Am7 Em', text: 'Sin materia es tu existencia aaahh' },
          { chords: 'Am Am7 Em', text: 'Por eso es que ni una lágrima tu derramarás' },
          { chords: 'Am Am7 Em', text: 'Sin amenazas cumples tu crítica encomienda' },
          { chords: 'Am Am7 Em', text: 'Déjanos saber: quien a ti te manda ?' }
        ]
      },
      {
        type: 'solo',
        title: 'Solo',
        durationSec: 30,
        lines: [
          { chords: 'G, F, C x 2 Times', text: '[ Guitarra ]' },
          { chords: 'Am, Am7 Em x 2 Times | G, F, C x 2 Times', text: '[ SOLO ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 4',
        durationSec: 20,
        lines: [
          { chords: 'Am Am7 Em', text: 'No sabes si a tu lado está, no sabes' },
          { chords: 'Am Am7 Em', text: 'No sabes cuando por ti vendrá, no sabes' },
          { chords: 'G F, C', text: 'No sabes si a tu lado está, no sabes' },
          { chords: 'G F, C', text: 'No sabes cuando por ti vendrá, no sabes' }
        ]
      },
      {
        type: 'outro',
        title: 'Tarareo y Silbido - FIN',
        durationSec: 30,
        lines: [
          { chords: 'Am Am7 Em', text: 'La la lalara, la la lalarala la lala laaaa…' },
          { chords: 'Am Am7 Em', text: 'La la lalara, la la lalarala la lala laaaa…' },
          { chords: 'G F C', text: 'Shara lalá, shara lalá, la lala lalá' },
          { chords: 'G F C', text: 'Shara lalá, shara lalá, la lala lalá' },
          { chords: 'Am, Am7 Em x2 | G F C x2', text: '[ Melodía acompañada con silbido… FIN ]' }
        ]
      }
    ]
  },
  {
    id: 'al-menor-trabajador',
    order: 2,
    title: 'Al Menor Trabajador',
    estimatedDurationSec: 240,
    sections: [
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 40,
        lines: [
          { text: 'Los años se te vienen, caminando tu estarás' },
          { text: 'Tomándo decisiones, ahora sólo lo intentarás' },
          { text: 'Lleno de incertirtidumbre, piensa bien decídete' },
          { text: 'Dos caminos en la vida, escoge bién. Muévete' },
          { text: 'Piensa bien tú, tú muchacho en la vida que tendrás' },
          { text: 'Tienes que hacer algo, no te debes conformar' },
          { text: 'De la vida tendrás algo bueno o malo para armar' },
          { text: 'Tú sabrás lo que escoges. Será el bien o la maldad' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 20,
        lines: [
          { text: 'Tú al bien mira siempre' },
          { text: 'Tú al bien mira siempre' }
        ]
      },
      {
        type: 'solo',
        title: 'Solo',
        durationSec: 25,
        lines: [
          { text: '*** SOLO DE GUITARRA ***' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 40,
        lines: [
          { text: 'La situación es muy pobre, casi imposible avanzar' },
          { text: 'Pero si te lo propones, sólo así progresarás' },
          { text: 'Ordena tus pensamientos, tendrás suerte en el amor' },
          { text: 'Por si tú no lo sabes: todo radica en la acción' },
          { text: 'Si ya estás en malos pasos, reflexiona tu accionar' },
          { text: 'Recuerda mi amigo, nunca es tarde para empezar' },
          { text: 'Sé fuerte contigo mismo, es difícil lo sé yo' },
          { text: 'Pero si tú no lo haces, caerás en la acción' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro Final',
        durationSec: 30,
        lines: [
          { text: 'Tú al bien mira siempre' },
          { text: 'Tú al bien mira siempre' },
          { text: 'Tú al bien mira siempre' },
          { text: 'Tuuuuuuú…' }
        ]
      }
    ]
  },
  {
    id: 'susy-peleonera',
    order: 3,
    title: 'Susy Peleonera',
    tempoLabel: 'Punk Rock',
    estimatedDurationSec: 180,
    sections: [
      {
        type: 'intro',
        title: 'Intro',
        durationSec: 15,
        lines: [
          { text: 'INTRO PUNK CON GUITARRA' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 30,
        lines: [
          { text: 'Uh ehh, Susy Peleonera es' },
          { text: 'Uh ehh, Susy Peleonera es' },
          { text: 'Me quiere agandallar' },
          { text: 'No sabe Susy lo que quiere' },
          { text: 'Se quiere destrampar' },
          { text: 'Susy peleonera es y su hermana es igual' },
          { text: 'Es una cabeza dura, sólo quiere pelear Uh ehh, Uh Uh ehh' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 30,
        lines: [
          { text: 'Uh ehh, Susy Peleonera es' },
          { text: 'Uh ehh, Susy Peleonera es' },
          { text: 'No entiende hablando con palabras' },
          { text: 'Solo quiere pelear' },
          { text: 'Y todos los que la conocen' },
          { text: 'Le tienen miedo ya' },
          { text: 'Susy peleonera es y su hermana es igual' },
          { text: 'Es una chica muy caliente, me quiere agandallar Uh ehh, Uh Uh ehh' }
        ]
      },
      {
        type: 'solo',
        title: 'Solo',
        durationSec: 25,
        lines: [
          { text: 'SOLO…' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 3',
        durationSec: 30,
        lines: [
          { text: 'Uh ehh, Susy Peleonera es' },
          { text: 'Uh ehh, Susy Peleonera es' },
          { text: 'No entiende hablando con palabras' },
          { text: 'Solo quiere pelear' },
          { text: 'Y todos los que la conocen' },
          { text: 'Le tienen miedo ya' },
          { text: 'Susy peleonera es y su hermana es igual' },
          { text: 'Es una chica muy caliente, me quiere ella violar Uuh, Uh Uh ehh, Uh Uh ehh' }
        ]
      },
      {
        type: 'outro',
        title: 'Outro - Voz con Batería',
        durationSec: 25,
        lines: [
          { text: 'Susy es punk, Susy es punk, Susy es punk Uh Uh ehh, Uh Uh ehh' },
          { text: 'Uh Uh ehh, Uh Uh ehh Uh Uh ehh, Uh Uh ehh' },
          { text: 'Yeaahh.' }
        ]
      }
    ]
  },
  {
    id: 'flojo',
    order: 4,
    title: 'Flojo',
    bpm: 140,
    tempoLabel: 'Allegro',
    estimatedDurationSec: 190,
    sections: [
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 35,
        lines: [
          { chords: 'A5 E5', text: 'Ya no quiero verte parado en la esquina' },
          { chords: 'D5 A5', text: 'Perdiendo el tiempo, sin nada que hacer' },
          { chords: 'A5 E5', text: 'Cuando ves que todos se van a la escuela' },
          { chords: 'D5 A5', text: 'Tu te quedas parado no te quieres mover' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 30,
        lines: [
          { chords: 'D5 A5', text: 'Y es que yo no quiero verte sufrir' },
          { chords: 'D5 A5', text: 'Y es que solo quiero verte feliz' },
          { chords: 'D5 A5', text: 'Y es que yo no quiero verte sufrir' },
          { chords: 'D5 A5', text: 'Porque solo quiero verte feliz' }
        ]
      },
      {
        type: 'bridge',
        title: 'Puente',
        durationSec: 15,
        lines: [
          { chords: '…D5 x 8, E5 x 8', text: '[ Riff de paso ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 35,
        lines: [
          { chords: 'A5 E5', text: 'Tu no debes de hacer siempre lo mismo' },
          { chords: 'D5 A5', text: 'Piensa en los problemas que vas a tener' },
          { chords: 'A5 E5', text: 'Si tu vas en la calle, escuela o en algún lugar' },
          { chords: 'D5 A5', text: 'Problemas y broncas te van a llover' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 20,
        lines: [
          { chords: 'D5', text: 'Y es que yo no quiero …' },
          { chords: '…D5 x 8, E5 x 8', text: '[ Repite Coro ]' }
        ]
      },
      {
        type: 'solo',
        title: 'Solo',
        durationSec: 30,
        lines: [
          { chords: '(A5 E5 / D5 A5) x 2 | (D5 A5) x 4 | …D5 x 8, E5 x 8', text: '[ SOLO DE GUITARRA ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 3',
        durationSec: 30,
        lines: [
          { chords: 'A5 E5', text: 'Tu no debes de hacer siempre lo mismo' },
          { chords: 'D5 A5', text: 'Piensa en los problemas que vas a tener' },
          { chords: 'A5 E5', text: 'Si tu vas en la calle, escuela o en algún lugar' },
          { chords: 'D5 A5', text: 'Problemas y broncas te van a llover' }
        ]
      },
      {
        type: 'outro',
        title: 'Coro y FIN',
        durationSec: 20,
        lines: [
          { text: '… CORO' },
          { chords: 'A5', text: 'FIN ( Figura de Blues en A5 )' }
        ]
      }
    ]
  },
  {
    id: 'escoria',
    order: 5,
    title: 'Escoria',
    bpm: 130,
    tempoLabel: 'Allegretto',
    estimatedDurationSec: 240,
    sections: [
      {
        type: 'intro',
        title: 'Intro con Solo',
        durationSec: 25,
        lines: [
          { chords: 'E5,G5,A5,F5,…E5,G5,E5 …E5,G5,E5 x 2', text: '[ Riff de Introducción ]' },
          { chords: 'A5,G5, …E5, G5, E5., E5, G5, E5 x 2', text: '[ Intro Parte 2 ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 40,
        lines: [
          { chords: 'G5 A5 | F5 …E5, G5, E5', text: 'En la pobreza mal vestidos / Los puedes ver,' },
          { chords: 'G5 A5 | F5 …E5, G5, E5', text: 'Piedras rodantes sin camino / Has de ver' },
          { chords: 'G5 A5 | F5 …E5, G5, E5', text: 'Intoxicados de por vida / No puede ser !!!' },
          { chords: 'G5 A5 | F5 …E5, G5, E5', text: 'Dales un poco de camino / No hay que ser' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 40,
        lines: [
          { chords: 'E5 G5 / A5 F5 …', text: 'Los quieres ver / Con la cara podrida ?' },
          { chords: 'E5 G5 A5 / F5,E5, G5, E5 …', text: 'Refuérzales el alma / Ya vencida' },
          { chords: 'G5 A5 / F5,E5, G5, E5 …', text: 'Házles dejar para siempre / Su “vitamina”' },
          { chords: 'G5 A5 / F5,E5, G5, E5 …', text: 'Házles entrar aire puro / En su pobre vida' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 30,
        lines: [
          { chords: 'A5 G5', text: 'Casi basura humana' },
          { chords: 'A5 G5', text: 'Escoria de sociedad' },
          { chords: 'A5 G5', text: 'Casi basura humana' },
          { chords: 'A5 F5 …', text: 'Escoria de sociedad …de sociedad, …de sociedad' }
        ]
      },
      {
        type: 'solo',
        title: 'Cambio de Ritmo y Solo',
        durationSec: 35,
        lines: [
          { chords: 'B, C … DCB, CB', text: 'TRIADAS' },
          { chords: '(E5G5, E5A5, E5A#A5 / E5G5, E5A5, E5G#G5F5E5) X 2', text: '[ Sección 1 ]' },
          { chords: '(A5C5, A5D5, A5D#D5 / A5C5, A5D5, A5C#C5A#A5) X 2', text: '[ Sección 2 ]' },
          { chords: '(E5G5, E5A5, E5A#A5 / E5G5, E5A5, E5G#G5F5E5) X 2 …F5E5', text: '[ Sección 3 ]' }
        ]
      },
      {
        type: 'bridge',
        title: 'Cambio de Tono',
        durationSec: 30,
        lines: [
          { chords: 'C5 / D5 A#,A5, C5, A5 …', text: 'Estás conciente, / De lo que puede suceder ?' },
          { chords: 'C5 / D5 A#,A5, C5, A5 …', text: 'Sus vida en un infierno / Van a perder' },
          { chords: 'C5 / D5 A#,A5, C5, A5 …', text: 'La buena obra de tu vida / puedes hacer' },
          { chords: 'C5 D5', text: 'Dáles un poco de camino / No hay que ser' }
        ]
      },
      {
        type: 'outro',
        title: 'Coro Final y FIN',
        durationSec: 30,
        lines: [
          { chords: 'D5 C5', text: 'Casi basura humana' },
          { chords: 'D5 C5', text: 'Escoria de sociedad' },
          { chords: 'D5 C5', text: 'Casi basura humana' },
          { chords: 'D5 A#A5 C5 A5…', text: 'Escoria de sociedad' },
          { chords: 'A5 D5 C5, A5…', text: '…de sociedad, …de sociedad, …de sociedad, FIN.' }
        ]
      }
    ]
  },
  {
    id: 'cambios-por-rock-nd-roll',
    order: 6,
    title: 'Cambios por Rock´nd Roll',
    estimatedDurationSec: 240,
    sections: [
      {
        type: 'intro',
        title: 'Intro con Arpeggio',
        durationSec: 30,
        lines: [
          { chords: 'C G Am', text: 'Uuuuhhh Uuh Uhhh Uhhh / Aaaahhh Aaaaaah Aaahhh…' },
          { chords: 'C G Am', text: 'Instantes eternos, incoloros sin sabor' },
          { chords: 'C G Am', text: 'Que no calman mis ansias, me dejan sin control' },
          { chords: 'C G Am', text: 'Cómo recio plástico me siento ahora yo' },
          { chords: 'C G', text: 'Los pensamientos ahogan mi ser…' },
          { chords: 'Am', text: 'Ahora recuerdo, ese no soy yo.' },
          { chords: 'C G Am', text: 'Uuuuhhh Uuh Uhhh Uhhh / Aaaahhh Aaaaaah Aaahhh… (Bombo batería)' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1 (Power Chords G5 slide to A5)',
        durationSec: 35,
        lines: [
          { chords: 'G5 -> A5', text: 'Despertándo de ese estado' },
          { chords: 'G5 -> A5', text: 'De mi curva sus líneas rasco' },
          { chords: 'F5 G5', text: 'Y sus agresivos tonos' },
          { chords: 'F5 G5', text: 'Aumentan en mucho mi calor' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 35,
        lines: [
          { chords: 'G5 -> A5', text: 'Empiezo a crear otra canción' },
          { chords: 'G5 -> A5', text: 'No es una canción de amor' },
          { chords: 'F5 G5', text: 'Sólo es lo que cambia mis ansias' },
          { chords: 'F5 G5', text: 'Me siento ya mucho mejor' },
          { chords: 'G5 -> A5', text: 'No se a veces que me pasa' },
          { chords: 'G5 -> A5', text: 'No estoy conforme con mi estar' },
          { chords: 'F5 G5', text: 'Bueno eso ya no importa,' },
          { chords: 'F5 G5', text: 'Lo que importa ahora es rock and rollear / Ah ah aaahh …' }
        ]
      },
      {
        type: 'solo',
        title: 'Solo',
        durationSec: 25,
        lines: [
          { chords: 'G5 slide to A5 x 4 times', text: '[ SOLO ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 3 (Repetición)',
        durationSec: 40,
        lines: [
          { chords: 'G5 -> A5', text: 'Despertándo de ese estado / De mi curva sus líneas rasco' },
          { chords: 'F5 G5', text: 'Y sus agresivos tonos / Aumentan en mucho mi calor' },
          { chords: 'G5 -> A5', text: 'Empiezo a crear otra canción / No es una canción de amor' },
          { chords: 'F5 G5', text: 'Sólo es lo que cambia mis ansias / Me siento ya mucho mejor' },
          { chords: 'G5 -> A5', text: 'No se a veces que me pasa / No estoy conforme con mi estar' },
          { chords: 'F5 G5', text: 'Bueno eso ya no importa,' },
          { chords: 'F5 G5', text: 'Lo que importa ahora es rock and rollear / Ah ah aaahh …' }
        ]
      },
      {
        type: 'outro',
        title: 'Outro y Solos - END',
        durationSec: 40,
        lines: [
          { chords: 'G5 -> A5 etc', text: 'Rock and rollear, Rock and rollear (x 4)' },
          { chords: 'G5 slide to A5 etc', text: '[ SOLO… ]' },
          { text: 'Rock and rollear, Rock and rollear, Rock and rolleaaaaaaaaaaaar…' },
          { chords: 'G5 -> A5', text: 'Rock and rolleaaar…' },
          { text: 'Uuuuuuuuuuhhh Uuhhhhhhh…. END' }
        ]
      }
    ]
  },
  {
    id: 'dios-dinero',
    order: 7,
    title: 'Dios Dinero',
    bpm: 146,
    tempoLabel: 'Allegro - Hard Rock',
    estimatedDurationSec: 200,
    sections: [
      {
        type: 'intro',
        title: 'Intro Guitarra y Batería',
        durationSec: 25,
        lines: [
          { chords: 'A5,G5,F5,A5 / G5,F5,A5 / G5,F5,A5,G5', text: '[ Intro Riff ]' },
          { chords: 'A5 x 4, D5 x 2, A5 x 2 | D5,E5…D5,E5,G5,A5…', text: '[ Hard Rock Con Guitarra ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 35,
        lines: [
          { chords: 'A5', text: 'He aquí un bien, he aquí otro mal' },
          { chords: 'D5 E5 D5 E5 G5 A5', text: 'Que sólo el hombre puede alcanzar' },
          { chords: 'A5', text: 'Ya no quiero ni pensar, lo que puede ocasionar' },
          { chords: 'D5 E5 D5 E5 G5 A5', text: 'Ese máldito bien, Dinero universal' },
          { chords: 'A5', text: 'Tráelo siempre en la cabeza, como una religión' },
          { chords: 'D5 A5', text: 'Lo utilizas con certeza, contada es la ocasión' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 25,
        lines: [
          { chords: 'D5 E5 D5 E5 G5 A5', text: 'Dinero poseélo, dinero de buena fé' },
          { chords: 'D5 E5 D5 E5 G5 A5', text: 'Dinero maldito, no te haga perder…' }
        ]
      },
      {
        type: 'solo',
        title: 'Solo',
        durationSec: 25,
        lines: [
          { text: '[ SOLO - Música de Coro x 4 ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 25,
        lines: [
          { chords: 'A5', text: 'Es que mueve al mundo, La violencia y el terror' },
          { chords: 'D5 A5', text: 'La risa no la perdona, es casi como un Dios' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro Final - FIN',
        durationSec: 35,
        lines: [
          { chords: 'D5 E5 D5 E5 G5 A5', text: 'Dinero poseélo, dinero de buena fé' },
          { chords: 'D5 E5 D5 E5 G5 A5', text: 'Dinero maldito, no te haga perder…' },
          { chords: 'D5 E5 D5 E5 G5 A5', text: 'Dinero maldito, no te haga perdeeer… FIN' }
        ]
      }
    ]
  },
  {
    id: 'generaciones-futuras',
    order: 8,
    title: 'Generaciones Futuras',
    estimatedDurationSec: 250,
    sections: [
      {
        type: 'intro',
        title: 'Estribillo',
        durationSec: 20,
        lines: [
          { chords: 'D5 -> E5 x3 | G5, bG5, E5, D5 (x2)', text: '[ Estribillo ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 35,
        lines: [
          { text: 'Están acabando con todo lo bello que hay en el mundo' },
          { text: 'están destruyendo hermosos paisajes de ríos y mares profundos' },
          { text: 'Todos sabemos que el hombre construye Y ellos destruyen' },
          { text: 'Que somos la especie más consumista De éste universo' }
        ]
      },
      {
        type: 'solo',
        title: 'Círculo de Guitarra',
        durationSec: 15,
        lines: [
          { text: '[ 2 VUELTAS CIRCULO DE GUITARRA ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 35,
        lines: [
          { text: 'Están contagiados por mentes oscuras De ideas violentas' },
          { text: 'Estándesintegrando todo lo hermoso En los mares Ballenas' },
          { chords: 'E5 D5', text: 'Hey, tu no eres de aquí, No, no eres de aquí' },
          { chords: 'E5 D5', text: 'Hey, tu no eres de aquí, No, no eres de aquí' }
        ]
      },
      {
        type: 'bridge',
        title: 'Cambio de Ritmo',
        durationSec: 20,
        lines: [
          { chords: 'B,B,A,B,A / A,A,A,G,A,G / D,D,D,D,E,G / E,G,E,G x 4', text: '[ Riff Cambio de Ritmo ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Declamado',
        durationSec: 35,
        lines: [
          { text: 'Generaciones futuras: Jamás verán completa' },
          { text: 'La flora y la fauna de ésta tierra' },
          { text: 'Unicamente verán las imágenes extintas en videos y libros de bibliotecas' },
          { text: 'y eso será un producto más de la inventiva electrónica' },
          { text: 'pero nada más, pero nada más… pero nada máaas… !!!' }
        ]
      },
      {
        type: 'solo',
        title: 'Solo y Requinto',
        durationSec: 30,
        lines: [
          { text: '[ SOLO … 4 Tiempos o 6 tiempos ]' },
          { chords: 'E5 D5', text: 'Hey, tu no eres de aquí, No, no eres de aquí (x2)' },
          { text: '[ REQUINTO: 4 VUELTAS ]' }
        ]
      },
      {
        type: 'outro',
        title: 'Final',
        durationSec: 30,
        lines: [
          { text: 'Es verdad, yo no soy de éste mundo, Mi mente proviene de generaciones futuras' },
          { text: 'Por eso les grito, por eso les digo, por eso les canto:' },
          { text: 'Que dejen vivir algo de éste mundoooo. !!!' },
          { chords: 'E5', text: 'Hey, tu no eres de aquí… END' }
        ]
      }
    ]
  },
  {
    id: 'breaking-the-law',
    order: 9,
    title: 'Breaking The Law (Judas Priest)',
    estimatedDurationSec: 160,
    sections: [
      {
        type: 'intro',
        title: 'Figura Principal',
        durationSec: 15,
        lines: [
          { text: '[ Figura Principal Riff ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verse 1',
        durationSec: 30,
        lines: [
          { text: 'There I was completely wasted, out of work and down' },
          { text: "All inside it's so frustrating as I drift from town to town" },
          { text: 'Feel as though nobody cares if I live or die' },
          { text: 'So I might as well begin to put some action in my life' }
        ]
      },
      {
        type: 'chorus',
        title: 'Chorus',
        durationSec: 20,
        lines: [
          { text: 'Breaking the law, breaking the law (x 4)' }
        ]
      },
      {
        type: 'verse',
        title: 'Verse 2',
        durationSec: 30,
        lines: [
          { text: "So much for the golden future I can't even start" },
          { text: "I've had every promise broken, there's anger in my heart" },
          { text: "You don't know what it's like, you don't have a clue" },
          { text: "If you did you'd find yourselves doing the same thing too" }
        ]
      },
      {
        type: 'chorus',
        title: 'Chorus Final',
        durationSec: 25,
        lines: [
          { text: 'Breaking the law, breaking the law (x 4)' }
        ]
      }
    ]
  },
  {
    id: 'el-bar-de-mi-barrio',
    order: 10,
    title: 'El Bar de Mi Barrio',
    bpm: 132,
    tempoLabel: 'Adagio',
    estimatedDurationSec: 240,
    sections: [
      {
        type: 'intro',
        title: 'Intro',
        durationSec: 20,
        lines: [
          { chords: '(C5,G5 x 3 … A5) x 2', text: '[ Intro ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 35,
        lines: [
          { chords: 'A5 F5', text: 'Solitario vago por las calles de mi barrio' },
          { chords: 'A5 F5 / G5', text: 'creo no me siento bien, algo quiero absorber' },
          { chords: 'A5 F5', text: 'Yo sé mal me hago, Pues mi utilidad malgasto' },
          { chords: 'A5 F5 / G5', text: 'Ya no sé qué hacer, Ya no quiero beber' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 30,
        lines: [
          { chords: 'C5 G5', text: 'Y entro al bar de mi barrio, Compañía yo no pago' },
          { chords: 'C5 G5 / A5', text: 'quiero me sirvan algo, algo de beber ( Bis )' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 35,
        lines: [
          { chords: 'A5 F5', text: 'y al otro día me levanto, muy temprano me levanto' },
          { chords: 'A5 F5 / G5', text: 'la resaca está dura, no puedo dormir' },
          { chords: 'A5 F5', text: 'Dentro de mi algo me dice, Ya deja las botellas' },
          { chords: 'A5 F5 / G5', text: 'Pero es que yo no puedo, Dejar de beber' }
        ]
      },
      {
        type: 'solo',
        title: 'Solo con Puente',
        durationSec: 25,
        lines: [
          { text: '[ SOLO (CON PUENTE EN TONOS DE CORO) ]' },
          { chords: 'B5', text: '(CORO x 2 VECES: AUMENTO EN 1 TONO…) hasta enloquecer' }
        ]
      },
      {
        type: 'outro',
        title: 'Outro y Final',
        durationSec: 40,
        lines: [
          { chords: 'D5 A5', text: 'y vuelvo al bar de mi barrio, cantinero yo pago' },
          { chords: 'D5 A5 / B5', text: 'me meto y yo ya no salgo, hasta embrutecer' },
          { chords: 'D5 A5 … B5', text: 'y vuelvo al bar de mi barrio… (x 6)' },
          { chords: 'B5', text: 'FIN: ( FIGURA DE BLUES EN B5 ) x 2 Veces - FIN' }
        ]
      }
    ]
  }
];
