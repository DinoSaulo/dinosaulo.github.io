class Piano { 

    constructor(canvas, config) {
        this.canvas = canvas;
        this.config = config;
        this.canvas.width = this.config.numKeys * this.config.whiteKeys.width + 2;
        this.canvas.height = this.config.whiteKeys.height + 60;
        this.context = canvas.getContext("2d");
        this.keysState = {  
            white: { 
                "C": false, 
                "D": false, 
                "E": false, 
                "F": false, 
                "G": false, 
                "A": false, 
                "B": false 
            },
            black: [
                {
                    "C#": false,
                    "D#": false
                },
                {
                    "F#": false,
                    "G#": false,
                    "A#": false
                }
            ] 
        }
    }

    draw() {
        const midheight = (this.canvas.height - this.config.whiteKeys.height)/2;
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.drawWhiteKeys(midheight);
        this.drawBlackKeys(midheight);
    }
    
    drawWhiteKeys(midheight) {
        let i = 0;
        
        for(let note in this.keysState.white){
            const path = new Path2D();
            path.rect(30 * i + 1, midheight, this.config.whiteKeys.width, this.config.whiteKeys.height);   

            if(this.keysState.white[note]){
                this.context.fillStyle = "#bfbfbf";    
            } else {
                this.context.fillStyle = "#FFF";    
            }
            
            this.context.stroke(path);
            this.context.fill(path);
            
            i++;
        }
    }
    
    drawBlackKeys(midheight) {
        let startOffset = 31;
        
        for(let i = 0; i < this.keysState.black.length; i++) {
            let y = 0;

            for(let note in this.keysState.black[i]){
                const path = new Path2D();

                path.rect((startOffset + 31 * y) - this.config.blackKeys.width/2, midheight, this.config.blackKeys.width, this.config.blackKeys.height);
                
                if(this.keysState.black[i][note]){
                    this.context.fillStyle = "#000";    
                } else {
                    this.context.fillStyle = "#404040";    
                }
                
                this.context.fill(path);
                
                y++;
            }

            startOffset = startOffset + 90;
        }
    }
    
    setNote(note, bool) {
        if(note.includes("#")){
            this.keysState.black.forEach(group => {
                if (note in group) {
                    group[note] = bool;
                }
            });
        } else {
            this.keysState.white[note] = bool;
        }
    }
}