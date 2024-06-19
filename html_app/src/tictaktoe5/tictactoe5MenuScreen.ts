import { Screens } from "../screens";
import { AppScreen } from "../appScreen";
import { AppStorage } from "../appStorage";
import { mediator } from '../main';

export class Tictactoe5MenuScreen extends AppScreen
{

    protected ttt5Menu_btn01_click(event:MouseEvent, valSize:number):void 
    {
        console.log("ttt5Menu_btn01_click:"+valSize);
        this.storage.special[this.storage.findSpecialById("fieldSize")].value = valSize;
        document.getElementById("ttt5Menu_lbl01")!.innerHTML  = "Game field size:"+valSize;
    }

    protected remove():void
    {
        super.remove();
        document.getElementById("ttt5Menu_btn01")!.removeEventListener('click', (event) =>this.ttt5Menu_btn01_click(event, 15));
        document.getElementById("ttt5Menu_btn02")!.removeEventListener('click', (event) =>this.ttt5Menu_btn01_click(event, 25));
        document.getElementById("ttt5Menu_btn00")!.removeEventListener('click', (event) =>this.ttt5Menu_btn00_click(event));
        //
        document.getElementById("ttt5Menu_btn00")!.remove();
        document.getElementById("ttt5Menu_btn01")!.remove();
        document.getElementById("ttt5Menu_btn02")!.remove();
        document.getElementById("ttt5Menu_lbl01")!.remove();    
        document.getElementById("ttt5Menu_div01")!.remove();
        document.getElementById("ttt5Menu_div02")!.remove();
        document.getElementById("ttt5Menu_div03")!.remove();
    }

    protected ttt5Menu_btn00_click(event:MouseEvent):void 
    {
        console.log("ttt5Menu_btn00_click");
        this.remove();        
        this.storage.gameScreen = Screens.tictactoe5_game;
        this.storage.toChangeScreen = true;
        mediator();
    }

    public screen():void
    {
        console.log("TicTakToo5Screen::screen:"+this.storage.gameScreen);
        this.makeExit("Tic-Tak-Toe Five");
    
        this.storage.special.push({id:"fieldSize", value:15});
        var _fs = this.storage.findSpecialById("fieldSize");    
        //
        var _div;
        var _elem;
        //
        _div = document.createElement('div');
        _div.setAttribute("id", "ttt5Menu_div01");

        _elem = document.createElement('button');
        _elem.textContent = "15";
        _elem.setAttribute("id", "ttt5Menu_btn01");
        _elem.setAttribute("class", "btn1");      
        _elem.addEventListener('click', (event) => this.ttt5Menu_btn01_click(event, 15));  
        _div.appendChild(_elem);

        _elem = document.createElement('button');
        _elem.textContent = "25";
        _elem.setAttribute("id", "ttt5Menu_btn02");
        _elem.setAttribute("class", "btn1");
        _elem.addEventListener('click', (event) => this.ttt5Menu_btn01_click(event, 25));  
        _div.appendChild(_elem);
     
        this.storage.mainField.appendChild(_div);
        //
        _div = document.createElement('div');
        _div.setAttribute("id", "ttt5Menu_div02");

        _elem = document.createElement('label');
        _elem.setAttribute("id", "ttt5Menu_lbl01");
        _elem.setAttribute("class", "lbl1");
        _elem.innerHTML  = "Game field size:"+this.storage.special[_fs].value;
        _div.appendChild(_elem); 
    
        this.storage.mainField.appendChild(_div);
        //
        _div = document.createElement('div');
        _div.setAttribute("id", "ttt5Menu_div03")

        _elem = document.createElement('button');
        _elem.textContent = "Start the game";
        _elem.setAttribute("id", "ttt5Menu_btn00"); 
        _elem.setAttribute("class", "btn2");   
        _elem.addEventListener('click', (event) => this.ttt5Menu_btn00_click(event));     
        _div.appendChild(_elem);
    
        this.storage.mainField.appendChild(_div); 
    }
}