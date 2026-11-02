export interface ChordToken {
  chord?: string;
  text: string;
}

export interface SongLine {
  chords?: string;
  text: string;
  tokens?: ChordToken[];
}

export interface SongSection {
  type: 'intro' | 'verse' | 'chorus' | 'solo' | 'outro' | 'bridge';
  title?: string;
  durationSec?: number;
  lines: SongLine[];
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
  // 1. SR. MUERTE (Pages 3-4)
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
          {
            chords: 'G',
            text: 'Un fantasma',
            tokens: [
              { text: 'Un ' },
              { chord: 'G', text: 'fantasma' }
            ]
          },
          {
            chords: 'F, C',
            text: 'naufraga en la nada',
            tokens: [
              { text: 'naufraga en ' },
              { chord: 'F, C', text: 'la nada' }
            ]
          },
          {
            chords: 'G',
            text: 'Por doquiera',
            tokens: [
              { text: 'Por ' },
              { chord: 'G', text: 'doquiera' }
            ]
          },
          {
            chords: 'F, C',
            text: 'anda y daña',
            tokens: [
              { text: 'anda y ' },
              { chord: 'F, C', text: 'daña' }
            ]
          },
          {
            chords: 'Am Am7Em',
            text: 'No sabes si a tu lado está, no sabes',
            tokens: [
              { text: 'No ' },
              { chord: 'Am', text: 'sabes si a tu lado está, ' },
              { chord: 'Am7Em', text: 'no sabes' }
            ]
          },
          {
            chords: 'Am Am7Em',
            text: 'No sabes cuando por ti vendrá, no sabes',
            tokens: [
              { text: 'No ' },
              { chord: 'Am', text: 'sabes cuando por ti vendrá, ' },
              { chord: 'Am7Em', text: 'no sabes' }
            ]
          }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 25,
        lines: [
          {
            chords: 'G',
            text: 'En un cuadro de horror',
            tokens: [
              { text: 'En un ' },
              { chord: 'G', text: 'cuadro de horror' }
            ]
          },
          {
            chords: 'F, C',
            text: 'siempre estás presente',
            tokens: [
              { text: 'siempre estás ' },
              { chord: 'F, C', text: 'presente' }
            ]
          },
          {
            chords: 'G',
            text: 'Maldita confusión',
            tokens: [
              { text: 'Maldita ' },
              { chord: 'G', text: 'confusión' }
            ]
          },
          {
            chords: 'F, C',
            text: 'Tu corazón no siente',
            tokens: [
              { text: 'Tu corazón no ' },
              { chord: 'F, C', text: 'siente' }
            ]
          }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 25,
        lines: [
          {
            chords: 'Am Am7Em',
            text: 'Oooh Sr. Muerte, déjame vivir más',
            tokens: [
              { chord: 'Am', text: 'Oooh Sr. Muerte, déjame ' },
              { chord: 'Am7Em', text: 'vivir más' }
            ]
          },
          {
            chords: 'Am Am7Em',
            text: 'Conmigo Sr. Muerte, cuando terminarás ?',
            tokens: [
              { text: 'Conmigo ' },
              { chord: 'Am', text: 'Sr. Muerte, ' },
              { chord: 'Am7Em', text: 'cuando terminarás ?' }
            ]
          }
        ]
      },
      {
        type: 'solo',
        title: 'Guitarra',
        durationSec: 20,
        lines: [
          { chords: 'G,F,C x 2 Times', text: '[ Solo de Guitarra ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 3',
        durationSec: 30,
        lines: [
          {
            chords: 'Am Am7Em',
            text: 'Sin materia es tu existencia aaahh',
            tokens: [
              { text: 'Sin ' },
              { chord: 'Am', text: 'materia es tu ' },
              { chord: 'Am7Em', text: 'existencia aaahh' }
            ]
          },
          {
            chords: 'Am Am7 Em',
            text: 'Por eso es que ni una lágrima tu derramarás',
            tokens: [
              { text: 'Por eso ' },
              { chord: 'Am', text: 'es que ni una lágrima tu ' },
              { chord: 'Am7 Em', text: 'derramarás' }
            ]
          },
          {
            chords: 'Am Am7 Em',
            text: 'Sin amenazas cumples tu crítica encomienda',
            tokens: [
              { text: 'Sin ' },
              { chord: 'Am', text: 'amenazas cumples tu crítica ' },
              { chord: 'Am7 Em', text: 'encomienda' }
            ]
          },
          {
            chords: 'Am Am7 Em',
            text: 'Déjanos saber: quien a ti te manda ?',
            tokens: [
              { chord: 'Am', text: 'Déjanos saber: quien a ti ' },
              { chord: 'Am7', text: 'te ' },
              { chord: 'Em', text: 'manda ?' }
            ]
          }
        ]
      },
      {
        type: 'solo',
        title: 'Solo',
        durationSec: 30,
        lines: [
          { chords: 'G,F,C x 2 Times', text: '[ Guitarra ]' },
          { chords: 'Am, Am7 Em x 2 Times | G, F, C x 2 Times', text: '[ SOLO ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 4',
        durationSec: 25,
        lines: [
          {
            chords: 'Am Am7Em',
            text: 'No sabes si a tu lado está, no sabes',
            tokens: [
              { text: 'No ' },
              { chord: 'Am', text: 'sabes si a tu lado está, ' },
              { chord: 'Am7Em', text: 'no sabes' }
            ]
          },
          {
            chords: 'Am Am7Em',
            text: 'No sabes cuando por ti vendrá, no sabes',
            tokens: [
              { text: 'No ' },
              { chord: 'Am', text: 'sabes cuando por ti vendrá, ' },
              { chord: 'Am7Em', text: 'no sabes' }
            ]
          },
          {
            chords: 'G F, C',
            text: 'No sabes si a tu lado está, no sabes',
            tokens: [
              { text: 'No ' },
              { chord: 'G', text: 'sabes si a tu lado está, ' },
              { chord: 'F, C', text: 'no sabes' }
            ]
          },
          {
            chords: 'G F, C',
            text: 'No sabes cuando por ti vendrá, no sabes',
            tokens: [
              { text: 'No ' },
              { chord: 'G', text: 'sabes cuando por ti vendrá, ' },
              { chord: 'F, C', text: 'no sabes' }
            ]
          }
        ]
      },
      {
        type: 'outro',
        title: 'Tarareo y Silbido - FIN',
        durationSec: 35,
        lines: [
          {
            chords: 'Am Am7 Em',
            text: 'La la lalara, la la lalarala la lala laaaa…',
            tokens: [
              { chord: 'Am', text: 'La la lalara, ' },
              { chord: 'Am7 Em', text: 'la la lalarala la lala laaaa…' }
            ]
          },
          {
            chords: 'Am Am7 Em',
            text: 'La la lalara, la la lalarala la lala laaaa…',
            tokens: [
              { chord: 'Am', text: 'La la lalara, ' },
              { chord: 'Am7 Em', text: 'la la lalarala la lala laaaa…' }
            ]
          },
          {
            chords: 'G F C',
            text: 'Shara lalá, shara lalá, la lala lalá',
            tokens: [
              { chord: 'G', text: 'Shara lalá, shara lalá, ' },
              { chord: 'F C', text: 'la lala lalá' }
            ]
          },
          {
            chords: 'G F C',
            text: 'Shara lalá, shara lalá, la lala lalá',
            tokens: [
              { chord: 'G', text: 'Shara lalá, shara lalá, ' },
              { chord: 'F C', text: 'la lala lalá' }
            ]
          },
          { chords: 'Am, Am7 Em x2 | G F C x2', text: '[ Melodía acompañada con silbido… FIN ]' }
        ]
      }
    ]
  },

  // 2. AL MENOR TRABAJADOR (Page 5)
  {
    id: 'al-menor-trabajador',
    order: 2,
    title: 'Al Menor Trabajador',
    estimatedDurationSec: 240,
    sections: [
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 35,
        lines: [
          { text: 'Los años se te vienen, caminando tu estarás' },
          { text: 'Tomándo decisiones, ahora sólo lo intentarás' },
          { text: 'Lleno de incertirtidumbre, piensa bien decídete' },
          { text: 'Dos caminos en la vida, escoge bién. Muévete' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 35,
        lines: [
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
        title: 'Solo de Guitarra',
        durationSec: 25,
        lines: [
          { text: '[ *** SOLO DE GUITARRA *** ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 3',
        durationSec: 35,
        lines: [
          { text: 'La situación es muy pobre, casi imposible avanzar' },
          { text: 'Pero si te lo propones, sólo así progresarás' },
          { text: 'Ordena tus pensamientos, tendrás suerte en el amor' },
          { text: 'Por si tú no lo sabes: todo radica en la acción' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 4',
        durationSec: 35,
        lines: [
          { text: 'Si ya estás en malos pasos, reflexiona tu accionar' },
          { text: 'Recuerda mi amigo, nunca es tarde para empezar' },
          { text: 'Sé fuerte contigo mismo, es difícil lo sé yo' },
          { text: 'Pero si tú no lo haces, caerás en la acción' }
        ]
      },
      {
        type: 'outro',
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

  // 3. SUSY PELEONERA (Page 6)
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
        durationSec: 10,
        lines: [
          { text: 'INTRO PUNK CON GUITARRA' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 25,
        lines: [
          { text: 'Uh ehh, Susy Peleonera es' },
          { text: 'Uh ehh, Susy Peleonera es' },
          { text: 'Me quiere agandallar' },
          { text: 'No sabe Susy lo que quiere' },
          { text: 'Se quiere destrampar' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro 1',
        durationSec: 20,
        lines: [
          { text: 'Susy peleonera es y su hermana es igual' },
          { text: 'Es una cabeza dura, sólo quiere pelear Uh ehh, Uh Uh ehh' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 25,
        lines: [
          { text: 'Uh ehh, Susy Peleonera es' },
          { text: 'Uh ehh, Susy Peleonera es' },
          { text: 'No entiende hablando con palabras' },
          { text: 'Solo quiere pelear' },
          { text: 'Y todos los que la conocen' },
          { text: 'Le tienen miedo ya' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro 2',
        durationSec: 20,
        lines: [
          { text: 'Susy peleonera es y su hermana es igual' },
          { text: 'Es una chica muy caliente, me quiere agandallar Uh ehh, Uh Uh ehh' }
        ]
      },
      {
        type: 'solo',
        title: 'Solo',
        durationSec: 15,
        lines: [
          { text: '[ SOLO… ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 3',
        durationSec: 25,
        lines: [
          { text: 'Uh ehh, Susy Peleonera es' },
          { text: 'Uh ehh, Susy Peleonera es' },
          { text: 'No entiende hablando con palabras' },
          { text: 'Solo quiere pelear' },
          { text: 'Y todos los que la conocen' },
          { text: 'Le tienen miedo ya' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro 3',
        durationSec: 20,
        lines: [
          { text: 'Susy peleonera es y su hermana es igual' },
          { text: 'Es una chica muy caliente, me quiere ella violar Uuh, Uh Uh ehh, Uh Uh ehh' }
        ]
      },
      {
        type: 'outro',
        title: 'Voz con Batería - Outro',
        durationSec: 20,
        lines: [
          { text: 'Susy es punk, Susy es punk, Susy es punk Uh Uh ehh, Uh Uh ehh' },
          { text: 'Uh Uh ehh, Uh Uh ehh Uh Uh ehh, Uh Uh ehh' },
          { text: 'Yeaahh.' }
        ]
      }
    ]
  },

  // 4. FLOJO (Pages 7-8)
  {
    id: 'flojo',
    order: 4,
    title: 'Flojo',
    bpm: 140,
    tempoLabel: '140 bpm Allegro',
    estimatedDurationSec: 195,
    sections: [
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 25,
        lines: [
          {
            chords: 'A5 E5',
            text: 'Ya no quiero verte parado en la esquina',
            tokens: [
              { text: 'Ya no ' },
              { chord: 'A5', text: 'quiero verte parado en la ' },
              { chord: 'E5', text: 'esquina' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Perdiendo el tiempo, sin nada que hacer',
            tokens: [
              { chord: 'D5', text: 'Perdiendo el tiempo, sin nada ' },
              { chord: 'A5', text: 'que hacer' }
            ]
          },
          {
            chords: 'A5 E5',
            text: 'Cuando ves que todos se van a la escuela',
            tokens: [
              { text: 'Cuando ' },
              { chord: 'A5', text: 'ves que todos se van a la ' },
              { chord: 'E5', text: 'escuela' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Tu te quedas parado no te quieres mover',
            tokens: [
              { chord: 'D5', text: 'Tu te quedas parado no te quieres ' },
              { chord: 'A5', text: 'mover' }
            ]
          }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 25,
        lines: [
          {
            chords: 'D5 A5',
            text: 'Y es que yo no quiero verte sufrir',
            tokens: [
              { text: 'Y es que ' },
              { chord: 'D5', text: 'yo no quiero ' },
              { chord: 'A5', text: 'verte sufrir' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Y es que solo quiero verte feliz',
            tokens: [
              { text: 'Y es que ' },
              { chord: 'D5', text: 'solo quiero ' },
              { chord: 'A5', text: 'verte feliz' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Y es que yo no quiero verte sufrir',
            tokens: [
              { text: 'Y es que ' },
              { chord: 'D5', text: 'yo no quiero ' },
              { chord: 'A5', text: 'verte sufrir' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Porque solo quiero verte feliz',
            tokens: [
              { chord: 'D5', text: 'Porque solo quiero ' },
              { chord: 'A5', text: 'verte feliz' }
            ]
          }
        ]
      },
      {
        type: 'bridge',
        title: 'Riff de paso',
        durationSec: 15,
        lines: [
          { chords: '…D5 x 8, E5 x 8', text: '[ Riff de paso …D5 x 8, E5 x 8 ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 25,
        lines: [
          {
            chords: 'A5 E5',
            text: 'Tu no debes de hacer siempre lo mismo',
            tokens: [
              { text: 'Tu no ' },
              { chord: 'A5', text: 'debes de hacer siempre lo ' },
              { chord: 'E5', text: 'mismo' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Piensa en los problemas que vas a tener',
            tokens: [
              { text: 'Piensa en ' },
              { chord: 'D5', text: 'los problemas que vas a ' },
              { chord: 'A5', text: 'tener' }
            ]
          },
          {
            chords: 'A5 E5',
            text: 'Si tu vas en la calle, escuela o en algún lugar',
            tokens: [
              { text: 'Si tu ' },
              { chord: 'A5', text: 'vas en la calle, ' },
              { chord: 'E5', text: 'escuela o en algún lugar' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Problemas y broncas te van a llover',
            tokens: [
              { chord: 'D5', text: 'Problemas y broncas ' },
              { chord: 'A5', text: 'te van a llover' }
            ]
          }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 25,
        lines: [
          {
            chords: 'D5 A5',
            text: 'Y es que yo no quiero verte sufrir',
            tokens: [
              { text: 'Y es que ' },
              { chord: 'D5', text: 'yo no quiero ' },
              { chord: 'A5', text: 'verte sufrir' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Y es que solo quiero verte feliz',
            tokens: [
              { text: 'Y es que ' },
              { chord: 'D5', text: 'solo quiero ' },
              { chord: 'A5', text: 'verte feliz' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Y es que yo no quiero verte sufrir',
            tokens: [
              { text: 'Y es que ' },
              { chord: 'D5', text: 'yo no quiero ' },
              { chord: 'A5', text: 'verte sufrir' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Porque solo quiero verte feliz',
            tokens: [
              { chord: 'D5', text: 'Porque solo quiero ' },
              { chord: 'A5', text: 'verte feliz' }
            ]
          }
        ]
      },
      {
        type: 'solo',
        title: 'Solo de Guitarra',
        durationSec: 30,
        lines: [
          { chords: '( A5 E5 D5 A5 ) x 2', text: '[ SOLO de Guitarra - Vuelta 1 ]' },
          { chords: '( D5 A5 ) x 4 … D5 x 8, E5 x 8', text: '[ SOLO de Guitarra - Vuelta 2 ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 3 (Repetición)',
        durationSec: 25,
        lines: [
          {
            chords: 'A5 E5',
            text: 'Tu no debes de hacer siempre lo mismo',
            tokens: [
              { text: 'Tu no ' },
              { chord: 'A5', text: 'debes de hacer siempre lo ' },
              { chord: 'E5', text: 'mismo' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Piensa en los problemas que vas a tener',
            tokens: [
              { text: 'Piensa en ' },
              { chord: 'D5', text: 'los problemas que vas a ' },
              { chord: 'A5', text: 'tener' }
            ]
          },
          {
            chords: 'A5 E5',
            text: 'Si tu vas en la calle, escuela o en algún lugar',
            tokens: [
              { text: 'Si tu ' },
              { chord: 'A5', text: 'vas en la calle, ' },
              { chord: 'E5', text: 'escuela o en algún lugar' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Problemas y broncas te van a llover',
            tokens: [
              { chord: 'D5', text: 'Problemas y broncas ' },
              { chord: 'A5', text: 'te van a llover' }
            ]
          }
        ]
      },
      {
        type: 'outro',
        title: 'Coro y FIN',
        durationSec: 25,
        lines: [
          {
            chords: 'D5 A5',
            text: 'Y es que yo no quiero verte sufrir',
            tokens: [
              { text: 'Y es que ' },
              { chord: 'D5', text: 'yo no quiero ' },
              { chord: 'A5', text: 'verte sufrir' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Porque solo quiero verte feliz',
            tokens: [
              { chord: 'D5', text: 'Porque solo quiero ' },
              { chord: 'A5', text: 'verte feliz' }
            ]
          },
          { chords: 'A5', text: 'FIN ( Figura de Blues en A5 )' }
        ]
      }
    ]
  },

  // 5. ESCORIA (Pages 9, 10, 11)
  {
    id: 'escoria',
    order: 5,
    title: 'Escoria',
    bpm: 130,
    tempoLabel: '130 bpm Allegretto',
    estimatedDurationSec: 240,
    sections: [
      {
        type: 'intro',
        title: 'Intro con Solo',
        durationSec: 25,
        lines: [
          { chords: 'E5,G5,A5,F5,…E5,G5,E5 x 2', text: '[ Riff de Introducción ]' },
          { chords: 'A5,G5, …E5, G5, E5 x 2', text: '[ Intro Parte 2 ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 35,
        lines: [
          {
            chords: 'G5 A5',
            text: 'En la pobreza mal vestidos',
            tokens: [
              { text: 'En la ' },
              { chord: 'G5', text: 'pobreza mal ' },
              { chord: 'A5', text: 'vestidos' }
            ]
          },
          {
            chords: 'F5 …E5, G5, E5',
            text: 'Los puedes ver,',
            tokens: [
              { text: 'Los puedes ' },
              { chord: 'F5 …', text: 'ver,' }
            ]
          },
          {
            chords: 'G5 A5',
            text: 'Piedras rodantes sin camino',
            tokens: [
              { text: 'Piedras ' },
              { chord: 'G5', text: 'rodantes sin ' },
              { chord: 'A5', text: 'camino' }
            ]
          },
          {
            chords: 'F5 …E5, G5, E5',
            text: 'Has de ver',
            tokens: [
              { text: 'Has de ' },
              { chord: 'F5 …', text: 'ver' }
            ]
          },
          {
            chords: 'G5 A5',
            text: 'Intoxicados de por vida',
            tokens: [
              { text: 'Intoxicados ' },
              { chord: 'G5', text: 'de por ' },
              { chord: 'A5', text: 'vida' }
            ]
          },
          {
            chords: 'F5 …E5, G5, E5',
            text: 'No puede ser !!!',
            tokens: [
              { text: 'No puede ' },
              { chord: 'F5 …', text: 'ser !!!' }
            ]
          },
          {
            chords: 'G5 A5',
            text: 'Dales un poco de camino',
            tokens: [
              { text: 'Dales ' },
              { chord: 'G5', text: 'un poco de ' },
              { chord: 'A5', text: 'camino' }
            ]
          },
          {
            chords: 'F5 …E5, G5, E5',
            text: 'No hay que ser',
            tokens: [
              { text: 'No hay que ' },
              { chord: 'F5 …', text: 'ser' }
            ]
          }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 35,
        lines: [
          {
            chords: 'E5 G5',
            text: 'Los quieres ver',
            tokens: [
              { chord: 'E5', text: 'Los quieres ' },
              { chord: 'G5', text: 'ver' }
            ]
          },
          {
            chords: 'A5 F5',
            text: 'Con la cara podrida ?',
            tokens: [
              { chord: 'A5', text: 'Con la cara ' },
              { chord: 'F5', text: 'podrida ?' }
            ]
          },
          {
            chords: 'E5 G5 A5',
            text: 'Refuérzales el alma',
            tokens: [
              { chord: 'E5', text: 'Refuérzales ' },
              { chord: 'G5', text: 'el ' },
              { chord: 'A5', text: 'alma' }
            ]
          },
          {
            chords: 'F5, E5',
            text: 'Ya vencida',
            tokens: [
              { text: 'Ya ' },
              { chord: 'F5, E5', text: 'vencida' }
            ]
          },
          {
            chords: 'G5 A5',
            text: 'Házles dejar para siempre',
            tokens: [
              { text: 'Házles ' },
              { chord: 'G5', text: 'dejar para ' },
              { chord: 'A5', text: 'siempre' }
            ]
          },
          {
            chords: 'F5, E5',
            text: 'Su “vitamina”',
            tokens: [
              { text: 'Su ' },
              { chord: 'F5, E5', text: '“vitamina”' }
            ]
          },
          {
            chords: 'G5 A5',
            text: 'Házles entrar aire puro',
            tokens: [
              { text: 'Házles ' },
              { chord: 'G5', text: 'entrar aire ' },
              { chord: 'A5', text: 'puro' }
            ]
          },
          {
            chords: 'F5, E5',
            text: 'En su pobre vida',
            tokens: [
              { text: 'En su ' },
              { chord: 'F5, E5', text: 'pobre vida' }
            ]
          }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 25,
        lines: [
          {
            chords: 'A5 G5',
            text: 'Casi basura humana',
            tokens: [
              { text: 'Casi ' },
              { chord: 'A5', text: 'basura ' },
              { chord: 'G5', text: 'humana' }
            ]
          },
          {
            chords: 'A5 G5',
            text: 'Escoria de sociedad',
            tokens: [
              { chord: 'A5', text: 'Escoria de ' },
              { chord: 'G5', text: 'sociedad' }
            ]
          },
          {
            chords: 'A5 G5',
            text: 'Casi basura humana',
            tokens: [
              { text: 'Casi ' },
              { chord: 'A5', text: 'basura ' },
              { chord: 'G5', text: 'humana' }
            ]
          },
          {
            chords: 'A5 F5',
            text: 'Escoria de sociedad',
            tokens: [
              { chord: 'A5', text: 'Escoria de ' },
              { chord: 'F5', text: 'sociedad' }
            ]
          },
          {
            chords: 'A5 G5 E5',
            text: '…de sociedad, …de sociedad',
            tokens: [
              { chord: 'A5 G5', text: '…de sociedad, ' },
              { chord: 'E5', text: '…de sociedad' }
            ]
          }
        ]
      },
      {
        type: 'solo',
        title: 'Cambio de Ritmo y Tríadas',
        durationSec: 30,
        lines: [
          { text: 'CAMBIO DE RITMO Y SOLO…' },
          { text: 'TRIADAS: B, C, … DCB, CB' },
          { chords: 'E5G5, E5A5, E5A#A5 / E5G#G5F5E5 x 2', text: '[ Riff Tríadas en E5 ]' },
          { chords: 'A5C5, A5D5, A5D#D5 / A5C#C5A#A5 x 2', text: '[ Riff Tríadas en A5 ]' }
        ]
      },
      {
        type: 'bridge',
        title: 'Cambio de Tono',
        durationSec: 30,
        lines: [
          {
            chords: 'C5',
            text: 'Estás conciente,',
            tokens: [
              { chord: 'C5', text: 'Estás conciente,' }
            ]
          },
          {
            chords: 'D5 A#',
            text: 'De lo que puede suceder ?',
            tokens: [
              { text: 'De lo que ' },
              { chord: 'D5', text: 'puede suceder ?' }
            ]
          },
          {
            chords: 'C5 D5',
            text: 'Sus vida en un infierno',
            tokens: [
              { chord: 'C5', text: 'Sus vida en ' },
              { chord: 'D5', text: 'un infierno' }
            ]
          },
          {
            chords: 'A#',
            text: 'Van a perder',
            tokens: [
              { text: 'Van a ' },
              { chord: 'A#', text: 'perder' }
            ]
          },
          {
            chords: 'C5 D5',
            text: 'La buena obra de tu vida',
            tokens: [
              { chord: 'C5', text: 'La buena obra ' },
              { chord: 'D5', text: 'de tu vida' }
            ]
          },
          {
            chords: 'A#',
            text: 'puedes hacer',
            tokens: [
              { text: 'puedes ' },
              { chord: 'A#', text: 'hacer' }
            ]
          }
        ]
      },
      {
        type: 'outro',
        title: 'Coro Final (en D5 / C5)',
        durationSec: 30,
        lines: [
          {
            chords: 'D5 C5',
            text: 'Casi basura humana',
            tokens: [
              { text: 'Casi ' },
              { chord: 'D5', text: 'basura ' },
              { chord: 'C5', text: 'humana' }
            ]
          },
          {
            chords: 'D5 C5',
            text: 'Escoria de sociedad',
            tokens: [
              { chord: 'D5', text: 'Escoria de ' },
              { chord: 'C5', text: 'sociedad' }
            ]
          },
          {
            chords: 'D5 C5',
            text: 'Casi basura humana',
            tokens: [
              { text: 'Casi ' },
              { chord: 'D5', text: 'basura ' },
              { chord: 'C5', text: 'humana' }
            ]
          },
          {
            chords: 'D5 Bb5',
            text: 'Escoria de sociedad',
            tokens: [
              { chord: 'D5', text: 'Escoria de ' },
              { chord: 'Bb5', text: 'sociedad' }
            ]
          }
        ]
      }
    ]
  },

  // 6. CAMBIOS POR ROCK'ND ROLL (Pages 12-14)
  {
    id: 'cambios-por-rock-nd-roll',
    order: 6,
    title: 'Cambios por Rock´nd Roll',
    tempoLabel: 'Arpeggio & Rock and Roll',
    estimatedDurationSec: 220,
    sections: [
      {
        type: 'intro',
        title: 'Intro con Arpeggio',
        durationSec: 25,
        lines: [
          {
            chords: 'C G Am',
            text: 'Uuuuhhh Uuh Uhhh Uhhh',
            tokens: [
              { chord: 'C', text: 'Uuuuhhh ' },
              { chord: 'G', text: 'Uuh ' },
              { chord: 'Am', text: 'Uhhh Uhhh' }
            ]
          },
          {
            chords: 'C G Am',
            text: 'Aaaahhh Aaaaaah Aaahhh…',
            tokens: [
              { chord: 'C', text: 'Aaaahhh ' },
              { chord: 'G', text: 'Aaaaaah ' },
              { chord: 'Am', text: 'Aaahhh…' }
            ]
          }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 35,
        lines: [
          {
            chords: 'C G Am',
            text: 'Instantes eternos, incoloros sin sabor',
            tokens: [
              { chord: 'C', text: 'Instantes ' },
              { chord: 'G', text: 'eternos, ' },
              { chord: 'Am', text: 'incoloros sin sabor' }
            ]
          },
          {
            chords: 'C G Am',
            text: 'Que no calman mis ansias, me dejan sin control',
            tokens: [
              { chord: 'C', text: 'Que no calman ' },
              { chord: 'G', text: 'mis ansias, ' },
              { chord: 'Am', text: 'me dejan sin control' }
            ]
          },
          {
            chords: 'C G Am',
            text: 'Cómo recio plástico me siento ahora yo',
            tokens: [
              { chord: 'C', text: 'Cómo recio ' },
              { chord: 'G', text: 'plástico ' },
              { chord: 'Am', text: 'me siento ahora yo' }
            ]
          },
          {
            chords: 'C G Am',
            text: 'Los pensamientos ahogan mi ser…',
            tokens: [
              { chord: 'C', text: 'Los pensamientos ' },
              { chord: 'G', text: 'ahogan ' },
              { chord: 'Am', text: 'mi ser…' }
            ]
          },
          {
            chords: 'C G Am',
            text: 'Ahora recuerdo, ese no soy yo.',
            tokens: [
              { chord: 'C', text: 'Ahora recuerdo, ' },
              { chord: 'G', text: 'ese no ' },
              { chord: 'Am', text: 'soy yo.' }
            ]
          }
        ]
      },
      {
        type: 'bridge',
        title: 'Despertar (Bombo)',
        durationSec: 25,
        lines: [
          {
            chords: 'C G Am',
            text: 'Uuuuhhh Uuh Uhhh Uhhh',
            tokens: [
              { chord: 'C', text: 'Uuuuhhh ' },
              { chord: 'G', text: 'Uuh ' },
              { chord: 'Am', text: 'Uhhh Uhhh' }
            ]
          },
          {
            chords: 'C G Am',
            text: 'Aaaahhh Aaaaaah Aaahhh…',
            tokens: [
              { chord: 'C', text: 'Aaaahhh ' },
              { chord: 'G', text: 'Aaaaaah ' },
              { chord: 'Am', text: 'Aaahhh…' }
            ]
          },
          { text: 'Despertándo de ese estado' },
          { text: 'De mi curva sus líneas rasco' },
          { text: 'Y sus agresivos tonos' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2 (Rock and Roll Riff)',
        durationSec: 35,
        lines: [
          { chords: 'G5 slide to A5 x 4 times', text: '[ Riff G5 slide to A5 ]' },
          {
            chords: 'G5 slide to A5',
            text: 'No se a veces que me pasa',
            tokens: [
              { chord: 'G5 slide to A5', text: 'No se a veces que me pasa' }
            ]
          },
          {
            chords: 'G5 slide to A5',
            text: 'No estoy conforme con mi estar',
            tokens: [
              { chord: 'G5 slide to A5', text: 'No estoy conforme con mi estar' }
            ]
          },
          {
            chords: 'F5 G5',
            text: 'Bueno eso ya no importa,',
            tokens: [
              { chord: 'F5', text: 'Bueno eso ' },
              { chord: 'G5', text: 'ya no importa,' }
            ]
          },
          {
            chords: 'A5',
            text: 'Lo que importa ahora es rock and rollear',
            tokens: [
              { chord: 'A5', text: 'Lo que importa ahora es rock and rollear' }
            ]
          }
        ]
      },
      {
        type: 'outro',
        title: 'Coro Final - Rock and Rollear',
        durationSec: 40,
        lines: [
          { text: 'Ah ah aaahh …' },
          { text: 'Rock and rollear, Rock and rollear' },
          { text: 'Rock and rollear, Rock and rollear' },
          { text: 'Rock and rollear, Rock and rollear' },
          { text: 'Rock and rolleaaar… Yeaahh !!' }
        ]
      }
    ]
  },

  // 7. DIOS DINERO (Pages 15-16)
  {
    id: 'dios-dinero',
    order: 7,
    title: 'Dios Dinero',
    bpm: 146,
    tempoLabel: '146 bpm Allegro',
    estimatedDurationSec: 210,
    sections: [
      {
        type: 'intro',
        title: 'Intro Hard Rock',
        durationSec: 20,
        lines: [
          { chords: 'A5, G5, F5, A5', text: '[ INTRO-GUITARRA Y BATERIA ]' },
          { chords: 'G5, F5, A5, G5', text: '[ RITMO HARD ROCK CON GUITARRA ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 30,
        lines: [
          {
            chords: 'A5',
            text: 'He aquí un bien,',
            tokens: [
              { chord: 'A5', text: 'He aquí un bien,' }
            ]
          },
          {
            chords: 'D5 E5 D5 E5 G5 A5',
            text: 'Que sólo el hombre puede alcanzar',
            tokens: [
              { chord: 'D5', text: 'Que sólo el ' },
              { chord: 'E5', text: 'hombre ' },
              { chord: 'D5', text: 'puede ' },
              { chord: 'E5 G5 A5', text: 'alcanzar' }
            ]
          },
          {
            chords: 'A5',
            text: 'Ya no quiero ni pensar,',
            tokens: [
              { chord: 'A5', text: 'Ya no quiero ni pensar,' }
            ]
          },
          {
            chords: 'D5 E5 D5 E5 G5 A5',
            text: 'lo que puede ocasionar',
            tokens: [
              { chord: 'D5', text: 'lo que puede ' },
              { chord: 'E5 G5 A5', text: 'ocasionar' }
            ]
          },
          {
            chords: 'A5',
            text: 'Ese maldito bien, Dinero universal',
            tokens: [
              { chord: 'A5', text: 'Ese maldito bien, Dinero universal' }
            ]
          }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 30,
        lines: [
          { text: 'Tráelo siempre en la cabeza, como una religión' },
          { text: 'Lo utilizas con certeza, contada es la ocasión' },
          { text: 'Dinero poseílo, dinero de buena fé' },
          { text: 'Dinero maldito, no te haga perder…' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 30,
        lines: [
          {
            chords: 'A5',
            text: 'Es que mueve al mundo, la violencia y el terror',
            tokens: [
              { chord: 'A5', text: 'Es que mueve al mundo, la violencia y el terror' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'La risa no la perdona, es casi como un Dios',
            tokens: [
              { chord: 'D5', text: 'La risa no la perdona, ' },
              { text: 'es casi como un ' },
              { chord: 'A5', text: 'Dios' }
            ]
          }
        ]
      },
      {
        type: 'solo',
        title: 'Solo',
        durationSec: 25,
        lines: [
          { chords: 'A5, G5, F5, A5', text: '[ SOLO DE GUITARRA ]' }
        ]
      },
      {
        type: 'outro',
        title: 'Outro',
        durationSec: 25,
        lines: [
          {
            chords: 'A5',
            text: 'Es que mueve al mundo, la violencia y el terror',
            tokens: [
              { chord: 'A5', text: 'Es que mueve al mundo, la violencia y el terror' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'La risa no la perdona, es casi como un Dios',
            tokens: [
              { chord: 'D5', text: 'La risa no la perdona, ' },
              { text: 'es casi como un ' },
              { chord: 'A5', text: 'Dios' }
            ]
          },
          { text: '… FIN' }
        ]
      }
    ]
  },

  // 8. GENERACIONES FUTURAS (Pages 17-18)
  {
    id: 'generaciones-futuras',
    order: 8,
    title: 'Generaciones Futuras',
    tempoLabel: 'Medio Tiempo / Riff',
    estimatedDurationSec: 230,
    sections: [
      {
        type: 'intro',
        title: 'Estribillo / Riff',
        durationSec: 20,
        lines: [
          { chords: 'D5 slide to E5 x 3 | G5, bG5, E5, D5', text: '[ Estribillo con Riff de Guitarra ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 35,
        lines: [
          {
            chords: 'G5, bG5, E5, D5',
            text: 'Están acabando con todo lo bello que hay en el mundo',
            tokens: [
              { text: 'Están acabando con ' },
              { chord: 'G5', text: 'todo ' },
              { chord: 'bG5', text: 'lo ' },
              { chord: 'E5', text: 'bello ' },
              { chord: 'D5', text: 'que hay en el mundo' }
            ]
          },
          { text: 'están destruyendo hermosos paisajes de ríos y mares profundos' },
          { text: 'Todos sabemos que el hombre construye Y ellos destruyen' },
          { text: 'Que somos la especie más consumista De éste universo' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 35,
        lines: [
          { chords: 'D5 slide to E5 x 3', text: '[ 2 VUELTAS CIRCULO DE GUITARRA ]' },
          { text: 'Están contagiados por mentes oscuras De ideas violentas' },
          { text: 'Estándesintegrando todo lo hermoso En los mares Ballenas' }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 30,
        lines: [
          {
            chords: 'E5',
            text: 'Hey, tu no eres de aquí,',
            tokens: [
              { text: 'Hey, tu no eres de ' },
              { chord: 'E5', text: 'aquí,' }
            ]
          },
          {
            chords: 'D5',
            text: 'No, no eres de aquí',
            tokens: [
              { chord: 'D5', text: 'No, no eres de aquí' }
            ]
          },
          {
            chords: 'E5',
            text: 'Hey, tu no eres de aquí,',
            tokens: [
              { text: 'Hey, tu no eres de ' },
              { chord: 'E5', text: 'aquí,' }
            ]
          },
          {
            chords: 'D5',
            text: 'No, no eres de aquí',
            tokens: [
              { chord: 'D5', text: 'No, no eres de aquí' }
            ]
          }
        ]
      },
      {
        type: 'bridge',
        title: 'Declamado',
        durationSec: 30,
        lines: [
          { text: 'Declamado: Generaciones futuras:' },
          { text: 'Jamás verán completa La flora y la fauna de ésta tierra' },
          { text: 'Unicamente verán las imágenes extintas en videos y libros de bibliotecas' }
        ]
      },
      {
        type: 'outro',
        title: 'Coro y Cierre',
        durationSec: 25,
        lines: [
          {
            chords: 'E5',
            text: 'Hey, tu no eres de aquí,',
            tokens: [
              { text: 'Hey, tu no eres de ' },
              { chord: 'E5', text: 'aquí,' }
            ]
          },
          {
            chords: 'D5',
            text: 'No, no eres de aquí',
            tokens: [
              { chord: 'D5', text: 'No, no eres de aquí' }
            ]
          },
          { text: '… FIN' }
        ]
      }
    ]
  },

  // 9. BREAKING THE LAW (Page 19)
  {
    id: 'breaking-the-law',
    order: 9,
    title: 'Breaking The Law (Judas Priest)',
    bpm: 136,
    tempoLabel: '136 bpm Heavy Metal',
    estimatedDurationSec: 165,
    sections: [
      {
        type: 'intro',
        title: 'Intro Riff',
        durationSec: 15,
        lines: [
          { chords: 'Am - F - G', text: '[ Figura Principal Riff ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 25,
        lines: [
          {
            chords: 'Am',
            text: 'There I was completely wasted, out of work and down',
            tokens: [
              { chord: 'Am', text: 'There I was completely wasted, out of work and down' }
            ]
          },
          {
            chords: 'F G',
            text: "All inside it's so frustrating as I drift from town to town",
            tokens: [
              { chord: 'F', text: "All inside it's so frustrating as I " },
              { chord: 'G', text: 'drift from town to town' }
            ]
          },
          {
            chords: 'Am',
            text: 'Feel as though nobody cares if I live or die',
            tokens: [
              { chord: 'Am', text: 'Feel as though nobody cares if I live or die' }
            ]
          },
          {
            chords: 'F G',
            text: 'So I might as well begin to put some action in my life',
            tokens: [
              { chord: 'F', text: 'So I might as well begin to ' },
              { chord: 'G', text: 'put some action in my life' }
            ]
          }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 25,
        lines: [
          {
            chords: 'Am F G',
            text: 'Breaking the law, breaking the law (x 4)',
            tokens: [
              { chord: 'Am', text: 'Breaking the law, ' },
              { chord: 'F', text: 'breaking the ' },
              { chord: 'G', text: 'law (x 4)' }
            ]
          }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 25,
        lines: [
          {
            chords: 'Am',
            text: "So much for the golden future I can't even start",
            tokens: [
              { chord: 'Am', text: "So much for the golden future I can't even start" }
            ]
          },
          {
            chords: 'F G',
            text: "I've had every promise broken, there's anger in my heart",
            tokens: [
              { chord: 'F', text: "I've had every promise broken, " },
              { chord: 'G', text: "there's anger in my heart" }
            ]
          },
          {
            chords: 'Am',
            text: "You don't know what it's like, you don't have a clue",
            tokens: [
              { chord: 'Am', text: "You don't know what it's like, you don't have a clue" }
            ]
          },
          {
            chords: 'F G',
            text: "If you'd had it up to here you'd feel like screwed up too",
            tokens: [
              { chord: 'F', text: "If you'd had it up to here " },
              { chord: 'G', text: "you'd feel like screwed up too" }
            ]
          }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro',
        durationSec: 25,
        lines: [
          {
            chords: 'Am F G',
            text: 'Breaking the law, breaking the law (x 4)',
            tokens: [
              { chord: 'Am', text: 'Breaking the law, ' },
              { chord: 'F', text: 'breaking the ' },
              { chord: 'G', text: 'law (x 4)' }
            ]
          }
        ]
      },
      {
        type: 'outro',
        title: 'Outro',
        durationSec: 20,
        lines: [
          {
            chords: 'Am',
            text: "You don't know what it's like… Breaking the law!",
            tokens: [
              { chord: 'Am', text: "You don't know what it's like… Breaking the law!" }
            ]
          }
        ]
      }
    ]
  },

  // 10. EL BAR DE MI BARRIO (Pages 20-22)
  {
    id: 'el-bar-de-mi-barrio',
    order: 10,
    title: 'El Bar de Mi Barrio',
    bpm: 132,
    tempoLabel: '132 bpm Adagio',
    estimatedDurationSec: 240,
    sections: [
      {
        type: 'intro',
        title: 'Intro',
        durationSec: 20,
        lines: [
          { chords: '( C5, G5 x 3 … A5 ) x 2', text: '[ Intro ( C5, G5 x 3 … A5 ) x 2 ]' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 1',
        durationSec: 30,
        lines: [
          {
            chords: 'A5 F5',
            text: 'Solitario vago',
            tokens: [
              { chord: 'A5', text: 'Solitario ' },
              { chord: 'F5', text: 'vago' }
            ]
          },
          {
            chords: 'A5 F5',
            text: 'por las calles de mi barrio',
            tokens: [
              { chord: 'A5', text: 'por las calles de mi ' },
              { chord: 'F5', text: 'barrio' }
            ]
          },
          {
            chords: 'A5 F5',
            text: 'creo no me siento bien,',
            tokens: [
              { chord: 'A5', text: 'creo no me siento ' },
              { chord: 'F5', text: 'bien,' }
            ]
          },
          {
            chords: 'A5 F5',
            text: 'algo quiero absorber',
            tokens: [
              { chord: 'A5', text: 'algo quiero ' },
              { chord: 'F5', text: 'absorber' }
            ]
          },
          {
            chords: 'A5 F5',
            text: 'Yo sé mal me hago,',
            tokens: [
              { chord: 'A5', text: 'Yo sé mal ' },
              { chord: 'F5', text: 'me hago,' }
            ]
          },
          {
            chords: 'A5 F5',
            text: 'Pues mi utilidad malgasto',
            tokens: [
              { chord: 'A5', text: 'Pues mi ' },
              { chord: 'F5', text: 'utilidad malgasto' }
            ]
          },
          {
            chords: 'A5 F5',
            text: 'Ya no sé qué hacer,',
            tokens: [
              { chord: 'A5', text: 'Ya no sé qué ' },
              { chord: 'F5', text: 'hacer,' }
            ]
          },
          {
            chords: 'A5 F5',
            text: 'Ya no quiero beber',
            tokens: [
              { chord: 'A5', text: 'Ya no ' },
              { chord: 'F5', text: 'quiero beber' }
            ]
          }
        ]
      },
      {
        type: 'chorus',
        title: 'Coro 1',
        durationSec: 30,
        lines: [
          {
            chords: 'D5 A5',
            text: 'Y entro al bar de mi barrio,',
            tokens: [
              { text: 'Y entro al bar de mi ' },
              { chord: 'D5', text: 'barrio,' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'Compañia yo no pago',
            tokens: [
              { chord: 'D5', text: 'Compañia yo no ' },
              { chord: 'A5', text: 'pago' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'quiero me sirvan algo, algo de beber ( Bis )',
            tokens: [
              { chord: 'D5', text: 'quiero me sirvan algo, ' },
              { chord: 'A5', text: 'algo de beber ( Bis )' }
            ]
          }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 2',
        durationSec: 30,
        lines: [
          {
            chords: 'A5 F5',
            text: 'y al otro día me levanto',
            tokens: [
              { text: 'y al ' },
              { chord: 'A5', text: 'otro día me ' },
              { chord: 'F5', text: 'levanto' }
            ]
          },
          {
            chords: 'A5 F5',
            text: 'muy temprano me levanto',
            tokens: [
              { chord: 'A5', text: 'muy temprano me ' },
              { chord: 'F5', text: 'levanto' }
            ]
          },
          {
            chords: 'A5 F5',
            text: 'la resaca está dura',
            tokens: [
              { chord: 'A5', text: 'la resaca está ' },
              { chord: 'F5', text: 'dura' }
            ]
          },
          {
            chords: 'A5 F5',
            text: 'no puedo dormir',
            tokens: [
              { chord: 'A5', text: 'no puedo ' },
              { chord: 'F5', text: 'dormir' }
            ]
          },
          { text: 'Dentro de mi algo me dice,' },
          { text: 'Ya deja las botellas' },
          { text: 'La mente se me cansa' },
          { text: 'No puedo pensar' }
        ]
      },
      {
        type: 'verse',
        title: 'Verso 3',
        durationSec: 30,
        lines: [
          {
            chords: 'D5 A5',
            text: 'y vuelvo al bar de mi barrio',
            tokens: [
              { text: 'y ' },
              { chord: 'D5', text: 'vuelvo al bar de mi ' },
              { chord: 'A5', text: 'barrio' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'cantinero yo pago',
            tokens: [
              { chord: 'D5', text: 'cantinero yo ' },
              { chord: 'A5', text: 'pago' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'me meto y yo ya no salgo,',
            tokens: [
              { text: 'me ' },
              { chord: 'D5', text: 'meto y yo ya no ' },
              { chord: 'A5', text: 'salgo,' }
            ]
          },
          {
            chords: 'D5 A5',
            text: 'hasta embrutecer',
            tokens: [
              { chord: 'D5', text: 'hasta ' },
              { chord: 'A5', text: 'embrutecer' }
            ]
          }
        ]
      },
      {
        type: 'outro',
        title: 'Cierre',
        durationSec: 25,
        lines: [
          {
            chords: 'D5 A5',
            text: 'Y entro al bar de mi barrio, cantinero yo pago…',
            tokens: [
              { chord: 'D5', text: 'Y entro al bar de mi barrio, ' },
              { chord: 'A5', text: 'cantinero yo pago…' }
            ]
          },
          { text: '… FIN' }
        ]
      }
    ]
  }
];
