import { Screens } from "./screens";
import { AppScreen } from "./appScreen";
import { AppStorage } from "./appStorage";
import { mediator } from './main';

export class DefaultScreen extends AppScreen
{
    protected remove():void
    {
        console.log("DefaultScreen::remove");
        //
        document.getElementById("defaultMenu_divChooser")!.removeEventListener('click', (event) => this.divDefault_Chooser_click(event));
        document.getElementById("defaultMenu_btnGameName")!.removeEventListener('click', (event) => this.defaultMenu_btnGameName_click(event));
        //    
        document.getElementById("defaultMenu_lblHeader")!.remove();  
        document.getElementById("defaultMenu_divHeader")!.remove(); 

        var _di = this.storage.special[this.storage.findSpecialById("defImgs")].value; 
        for (let _i=0; _i<_di.length; _i++)
        { 
            document.getElementById(_i.toString())!.remove();   
        }
        document.getElementById("defaultMenu_divChooser")!.remove();
        document.getElementById("defaultMenu_lblGameName")!.remove(); 
        document.getElementById("defaultMenu_btnGameName")!.remove(); 
        document.getElementById("defaultMenu_divGameStart")!.remove(); 

        this.storage.removeFromSpecialById("gameList");
        this.storage.removeFromSpecialById("gameScreenChoice");
        this.storage.removeFromSpecialById("defImgs");       
    }

    protected defaultMenu_btnGameName_click(event:MouseEvent):void 
    {        
        var _gl:Screens = this.storage.special[this.storage.findSpecialById("gameScreenChoice")].value;
        console.log("screen:"+ _gl);
        this.remove();
        //
        this.storage.gameScreen = _gl;
        this.storage.toChangeScreen = true;
        mediator();
    }

    protected divDefault_ChooseGame_screen(gl:{screen:Screens, name:String, bigIcon:String}):void
    {
        var _div=document.getElementById("defaultMenu_divGameStart");        
        _div!.style.display = "block";
        var _elemlblName=document.getElementById("defaultMenu_lblGameName");
        _elemlblName!.innerHTML  = "Game:"+gl.name!+". ";
        var _elembtnName=document.getElementById("defaultMenu_btnGameName");
        _elembtnName!.innerHTML  = "Start the game";
    }

    protected divDefault_Chooser_click(event:MouseEvent):void 
    {
        console.log("divDefault_Chooser_click");
        //
        const _target = event.target as HTMLImageElement;
        var _gameId = Number(_target.id);
        var _gl = this.storage.special[this.storage.findSpecialById("gameList")].value; 
        console.log(_gl);

        this.storage.special[this.storage.findSpecialById("gameScreenChoice")].value = _gl[_gameId].screen;      
        console.log(_gl[_gameId].screen);   

        this.divDefault_ChooseGame_screen(_gl[_gameId]);
    }

    public screen():void
    {
        console.log("DefaultScreen::screen:"+this.storage.gameScreen);

        var games: Array<{screen:Screens, name:String, bigIcon:String}> = new Array<{screen:Screens, name:String, bigIcon:String}>();
        games.push({screen:Screens.sapper_menu, name:"Lazy Sapper", bigIcon:"sapper_bigIcon.png"});
        games.push({screen:Screens.tictactoe5_menu, name: "Tic-Tak-Toe-Five", bigIcon:"tictaktoe5_bigIcon.png"});
        this.storage.special.push({id:"gameList", value:games});    
        var _gl = this.storage.special[this.storage.findSpecialById("gameList")].value;  
        this.storage.special.push({id:"gameScreenChoice", value:Screens.no});
        //
        var _div;
        var _elem;
        //
        _div = document.createElement('div');
        _div.setAttribute("id", "defaultMenu_divHeader");

        _elem = document.createElement('label');
        _elem.textContent = "Choose the game to see what it is:";
        _elem.setAttribute("id", "defaultMenu_lblHeader");
        _elem.setAttribute("class", "lblHeader");      
        _div.appendChild(_elem);

        this.storage.mainField.appendChild(_div); 
        //  
        _div = document.createElement('div');
        _div.setAttribute("id", "defaultMenu_divChooser");    
        _div.addEventListener('click', (event) => this.divDefault_Chooser_click(event));
          
        var _img:any; 
        var _defFieldImg = new Array(_gl.length);
        for (let _i=0; _i<_gl.length; _i++)
        {    
            _img = new Image();
            _img.src="assets/gameGeneral/"+_gl[_i].bigIcon;
            _img.style.left = (_div.style.left) + "px";
            _img.setAttribute("id", _i);    
            _img.style.border = '1px solid black';     
            _div.appendChild(_img); 

            _defFieldImg[_i] = _img; 
            _div.appendChild(_img);
        }
        this.storage.special.push({id:"defImgs", value:_defFieldImg});

        this.storage.mainField.appendChild(_div); 
        //
        _div = document.createElement('div');
        _div.setAttribute("id", "defaultMenu_divGameStart"); 
        _div.style.display = "none";
        
        _elem = document.createElement('label');
        _elem.setAttribute("id", "defaultMenu_lblGameName"); 
        _div.appendChild(_elem);

        _elem = document.createElement('button');
        _elem.setAttribute("id", "defaultMenu_btnGameName"); 
        _elem.addEventListener('click', (event) => this.defaultMenu_btnGameName_click(event));
        _div.appendChild(_elem);
        
        this.storage.mainField.appendChild(_div);
    }
}