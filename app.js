new Vue({
   el: '#app',
   data: {
       playerHealth: 100,
       monsterHealth: 100,
       gameIsRunning: false,
       turns: []

   },
   methods: {
       startGame: function() {
           this.gameIsRunning = true;
           this.playerHealth = 100;
           this.monsterHealth = 100;
           this.turns = []
       },
       attack: function() {
           var damage = this.calculateDamage(1, 10);
           this.monsterHealth -= damage;
           this.monsterAttacks(); 
           this.turns.unshift({
               isPlayer: true,
               text: 'Player hits Monster for '  + damage
           })
           this.checkwin();

       },
       specialAttack: function() {
           var damage = this.calculateDamage(8, 15);
           this.monsterHealth -= damage;
           this.monsterAttacks();
           this.turns.unshift({
               isPlayer: true,
               text: 'Player specialhits Monster for '  + damage
        })
           this.checkwin();
       },
       monsterAttacks: function () {
           var damage = this.calculateDamage(5, 10);
           this.playerHealth -= damage; 
           this.turns.unshift({
               isPlayer: false,
               text: 'Monster hits Player for '  + damage
        })
       },
       heal: function(){
           if(this.playerHealth < 100){
               var healvalue = this.calculateHeal();
               this.playerHealth += healvalue;
           }else{
               this.playerHealth = 100;
           }
           this.turns.unshift({
               isPlayer: true,
               text: 'Player heals for ' + healvalue
        })
           this.monsterAttacks();
       },
       giveUp: function(){
           this.gameIsRunning = false;
           this.turns = [];
       },
       calculateDamage: function(min, max) {
           return Math.max(Math.floor(Math.random() * max) + 1, min);
       },
       calculateHeal: function(){
           var max = 100 - this.playerHealth;
           return Math.max(Math.floor(Math.random() * max) + 1, 1);
       },
       checkwin: function(){
           if(this.monsterHealth <=0){
               if(confirm('You Won! New Game?')){
                   this.startGame();
               }else {
                   this.monsterHealth = 0;
                   this.gameIsRunning = false;
               }
           }else if(this.playerHealth <=0){
               if(confirm('You Won! New Game?')){
                this.startGame();
               }else {
                   this.playerHealth = 0;
                   this.gameIsRunning = false;
               }
           }
       }
    }
   })