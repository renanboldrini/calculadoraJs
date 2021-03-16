class CalcController {
    constructor(){

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
        this.setDisplayDateTime();
        setInterval(()=>{
            this.setDisplayDateTime();
        }, 1000);

    }

    addEventListenerAll(elemento, events, fn){

        events.split(' ').forEach(event => {

            elemento.addEventListener(event, fn, false)

        });

    }

    clearAll(){
        this._operation = [];
    }

    clearEntry() {
        //function pop, edeleta a ultima posição do array
        this._operation.pop();

    }

    getLastOperation(){

        return this._operation[this._operation.length-1]

    }

    setLastOperation(value){

        this._operation[this._operation.length-1] = value;

    }

    isOperator(value){
        
        //indexOf para buscar se o values passado esta em algua posição deste array, se n encontrar retorna -1
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);

    }

    addOperation(value){

        if(isNaN(this.getLastOperation())){
            
            if(this.isOperator(value)) {

                this.setLastOperation(value);

            } else if(isNaN(value)){
                console.log(value);
            } else {
                this._operation.push(value); 
            }

        } else {
            //number
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue)); 
        }


        //push, function nativa q adiciona na ultima posição do array       
          
        console.log(this._operation);
    }

    setError(){
        this.displayCalc = "Error";
    }

    execBtn(value){

        switch (value) {
            
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break; 
            case 'subtracao':
                this.addOperation('-');
                break; 
            case 'divisao':
                this.addOperation('/');
                break; 
            case 'multiplicacao':
                this.addOperation('*');
                break;        
            case 'porcento':
                this.addOperation('%');
                break;  
            case 'igual':
                
                break; 
            case 'ponto':
                this.addOperation('.');
                break


            case '0':
            case '1':
            case '2':                    
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            
            default:
                this.setError();
                break;
        }

    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); //querySelectorAll pega todos os elementos e o querySelector o primeiro q encontrar
    
        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, "click drag", e=>{

                let textBtn = btn.className.baseVal.replace("btn-","");

                this.execBtn(textBtn);
    
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{

                btn.style.cursor = "pointer";
    
            });
        });

    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(valor){
        this._displayCalcEl.innerHTML = valor;
    }
    
    get currentDate(){
        return new Date();
    }

    set currentDate(valor){
        this.currentDate = valor; 
    }



}