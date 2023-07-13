class SnakeGame {
    constructor(){
        this.canvas = document.getElementById("game"); 
        this.context = this.canvas.getContext("2d"); 
        this.audio = new Audio('audio/eat.mp3');
        this.defeat = new Audio('audio/defeat.mp3')
        this.defeat.onended = this.reset.bind(this);
        document.addEventListener("keydown", this.onKeyPress.bind(this)); 
    }
    
    init(){ 
        
        
        this.snakex = this.snakey = 10;

        
        this.baitx = this.baity = 5;

         
        this.snakeSize = 5;

        
        this.snakecoordinate = [];

        
        this.grid = this.count = 20;

        
        this.vx = this.vy = 0;

        
        this.timer = setInterval(this.loop.bind(this),1000/15) 
    }

    
    reset(){
        clearInterval(this.timer); 
        this.init() 
    }

    defeatgame(){
        this.playdefeatsound();
    }
    playdefeatsound(){
        this.defeat.play();
        
    }



    
    loop(){
        this.update() 
        this.draw() 

    }
    
    update(){
        
        this.snakex += this.vx; 
        this.snakey += this.vy; 

        
        
        if(this.snakex < 0){ 
            this.snakex = this.count -1; 
        }
        
        if(this.snakey < 0){ 
            this.snakey = this.count -1; 
        }
        
        if(this.snakex > this.count -1){ 
            this.snakex =0; 
        }
        
        if(this.snakey > this.count -1){
            this.snakey = 0; 
        }
        
         this.snakecoordinate.forEach(sc => {
            if(this.snakex === sc.snakex && this.snakey === sc.snakey){
                this.defeatgame()
                this.reset();
                
            }
         })
        
        this.snakecoordinate.push({snakex : this.snakex, snakey: this.snakey});

        
        while(this.snakecoordinate.length > this.snakeSize){ 
            this.snakecoordinate.shift();
        }
        
        if(this.baitx === this.snakex && this.baity === this.snakey){
            this.audio.play()
            this.snakeSize++ 
           
            this.baitx = Math.floor(Math.random() * this.count)
            this.baity = Math.floor(Math.random() * this.count)

        }





    }


    
    draw(){ 
        this.context.fillStyle = "black"; 
        this.context.fillRect(0 , 0 , this.canvas.width , this.canvas.height); 

        
        this.context.fillStyle = "white";
        this.context.font = "20px Arial"; 
        this.context.fillText(this.snakeSize, 20 , 40);

        

        this.context.fillStyle = "yellow"
        this.snakecoordinate.forEach(sc => {
            this.context.fillRect(sc.snakex * this.grid , sc.snakey * this.grid , this.grid - 5 , this.grid - 5) 
        })
        
        
        
        this.context.fillStyle = "red";
        this.context.fillRect(this.baitx * this.grid , this.baity * this.grid , this.grid - 5 , this.grid - 5) 
        
    }
    onKeyPress(e){ 
        
         
        if(e.keyCode === 65 && this.vx != 1){ 
            this.vx = -1; 
            this.vy = 0; 
        }

        
        if(e.keyCode === 87 && this.vy != 1){ 
            this.vx = 0; 
            this.vy = -1; 
        }

        
        if(e.keyCode === 68 && this.vx != -1){ 
            this.vx = 1;
            this.vy = 0;
        }

        
        if(e.keyCode === 83 && this.vy != -1){ 
            this.vx = 0; 
            this.vy = 1; 
        }
    }
}



 

const game = new SnakeGame()

window.onload = () => game.init(); 