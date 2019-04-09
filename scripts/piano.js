console.log("JS Rodando!")

let octave = 4;

const keys = [];
let prevKey = 0;

const Instruments = {
  // https://github.com/stuartmemo/qwerty-hancock
  keyboard: {
    // Lower octave.
    q: 'Cl',
    '2': 'C#l',
    w: 'Dl',
    '3': 'D#l',
    e: 'El',
    r: 'Fl',
    '5': 'F#l',
    t: 'Gl',
    '6': 'G#l',
    y: 'Al',
    '7': 'A#l',
    u: 'Bl',
    // Upper octave.
    i: 'Cu',
    '9': 'C#u',
    o: 'Du',
    '0': 'D#u',
    p: 'Eu',
    '[': 'Fu',
    '-': 'F#u',
    "=": 'Gu',
  },
};

let instrument = Instruments.keyboard;

const keyToNote = key => {
  const note = instrument[ key ];
  if ( !note ) {
    return;
  }

  return Tone.Frequency(
    note
      .replace( 'l', octave )
      .replace( 'u', octave + 1 )
  ).toNote();
};

const onKeyDown = (() => {
  let listener;

  return synth => {
    document.removeEventListener( 'keydown', listener );

    listener = event => {
      const { key } = event;

      // Only trigger once per keydown event.
      if ( !keys[ key ] ) {
        keys[ key ] = true;

        const note = keyToNote( key );
        if ( note ) {
          synth.triggerAttack( note );
          prevKey = key;
        }
      }
    };

    document.addEventListener( 'keydown', listener );
  };
})();

const onKeyUp = (() => {
  let listener;
  let prev;

  return synth => {
    // Clean-up.
    if ( prev ) {
      prev.triggerRelease();
    }

    document.removeEventListener( 'keyup', listener );

    prev = synth;
    listener = event => {
      const { key } = event;
      if ( keys[ key ] ) {
        keys[ key ] = false;

        const note = keyToNote( key );
        if ( synth instanceof Tone.PolySynth ) {
          synth.triggerRelease( note );
        } else if ( note && key === prevKey ) {
          // Trigger release if this is the previous note played.
          synth.triggerRelease();
        }
      }
    };

    document.addEventListener( 'keyup', listener );
  };
})();

// Octave controls.
document.addEventListener( 'keydown', event => {
  // Decrease octave range (min: 0).
  if ( event.key === 'z' ) { octave = Math.max( octave - 1, 0 ); }
  // Increase octave range (max: 10).
  if ( event.key === 'x' ) { octave = Math.min( octave + 1, 9 ); }
});

// Init.
(() => {
  const synth = new Tone.PolySynth( 10 ).toMaster();
  synth.toMaster();

  onKeyDown( synth );
  onKeyUp( synth );
})();
