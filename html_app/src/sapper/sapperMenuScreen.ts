import { Screens } from "../screens";
import { AppScreen } from "../appScreen";
import { AppStorage } from "../appStorage";
import { mediator } from '../main';

export class SapperMenuScreen extends AppScreen
{
    protected sapperMenu_chooseMode(valSize:number, valCount:number):void
    {
        console.log("sapperMenu_chooseMode");
        this.storage.special[this.storage.findSpecialById("fieldSize")].value = valSize;
        this.storage.special[this.storage.findSpecialById("sapperTarget")].value = valCount;
        document.getElementById("sapperMenu_lbl01")!.innerHTML  = "Game field size:"+valSize;
    }

    protected sapperMenu_btn01_click(event:MouseEvent, valSize:number, valCount:number):void 
    {
        console.log("sapperMenu_btn01_click:"+valSize+":"+valCount);
        this.sapperMenu_chooseMode(valSize, valCount);
    }

    protected remove():void
    {
        console.log("remove SapperMenuScreen::screen:"+this.storage.gameScreen);
        super.remove();
        document.getElementById("sapperMenu_btn00")!.removeEventListener('click', (event) =>this.sapperMenu_btn01_click(event, 9, 10));
        document.getElementById("sapperMenu_btn00")!.removeEventListener('click', (event) =>this.sapperMenu_btn01_click(event, 16, 40));
        document.getElementById("sapperMenu_btn00")!.removeEventListener('click', (event) =>this.sapperMenu_btn01_click(event, 25, 80));
        document.getElementById("sapperMenu_btn03")!.removeEventListener('click', (event) =>this.sapperMenu_btn00_click(event));
        //
        document.getElementById("sapperMenu_btn00")!.remove();
        document.getElementById("sapperMenu_btn01")!.remove();
        document.getElementById("sapperMenu_btn02")!.remove();
        document.getElementById("sapperMenu_btn03")!.remove();
        document.getElementById("sapperMenu_lbl01")!.remove();    
        document.getElementById("sapperMenu_div01")!.remove();
        document.getElementById("sapperMenu_div02")!.remove();
        document.getElementById("sapperMenu_div03")!.remove();
    }

    protected sapperMenu_btn00_click(event:MouseEvent):void 
    {
        console.log("sapperMenu_btn00_click");
        this.remove();
        this.storage.gameScreen = Screens.sapper_game;
        this.storage.toChangeScreen = true;
        mediator();
    }

    public screen():void
    {
        console.log("SapperMenuScreen::screen:"+this.storage.gameScreen);
        this.makeExit("Lazy Sapper");
    
        this.storage.special.push({id:"sapperTarget", value:10});
        this.storage.special.push({id:"fieldSize", value:9});
        var _fs = this.storage.findSpecialById("fieldSize");    
        //
        var _div;
        var _elem;
        //
        _div = document.createElement('div');
        _div.setAttribute("id", "sapperMenu_div01");

        _elem = document.createElement('button');
        _elem.textContent = "9x9";
        _elem.setAttribute("id", "sapperMenu_btn01");
        _elem.setAttribute("class", "btn1");      
        _elem.addEventListener('click', (event) => this.sapperMenu_btn01_click(event, 9, 10));  
        _div.appendChild(_elem);

        _elem = document.createElement('button');
        _elem.textContent = "16x16";
        _elem.setAttribute("id", "sapperMenu_btn02");
        _elem.setAttribute("class", "btn1");
        _elem.addEventListener('click', (event) => this.sapperMenu_btn01_click(event, 16, 40));  
        _div.appendChild(_elem);

        _elem = document.createElement('button');
        _elem.textContent = "25x25";
        _elem.setAttribute("id", "sapperMenu_btn03");
        _elem.setAttribute("class", "btn1");
        _elem.addEventListener('click', (event) => this.sapperMenu_btn01_click(event, 25, 80));  
        _div.appendChild(_elem);
     
        this.storage.mainField.appendChild(_div);
        //
        _div = document.createElement('div');
        _div.setAttribute("id", "sapperMenu_div02");

        _elem = document.createElement('label');
        _elem.setAttribute("id", "sapperMenu_lbl01");
        _elem.setAttribute("class", "lbl1");
        _elem.innerHTML  = "Game field size:"+this.storage.special[_fs].value;
        _div.appendChild(_elem); 
    
        this.storage.mainField.appendChild(_div);
        //
        _div = document.createElement('div');
        _div.setAttribute("id", "sapperMenu_div03")

        _elem = document.createElement('button');
        _elem.textContent = "Start the game";
        _elem.setAttribute("id", "sapperMenu_btn00"); 
        _elem.setAttribute("class", "btn2");   
        _elem.addEventListener('click', (event) => this.sapperMenu_btn00_click(event));     
        _div.appendChild(_elem);
    
        this.storage.mainField.appendChild(_div); 
    }
}