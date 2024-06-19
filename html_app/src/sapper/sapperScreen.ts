import { Screens } from "../screens";
import { AppScreen } from "../appScreen";
import { mediator } from '../main';

export class SapperScreen extends AppScreen
{
    protected remove():void
    {
        console.log("remove SapperScreen::screen:"+this.storage.gameScreen);
        super.remove();
        document.getElementById("btnSapper_chooseFlag")!.removeEventListener('click', (event) => this.btnSapper_chooseFlag_click(event));
        document.getElementById("btnSapper_chooseOpenField")!.removeEventListener('click', (event) => this.btnSapper_chooseOpenField_click(event));
        document.getElementById("btnSapper_exit")!.removeEventListener('click', (event) => this.divSapper_gameField_click(event));
        document.getElementById("btnSapper_restart")!.removeEventListener('click', (event) => this.btnSapper_exit_click(event));
        document.getElementById("divSapper_gameField")!.removeEventListener('click', (event) => this.btnSapper_restart_click(event));            
        //
        document.getElementById("btnSapper_chooseFlag")!.remove();
        document.getElementById("btnSapper_chooseOpenField")!.remove();
        document.getElementById("lblSapper_MinesLeft")!.remove();    
        document.getElementById("div01")!.remove();
        var _di = this.storage.special[this.storage.findSpecialById("imgs")].value; 
        for (let _i=0; _i<_di.length; _i++)
        { 
            document.getElementById(_i.toString())!.remove();   
        }
        document.getElementById("divSapper_gameField")!.remove();    
        document.getElementById("btnSapper_exit")!.remove();
        document.getElementById("btnSapper_restart")!.remove();
        document.getElementById("divSapper_menu")!.remove();
        //
        this.storage.removeFromSpecialById("clickMode");
        this.storage.removeFromSpecialById("fieldSize");
        this.storage.removeFromSpecialById("sapperTarget");
        this.storage.removeFromSpecialById("userTargetsLeft");
        this.storage.removeFromSpecialById("sapperFirstTurn");
        this.storage.removeFromSpecialById("imgHH");
        this.storage.removeFromSpecialById("imgWW");
        this.storage.removeFromSpecialById("imgs");
        this.storage.removeFromSpecialById("gameinf");
        this.storage.removeFromSpecialById("gameStatus");
    }

    protected btnSapper_exit_click(event:MouseEvent):void
    {
        console.log("btnSapper_exit_click");
        this.remove();
        this.storage.gameScreen = Screens.sapper_menu;
        this.storage.toChangeScreen = true;
        mediator();
    }
    protected btnSapper_restart_click(event:MouseEvent):void
    {
        console.log("btnSapper_restart_click");
        var _fs = this.storage.special[this.storage.findSpecialById("fieldSize")].value;     
        var _st = this.storage.special[this.storage.findSpecialById("sapperTarget")].value;     
        this.remove();
        this.storage.special.push({id:"fieldSize", value:_fs});
        this.storage.special.push({id:"sapperTarget", value:_st});
        this.storage.toChangeScreen = true;
        mediator();
    }

    protected btnSapper_chooseFlag_click(event:MouseEvent):void
    {
        console.log("btnSapper_chooseFlag_click");
        this.storage.special[this.storage.findSpecialById("clickMode")].value = 2;
        document.getElementById("btnSapper_chooseFlag")!.style.background='#00FF00';
        document.getElementById("btnSapper_chooseOpenField")!.style.background='#DDDDDD';
    }
    protected btnSapper_chooseOpenField_click(event:MouseEvent):void
    {
        console.log("btnSapper_chooseOpenField_click");
        this.storage.special[this.storage.findSpecialById("clickMode")].value = 1;
        document.getElementById("btnSapper_chooseFlag")!.style.background='#DDDDDD';
        document.getElementById("btnSapper_chooseOpenField")!.style.background='#00FF00';
    }

    protected fillSapperGameField(clickedFieldId:number):void
    {
        var _fs = this.storage.special[this.storage.findSpecialById("fieldSize")].value;
        var _gameField = new Array(_fs*_fs);
        _gameField.fill(0);
        var _unplantedBombCount=this.storage.special[this.storage.findSpecialById("sapperTarget")].value;
        while (_unplantedBombCount>0) 
        {
            var _tmpInt = Math.floor(Math.random() * _fs*_fs);
            if (_gameField[_tmpInt] == 0 && _tmpInt!= clickedFieldId)
            {
                _gameField[_tmpInt] = 1;
                _unplantedBombCount--;
            }
        }
        this.storage.special.push({id:"gameinf", value:_gameField});
    }

    protected sapperCheckBombAround(itm:number):number
    {
        var _count = 0;
        var _fs = this.storage.special[this.storage.findSpecialById("fieldSize")].value; 
        //            
        if  (itm - (_fs+1) >= 0 && Math.floor((itm)/_fs) != Math.ceil((itm)/_fs))
        { //top-left
            if (this.storage.special[this.storage.findSpecialById("gameinf")].value[itm - (_fs+1)] == 1 ||
            this.storage.special[this.storage.findSpecialById("gameinf")].value[itm - (_fs+1)] == 4)
            {
                _count++;
            }
        }
        if  (itm -_fs >= 0)
        { //top
            if (this.storage.special[this.storage.findSpecialById("gameinf")].value[itm -_fs] == 1 ||
            this.storage.special[this.storage.findSpecialById("gameinf")].value[itm -_fs] == 4)
            {
                _count++;
            }
        }
        if  (itm - (_fs - 1) >= 0 && Math.floor((itm+1)/_fs) != Math.ceil((itm+1)/_fs))
        { //top-right
            if (this.storage.special[this.storage.findSpecialById("gameinf")].value[itm - (_fs - 1)] == 1 ||
            this.storage.special[this.storage.findSpecialById("gameinf")].value[itm - (_fs - 1)] == 4)
            {
                _count++;
            }
        }
        if  (itm - 1 >= 0 && Math.floor((itm)/_fs) != Math.ceil((itm)/_fs))
        { //left
            if (this.storage.special[this.storage.findSpecialById("gameinf")].value[itm - 1] == 1 ||
            this.storage.special[this.storage.findSpecialById("gameinf")].value[itm - 1] == 4) 
            {
                _count++;
            }
        }
        if  (itm + 1 < _fs*_fs && Math.floor((itm+1)/_fs) != Math.ceil((itm+1)/_fs))
        { //right
            if (this.storage.special[this.storage.findSpecialById("gameinf")].value[itm + 1] == 1 ||
            this.storage.special[this.storage.findSpecialById("gameinf")].value[itm + 1] == 4)
            {
                _count++;
            }
        }
        if  (itm + (_fs - 1) < _fs*_fs && Math.floor((itm)/_fs) != Math.ceil((itm)/_fs))
        { //bottom-left
            if (this.storage.special[this.storage.findSpecialById("gameinf")].value[itm + (_fs - 1)] == 1 ||
            this.storage.special[this.storage.findSpecialById("gameinf")].value[itm + (_fs - 1)] == 4)
            {
                _count++;
            }
        }
        if  (itm + _fs < _fs*_fs)
        { //bottom
            if (this.storage.special[this.storage.findSpecialById("gameinf")].value[itm + _fs] == 1 ||
            this.storage.special[this.storage.findSpecialById("gameinf")].value[itm + _fs] == 4)
            {
                _count++;
            }
        }            
        if  (itm + (_fs + 1) < _fs*_fs && Math.floor((itm+1)/_fs) != Math.ceil((itm+1)/_fs))
        { //bottom-right
            if (this.storage.special[this.storage.findSpecialById("gameinf")].value[itm + (_fs + 1)] == 1 ||
            this.storage.special[this.storage.findSpecialById("gameinf")].value[itm + (_fs + 1)] == 4)
            {
                _count++;
            }
        }
        return _count;
    }

    protected changeSapperImgByCount(cnt:number, itm:number):void
    {
        var _imgs = this.storage.special[this.storage.findSpecialById("imgs")].value;
        var _img = new Image();
        _img = _imgs[itm];
        switch (cnt) 
        {
            case -1:
                _img.src="assets/gameSapper/sapper_img01.png";
            break;
            case -2:
                _img.src="assets/gameSapper/sapper_img02.png";
            break;
            case -4:
                _img.src="assets/gameSapper/sapper_img04.png";
            break;
            case -5:
                _img.src="assets/gameSapper/sapper_img05.png";
            break;
            case -6:
                _img.src="assets/gameSapper/sapper_img06.png";
            break;
            case -7:
                _img.src="assets/gameSapper/sapper_img07.png";
            break;
            case 0:
                _img.src="assets/gameSapper/sapper_img03.png";
            break;
            case 1:
                _img.src="assets/gameSapper/sapper_img11.png";
            break;
            case 2:
                _img.src="assets/gameSapper/sapper_img12.png";
            break;
            case 3:
                _img.src="assets/gameSapper/sapper_img13.png";
            break;
            case 4:
                _img.src="assets/gameSapper/sapper_img14.png";
            break;
            case 5:
                _img.src="assets/gameSapper/sapper_img15.png";
            break;
            case 6:
                _img.src="assets/gameSapper/sapper_img16.png";
            break;
            case 7:
                _img.src="assets/gameSapper/sapper_img17.png";
            break;
            case 8:
                _img.src="assets/gameSapper/sapper_img18.png";
            break;     
        }
    }

    protected sapperLogic(fi:number):void
    {
        var _tmpItem = new Array();
        _tmpItem.push(fi);
        while (_tmpItem.length>0)
        {
            var _checkAround = this.sapperCheckBombAround(_tmpItem[0]);
            if (_checkAround == 0)
            {
                var _fs = this.storage.special[this.storage.findSpecialById("fieldSize")].value; 
                //    
                if  (_tmpItem[0] - (_fs+1) >= 0 && Math.floor((_tmpItem[0])/_fs) != Math.ceil((_tmpItem[0])/_fs))
                { //top-left
                    if (this.storage.special[this.storage.findSpecialById("gameinf")].value[_tmpItem[0] - (_fs+1)] == 0)
                    {
                        _tmpItem.push(_tmpItem[0] - (_fs+1));
                    }
                } 
                if  (_tmpItem[0] -_fs >= 0)
                { //top
                    if (this.storage.special[this.storage.findSpecialById("gameinf")].value[_tmpItem[0]-_fs] == 0)
                    {
                        _tmpItem.push(_tmpItem[0]-_fs);
                    }                   
                }
                if  (_tmpItem[0] - (_fs - 1) >= 0 && Math.floor((_tmpItem[0]+1)/_fs) != Math.ceil((_tmpItem[0]+1)/_fs))
                { //top-right
                    if (this.storage.special[this.storage.findSpecialById("gameinf")].value[_tmpItem[0] - (_fs - 1)] == 0)
                    {
                        _tmpItem.push(_tmpItem[0] - (_fs - 1));
                    }
                }
                if  (_tmpItem[0] - 1 >= 0 && Math.floor((_tmpItem[0])/_fs) != Math.ceil((_tmpItem[0])/_fs))
                { //left
                    if (this.storage.special[this.storage.findSpecialById("gameinf")].value[_tmpItem[0]-1] == 0)
                    {
                        _tmpItem.push(_tmpItem[0]-1); 
                    }                   
                }
                if  (_tmpItem[0] + 1 < _fs*_fs && Math.floor((_tmpItem[0]+1)/_fs) != Math.ceil((_tmpItem[0]+1)/_fs))
                { //right
                    if (this.storage.special[this.storage.findSpecialById("gameinf")].value[_tmpItem[0] + 1] == 0)
                    {
                        _tmpItem.push(_tmpItem[0] + 1);     
                    }               
                }
                if  (_tmpItem[0] + (_fs - 1) < _fs*_fs && Math.floor((_tmpItem[0])/_fs) != Math.ceil((_tmpItem[0])/_fs))
                { //bottom-left
                    if (this.storage.special[this.storage.findSpecialById("gameinf")].value[_tmpItem[0] + (_fs - 1)] == 0)
                    {
                        _tmpItem.push(_tmpItem[0] + (_fs - 1));
                    }
                    }
                if  (_tmpItem[0] + _fs < _fs*_fs)
                { //bottom
                    if (this.storage.special[this.storage.findSpecialById("gameinf")].value[_tmpItem[0] + _fs] == 0)
                    {
                        _tmpItem.push(_tmpItem[0] + _fs);                    
                    }
                }
                if  (_tmpItem[0] + (_fs + 1) < _fs*_fs && Math.floor((_tmpItem[0]+1)/_fs) != Math.ceil((_tmpItem[0]+1)/_fs))
                { //bottom-right
                    if (this.storage.special[this.storage.findSpecialById("gameinf")].value[_tmpItem[0] + (_fs + 1)] == 0)
                    {
                        _tmpItem.push(_tmpItem[0] + (_fs + 1));  
                    }
                }
            }  
            //
            this.storage.special[this.storage.findSpecialById("gameinf")].value[_tmpItem[0]] = 2;  
            this.changeSapperImgByCount(_checkAround, _tmpItem[0]);
            //
            _tmpItem.splice(0,1);   
        }
    }

    protected sapper_flagAddDelete(mode:number):void
    {
        var _utl = this.storage.special[this.storage.findSpecialById("userTargetsLeft")];
        
        if (mode == 1)
        {
            _utl.value++;
        } else
        {
            _utl.value--;
        }    
        document.getElementById("lblSapper_MinesLeft")!.innerHTML  = "Mines:"+_utl.value+". ";
    }

    protected sapper_checkWin()
    {
        var _gi = this.storage.special[this.storage.findSpecialById("gameinf")].value;
        var _result = true;
        for (var i = 0; i < _gi.length; i++) 
        {
            if (_gi[i] == 0 || _gi[i] == 1 || _gi[i] == 3)
            {
                _result = false;
                break;
            }
        }
        if (_result)
        {
            this.storage.special[this.storage.findSpecialById("gameStatus")].value = -2;
            var _div = document.getElementById("divSapper_menu")!;
            var _elem = document.createTextNode("Congratulations! You win!");
            _div.appendChild(_elem);
        }
    }

    protected divSapper_gameField_click(event:MouseEvent):void 
    {
        console.log("mainField click");
        if (this.storage.special[this.storage.findSpecialById("gameStatus")].value<=0)
        {
            return;
        }
        //
        const target = event.target as HTMLImageElement;//as HTMLDivElement;
        var _fieldId = Number(target.id);//Number(event.target!.id);
        //    
        /*
            Known issue: If user click flag firstly and then clicked on the field the bomb's map will be created.
            Resolution: put to backlog.
        */
        if (this.storage.special[this.storage.findSpecialById("sapperFirstTurn")].value)
        {
            this.storage.special[this.storage.findSpecialById("sapperFirstTurn")].value = false;
            this.fillSapperGameField(_fieldId);
        }
        //
        var _gameInf = this.storage.special[this.storage.findSpecialById("gameinf")].value;
        var _clMode = this.storage.special[this.storage.findSpecialById("clickMode")].value;    
        switch (_gameInf[_fieldId]) 
        {
            case 0: //empty closed 
                if (_clMode == 1)
                {
                    this.sapperLogic(_fieldId);
                }
                else
                {
                    this.changeSapperImgByCount(-2,_fieldId);             
                    this.storage.special[this.storage.findSpecialById("gameinf")].value[_fieldId] = 3;
                    this.sapper_flagAddDelete(0);
                }
                break;
            case 3: //flag without bomb closed            
                if (_clMode == 1)
                {
                    this.sapperLogic(_fieldId);
                } else
                {
                    this.changeSapperImgByCount(-1,_fieldId);            
                    this.storage.special[this.storage.findSpecialById("gameinf")].value[_fieldId] = 0;
                    this.sapper_flagAddDelete(1);
                }
                break;
            case 1: //with bomb closed
                if (_clMode == 1)
                {   
                    this.changeSapperImgByCount(-4,_fieldId);            
                    this.storage.special[this.storage.findSpecialById("gameinf")].value[_fieldId] = 5;
                    this.storage.special[this.storage.findSpecialById("gameStatus")].value = -1;
                    var _div01 = document.getElementById("divSapper_menu")!;
                    var _txt01 = document.createTextNode("You found a bomb!");
                    _div01.appendChild(_txt01);
                    for (var i = 0; i < _gameInf.length; i++) 
                    {
                        switch (_gameInf[i])
                        {
                            case 0:  
                                this.changeSapperImgByCount(0,i); 
                                break;
                            case 1:
                                this.changeSapperImgByCount(-5,i);   
                                break;
                            case 3:
                                this.changeSapperImgByCount(-7,i);   
                                break;
                            case 4:
                                this.changeSapperImgByCount(-6,i);   
                                break;
                            default:    
                        }
                    }
                }
                else
                {
                    this.changeSapperImgByCount(-2,_fieldId);  
                    this.storage.special[this.storage.findSpecialById("gameinf")].value[_fieldId] = 4;
                    this.sapper_flagAddDelete(0);
                }
            break;
            case 4: //flag with bomb closed
                if (_clMode == 1)
                {
                    this.changeSapperImgByCount(-4,_fieldId);            
                    this.storage.special[this.storage.findSpecialById("gameinf")].value[_fieldId] = 5;
                    this.storage.special[this.storage.findSpecialById("gameStatus")].value = -1;
                    var _div01 = document.getElementById("divSapper_menu")!;
                    var _txt01 = document.createTextNode("You found a bomb!");
                    _div01.appendChild(_txt01);
                    for (var i = 0; i < _gameInf.length; i++) 
                    {
                        switch (_gameInf[i])
                        {
                            case 0:  
                                this.changeSapperImgByCount(0,i); 
                                break;
                            case 1:
                                this.changeSapperImgByCount(-5,i);   
                                break;
                            case 3:
                                this.changeSapperImgByCount(-7,i);   
                                break;
                            case 4:
                                this.changeSapperImgByCount(-6,i);   
                                break;
                            default:    
                        }
                    }
                }
                else
                {
                    this.changeSapperImgByCount(-1,_fieldId);  
                    this.storage.special[this.storage.findSpecialById("gameinf")].value[_fieldId] = 1;
                    this.sapper_flagAddDelete(1);
                }
                break;
            case 2: //empty open            
                break;   
            default:
                alert( "no actions" );
        } 
        this.sapper_checkWin(); 
    }

    public screen():void
    {
        console.log("SapperScreen::screen:"+this.storage.gameScreen);
        this.makeExit("Lazy Sapper");

        var _fs = this.storage.special[this.storage.findSpecialById("fieldSize")].value;  
        this.storage.special.push({id:"clickMode", value:1});
        this.storage.special.push({id:"gameStatus", value:_fs});
        var _st = this.storage.special[this.storage.findSpecialById("sapperTarget")].value;
        this.storage.special.push({id:"userTargetsLeft", value:_st});
        this.storage.special.push({id:"sapperFirstTurn", value:true});
        //
        var _div;
        var _elem;
        //
        _div = document.createElement('div');  
        _div.setAttribute("id", "div01");
    
        _elem = document.createElement('label');    
        _elem.setAttribute("id", "lblSapper_MinesLeft");
        _elem.innerHTML  = "Mines:"+_st+". ";
        _div.appendChild(_elem);
    
        _elem = document.createTextNode("Choose:");
        _div.appendChild(_elem);
    
        _elem = document.createElement('button');
        _elem.innerHTML  = '<img src="assets/gameSapper/sapper_img02.png" />';
        _elem.setAttribute("id", "btnSapper_chooseFlag");
        _elem.addEventListener('click', (event) => this.btnSapper_chooseFlag_click(event));
        _div.appendChild(_elem);
    
        _elem = document.createElement('button');
        _elem.style.background='#00FF00';
        _elem.innerHTML  = '<img src="assets/gameSapper/sapper_img03.png" />';
        _elem.setAttribute("id", "btnSapper_chooseOpenField");
        _elem.addEventListener('click', (event) => this.btnSapper_chooseOpenField_click(event));    
        _div.appendChild(_elem);
    
        this.storage.mainField.appendChild(_div); 
        //
        _div = document.createElement('div');
        _div.style.lineHeight = 0+"em";
        _div.setAttribute("id", "divSapper_gameField");
        _div.addEventListener('click', (event) => this.divSapper_gameField_click(event));
    
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
            _img.src="assets/gameSapper/sapper_img01.png";
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
            //_img.onload = null; 
        }       
    
        this.storage.mainField.appendChild(_div);
        //    
        _div = document.createElement('div'); 
        _div.setAttribute("id", "divSapper_menu");
        //
        _elem = document.createElement("button");
        _elem.textContent = "exit";
        _elem.setAttribute("id", "btnSapper_exit");
        _elem.addEventListener('click', (event) => this.btnSapper_exit_click(event));        
        _div.appendChild(_elem);
        //
        _elem = document.createElement("button");
        _elem.textContent = "restart";
        _elem.setAttribute("id", "btnSapper_restart");
        _elem.addEventListener('click', (event) => this.btnSapper_restart_click(event));        
        _div.appendChild(_elem);
        //
        this.storage.mainField.appendChild(_div);
    }
}