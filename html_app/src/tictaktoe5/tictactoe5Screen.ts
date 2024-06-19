import { Screens } from "../screens";
import { AppScreen } from "../appScreen";
import { FieldValue } from "./eFieldValue";
import { AI } from "./aI";
import { AppStorage } from "../appStorage";
import { mediator } from '../main';



export class Tictactoe5Screen extends AppScreen
{
    private ai!:AI;

    protected remove():void
    {
        super.remove();
        document.getElementById("divTtt5_gameField")!.removeEventListener('click', (event) => this.divTtt5_gameField_click(event));
        document.getElementById("btnTtt5_exit")!.removeEventListener('click', (event) => this.btnTtt5_exit_click(event)); 
        document.getElementById("btnTtt5_restart")!.removeEventListener('click', (event) => this.btnTtt5_restart_click(event));                 
        //
        document.getElementById("lblTtt5_CurTurn")!.remove();    
        document.getElementById("div01")!.remove();
        var _di = this.storage.special[this.storage.findSpecialById("imgs")].value; 
        for (let _i=0; _i<_di.length; _i++)
        { 
            document.getElementById(_i.toString())!.remove();   
        }
        document.getElementById("divTtt5_gameField")!.remove();    
        document.getElementById("btnTtt5_exit")!.remove();
        document.getElementById("btnTtt5_restart")!.remove();
        document.getElementById("divTtt5_menu")!.remove();
        //
        this.storage.removeFromSpecialById("fieldSize");
        this.storage.removeFromSpecialById("gameStatus");
        this.storage.removeFromSpecialById("currPlayer");
        this.storage.removeFromSpecialById("imgHH");
        this.storage.removeFromSpecialById("imgWW");
        this.storage.removeFromSpecialById("imgs");
        this.storage.removeFromSpecialById("gameinf");
    }

    protected btnTtt5_exit_click(event:MouseEvent):void
    {
        console.log("btnTtt5_exit_click");
        this.remove();
        this.storage.gameScreen = Screens.tictactoe5_menu;
        this.storage.toChangeScreen = true;
        mediator();
    }
    protected btnTtt5_restart_click(event:MouseEvent):void
    {
        console.log("btnTtt5_restart_click");
        var _fs:number = this.storage.special[this.storage.findSpecialById("fieldSize")].value;      
        this.remove();
        this.storage.special.push({id:"fieldSize", value:_fs});
        this.storage.toChangeScreen = true;
        mediator();
    }

    protected changeTtt5ImgByCount(cnt:FieldValue, itm:number):void
    {
        var _imgs = this.storage.special[this.storage.findSpecialById("imgs")].value;
        var _img = new Image();
        _img = _imgs[itm];
        switch (cnt) 
        {
            case FieldValue.empty:
                _img.src="assets/gameTictaktoe5/tftt5_img01.png";
            break;
            case FieldValue.playerX:
                _img.src="assets/gameTictaktoe5/ttt5_img02.png";
            break;
            case FieldValue.playerXwin:
                _img.src="assets/gameTictaktoe5/ttt5_img04.png";
            break;
            case FieldValue.playerY:
                _img.src="assets/gameTictaktoe5/ttt5_img03.png";
            break;
            case FieldValue.playerYwin:
                _img.src="assets/gameTictaktoe5/ttt5_img05.png";
            break;
        }
    }

    protected ttt5_checkWin_hor(giId:any, winLine:Array<number>, itm:number, lineSize:number):boolean
    {
        var _player:number = 0;
        var _cnt:number = 0;
        for (var _j = itm; _j < itm+5; _j++)
        {
            if (_player == 0 && giId[itm] != 0)
            {
                _player = giId[itm];
            } else if (_player==0 || _j>=giId.length || giId[_j] != _player)
            {
                break;
            }
            if (_j < itm+4 && Math.floor((_j+1)/lineSize) == Math.ceil((_j+1)/lineSize))
            {
                break;
            }
            winLine.push(_j);
            _cnt++;
        }
        if (_cnt == 5)
        {
            return true;
        }
        return false;
    }

    protected ttt5_checkWin_ver(giId:any, winLine:Array<number>, itm:number, lineSize:number):boolean
    {
        var _player:number = 0;
        var _cnt:number = 0;
        for (var _j = itm; _j < itm+5*lineSize; _j+=lineSize)
        {
            if (_player == 0 && giId[itm] != 0)
            {
                _player = giId[itm];
            } else if (_j>=giId.length || _player==0 || giId[_j] != _player)
            {
            break;
            }
            if (_j < itm+4 && Math.floor((_j+1)/lineSize) == Math.ceil((_j+1)/lineSize))
            {
                break;
            }
            winLine.push(_j);
            _cnt++;
        }
        if (_cnt == 5)
        {
            return true;
        }
        return false;
    }

    protected ttt5_checkWin_diaMain(giId:any, winLine:Array<number>, itm:number, lineSize:number):boolean
    {
        var _player:number = 0;
        var _cnt:number = 0;
        for (var _j = itm; _j < itm+5*lineSize+5; _j+=(lineSize+1))
        {
            if (_player == 0 && giId[itm] != 0)
            {
                _player = giId[itm];
            } else if (_j>=giId.length || _player==0 || giId[_j] != _player)
            {
            break;
            }
            if (_j < itm+5*lineSize+4 && Math.floor((_j+1)/lineSize) == Math.ceil((_j+1)/lineSize))
            {
                break;
            }
            winLine.push(_j);
            _cnt++;
        }
        if (_cnt == 5)
        {
            return true;
        }
        return false;
    }

    protected ttt5_checkWin_diaAdd(giId:any, winLine:Array<number>, itm:number, lineSize:number):boolean
    {
        var _player:number = 0;
        var _cnt:number = 0;
        for (var _j = itm; _j > itm-5*lineSize+5; _j-=(lineSize-1))
        {
            if (_player == 0 && giId[itm] != 0)
            {
                _player = giId[itm];
            } else if (_j<0 || _player==0 || giId[_j] != _player)
            {
            break;
            }
            if (_j < itm-5*lineSize+4 && Math.floor((_j+1)/lineSize) == Math.ceil((_j+1)/lineSize))
            {
                break;
            }
            winLine.push(_j);
            _cnt++;
        }
        if (_cnt == 5)
        {
            return true;
        }
        return false;
    }
    protected ttt5_checkWin_result(who:number, winLine:Array<number>):void
    {
        if (who == 1)
        {
            this.storage.special[this.storage.findSpecialById("gameStatus")].value = -2;
            var _div = document.getElementById("divTtt5_menu")!;
            var _elem = document.createTextNode("Congratulations! You win!");
            _div.appendChild(_elem);
            for (var _i=0; _i<winLine!.length; _i++)
            {
                this.changeTtt5ImgByCount(FieldValue.playerXwin, winLine![_i]);
            }
            
            this.storage.special[this.storage.findSpecialById("currPlayer")].value = -2;
        } else
        {
            this.storage.special[this.storage.findSpecialById("gameStatus")].value = -1;
            var _div = document.getElementById("divTtt5_menu")!;
            var _elem = document.createTextNode("AI win! Good luck next time!");
            _div.appendChild(_elem);
            for (var _i=0; _i<winLine!.length; _i++)
            {
                this.changeTtt5ImgByCount(FieldValue.playerYwin, winLine![_i]);
            }
            this.storage.special[this.storage.findSpecialById("currPlayer")].value = -1;
        }
        this.ttt5_curTurn();
    }

    protected ttt5_checkWin():void
    {
        var _gi = this.storage.special[this.storage.findSpecialById("gameinf")].value;
        var _fs = this.storage.special[this.storage.findSpecialById("fieldSize")].value;
        var _result = false;
        var _winLine:Array<number>;
        for (var _i = 0; _i < _gi.length; _i++) 
        {
            _winLine = new Array<number>();
            if (this.ttt5_checkWin_hor(_gi, _winLine, _i, _fs))
            {
                _result = true;
                break;
            }
            _winLine = new Array<number>();
            if (this.ttt5_checkWin_ver(_gi, _winLine, _i, _fs))
            {
                _result = true;
                break;
            }
            _winLine = new Array<number>();
            if (this.ttt5_checkWin_diaMain(_gi, _winLine, _i, _fs))
            {
                _result = true;
                break;
            }
            _winLine = new Array<number>();
            if (this.ttt5_checkWin_diaAdd(_gi, _winLine, _i, _fs))
            {
                _result = true;
                break;
            }
        }
        if (_result)
        {
            this.ttt5_checkWin_result(_gi[_winLine![0]], _winLine!);
        }
    }

    protected ttt5_curTurn():void
    {
        var _turn = this.storage.special[this.storage.findSpecialById("currPlayer")].value;
        var _elem = document.getElementById("lblTtt5_CurTurn")!;
        switch (_turn)
        {
            case 0:
                _elem.innerHTML  = "Turn: AI. ";
                break;
            case 1:
                _elem.innerHTML  = "Turn: You.";
                break;
            default:
                _elem.innerHTML  = "Played";
                break;
        }
    }

    protected divTtt5_gameField_click(event:MouseEvent):void 
    {
        console.log("divTtt5_gameField_click"); 
        if (this.storage.special[this.storage.findSpecialById("currPlayer")].value==0)
        {
            return;
        }
        if (this.storage.special[this.storage.findSpecialById("gameStatus")].value<0)
        {
            return;
        }
        this.ttt5_curTurn();
        //
        const target = event.target as HTMLImageElement;
        var _fieldId = Number(target.id);
        //        
        var _gameInf = this.storage.special[this.storage.findSpecialById("gameinf")].value;   
        if (_gameInf[_fieldId] == 0)
        {
            _gameInf[_fieldId] = 1;
            this.changeTtt5ImgByCount(FieldValue.playerX,_fieldId);
            //
            this.ttt5_checkWin(); 
            //
            this.storage.special[this.storage.findSpecialById("currPlayer")].value = 0;
            if (this.storage.special[this.storage.findSpecialById("gameStatus")].value>=0)
            {
                this.AITurn();
            }
        }
    }

    protected async AITurn():Promise<void>
    {
        if (this.storage.special[this.storage.findSpecialById("gameStatus")].value<0)
        {
            return;
        }
        //
        this.ttt5_curTurn();
        //
        await this.ai.AITurn();
        //
        console.log("now");
        this.ttt5_checkWin();
        //
        if (this.storage.special[this.storage.findSpecialById("gameStatus")].value<0)
        {
            this.storage.special[this.storage.findSpecialById("currPlayer")].value = -1;            
        } else
        {
            this.storage.special[this.storage.findSpecialById("currPlayer")].value = 1;
        }
        this.ttt5_curTurn();
    }

    public screen():void
    {
        console.log("TicTakToe5Screen::screen:"+this.storage.gameScreen);
        this.makeExit("Tic-Tak-Toe Five");

        this.ai = new AI(this.storage);

        var _fs = this.storage.special[this.storage.findSpecialById("fieldSize")].value;
        this.storage.special.push({id:"gameStatus", value:0});
        console.log("gameStatus:"+this.storage.special[this.storage.findSpecialById("gameStatus")].value);
        this.storage.special.push({id:"currPlayer", value:Math.floor(Math.random()*2)});
        var _turn = this.storage.special[this.storage.findSpecialById("currPlayer")].value;
        console.log("currPlayer:"+this.storage.special[this.storage.findSpecialById("currPlayer")].value);
        var _gameField = new Array(_fs*_fs);
        _gameField.fill(0);
        this.storage.special.push({id:"gameinf", value:_gameField});
        //
        var _div;
        var _elem;
        //
        _div = document.createElement('div');  
        _div.setAttribute("id", "div01");
    
        _elem = document.createElement('label');   

        _elem.setAttribute("id", "lblTtt5_CurTurn");
        if (_turn == 0)
        {
            _elem.innerHTML  = "Turn: AI. ";
        } else
        {
            _elem.innerHTML  = "Turn: You.";
        }
        _div.appendChild(_elem);  
    
        this.storage.mainField.appendChild(_div); 
        //
        _div = document.createElement('div');
        _div.style.lineHeight = 0+"em";
        _div.setAttribute("id", "divTtt5_gameField");
        _div.addEventListener('click', (event) => this.divTtt5_gameField_click(event));
    
        var _gameFieldImg = new Array(_fs*_fs);
        var _img:any; 
        var _br;
        for (let _i=0; _i<_fs*_fs; _i++)
        {     
            if (typeof _br === 'undefined' || _br>=_fs-1)
            {
                var _brElem = document.createElement("br");
                _div.appendChild(_brElem);
                _br = 0;
            } else
            {
                _br++;
            }
            _img = new Image();
            _img.src="assets/gameTictaktoe5/ttt5_img01.png";
            _img.style.left = (_div.style.left+_br*_i) + "px";
            _img.setAttribute("id", _i);         
            _div.appendChild(_img); 

            _gameFieldImg[_i] = _img; 
            _div.appendChild(_img);
        }
        this.storage.special.push({id:"imgs", value:_gameFieldImg});
        _img.onload = () => 
        {      
            this.storage.special.push({id:"imgHH", value:_img.height});
            this.storage.special.push({id:"imgWW", value:_img.width});
        }       
    
        this.storage.mainField.appendChild(_div);
        //    
        _div = document.createElement('div'); 
        _div.setAttribute("id", "divTtt5_menu");
        //
        _elem = document.createElement("button");
        _elem.textContent = "exit";
        _elem.setAttribute("id", "btnTtt5_exit");
        _elem.addEventListener('click', (event) => this.btnTtt5_exit_click(event));        
        _div.appendChild(_elem);
        //
        _elem = document.createElement("button");
        _elem.textContent = "restart";
        _elem.setAttribute("id", "btnTtt5_restart");
        _elem.addEventListener('click', (event) => this.btnTtt5_restart_click(event));        
        _div.appendChild(_elem);
        //
        this.storage.mainField.appendChild(_div);
        //
        if (_turn == 0)
        {
            this.AITurn();
        }
    }
}