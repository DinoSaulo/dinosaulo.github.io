const piano = new Piano(document.getElementById("piano"), 
    { 
        whiteKeys: { width: 30, height: 100 }, 
        blackKeys: { width: 25, height: 50 }, 
        numKeys: 7 
    });

piano.draw();

/**
 * Example
 *  //create a synth and connect it to the master output (your speakers)
 *  var synth = new Tone.Synth().toMaster();
 *   
 *  //play a middle 'C' for the duration of an 8th note
 *  synth.triggerAttackRelease("C4", "8n");
 */ 
