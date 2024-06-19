//var area
var storage = {};
storage.gameScreen = 1;
storage.mainField;
var special = new Array();

function findSpecialById(name)
{    
    for (var _i = 0; _i < special.length; _i++) 
    {
        if (special[_i].id == name)
        {
            return _i;
        }
    }
}
function removeFromSpecialById(name)
{    
    var _sp = findSpecialById(name);
    special.splice(_sp, 1); 
}

//Sapper game
//screen01
function sapperMenu_btn00_click(event)
{
    console.log("sapperMenu_btn00 click");
    //
    document.getElementById("sapperMenu_btn00").removeEventListener('click', sapperMenu_btn01_click);
    document.getElementById("sapperMenu_btn01").removeEventListener('click', sapperMenu_btn02_click);
    document.getElementById("sapperMenu_btn02").removeEventListener('click', sapperMenu_btn03_click);
    document.getElementById("sapperMenu_btn03").removeEventListener('click', sapperMenu_btn00_click);
    //    
    document.getElementById("sapperMenu_btn00").remove();
    document.getElementById("sapperMenu_btn01").remove();
    document.getElementById("sapperMenu_btn02").remove();
    document.getElementById("sapperMenu_btn03").remove();
    document.getElementById("sapperMenu_lbl01").remove();    
    document.getElementById("sapperMenu_div01").remove();
    document.getElementById("sapperMenu_div02").remove();
    document.getElementById("sapperMenu_div03").remove();
    //
    this.cargo.gameScreen = 2;
    gameManager(this.cargo);
}
function sapperMenu_chooseMode(valSize, valCount)
{
    special[findSpecialById("fieldSize")].value = valSize;
    special[findSpecialById("sapperTarget")].value = valCount;
    document.getElementById("sapperMenu_lbl01").innerHTML  = "Game field size:"+valSize;
}
function sapperMenu_btn01_click(event)
{
    console.log("sapperMenu_btn01 click");
    sapperMenu_chooseMode(9, 10);
}
function sapperMenu_btn02_click(event)
{
    console.log("sapperMenu_btn02 click");
    sapperMenu_chooseMode(16, 40);
}
function sapperMenu_btn03_click(event)
{
    console.log("sapperMenu_btn03 click");
    sapperMenu_chooseMode(25, 80);
}

function screen1(strg)
{
    special.push({id:"sapperTarget", value:10});
    special.push({id:"fieldSize", value:9});
    var _fs = findSpecialById("fieldSize");    
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
    _elem.addEventListener('click', sapperMenu_btn01_click);  
    _div.appendChild(_elem);

    _elem = document.createElement('button');
    _elem.textContent = "16x16";
    _elem.setAttribute("id", "sapperMenu_btn02");
    _elem.setAttribute("class", "btn1");
    _elem.addEventListener('click', sapperMenu_btn02_click);
    _div.appendChild(_elem);

    _elem = document.createElement('button');
    _elem.textContent = "25x25";
    _elem.setAttribute("id", "sapperMenu_btn03");
    _elem.setAttribute("class", "btn1");
    _elem.addEventListener('click', sapperMenu_btn03_click);
    _div.appendChild(_elem);
     
    strg.mainField.appendChild(_div);
    //
    _div = document.createElement('div');
    _div.setAttribute("id", "sapperMenu_div02");

    _elem = document.createElement('label');
    _elem.setAttribute("id", "sapperMenu_lbl01");
    _elem.setAttribute("class", "lbl1");
    _elem.innerHTML  = "Game field size:"+special[_fs].value;
    _div.appendChild(_elem); 
    
    strg.mainField.appendChild(_div);
    //
    _div = document.createElement('div');
    _div.setAttribute("id", "sapperMenu_div03")

    _elem = document.createElement('button');
    _elem.textContent = "Start the game";
    _elem.setAttribute("id", "sapperMenu_btn00"); 
    _elem.setAttribute("class", "btn2");   
    _elem.addEventListener('click', {handleEvent: sapperMenu_btn00_click, cargo: storage});     
    _div.appendChild(_elem);
    
    strg.mainField.appendChild(_div); 
} 

//screen02
function sapperCheckBombAround(itm)
{
    var _count = 0;
    var _fs = special[findSpecialById("fieldSize")].value; 
    //            
    if  (itm - (_fs+1) >= 0 && Math.floor((itm)/_fs) != Math.ceil((itm)/_fs))
    { //top-left
        if (special[findSpecialById("gameinf")].value[itm - (_fs+1)] == 1 ||
        special[findSpecialById("gameinf")].value[itm - (_fs+1)] == 4)
        {
            _count++;
        }
    }
    if  (itm -_fs >= 0)
    { //top
        if (special[findSpecialById("gameinf")].value[itm -_fs] == 1 ||
            special[findSpecialById("gameinf")].value[itm -_fs] == 4)
        {
            _count++;
        }
    }
    if  (itm - (_fs - 1) >= 0 && Math.floor((itm+1)/_fs) != Math.ceil((itm+1)/_fs))
    { //top-right
        if (special[findSpecialById("gameinf")].value[itm - (_fs - 1)] == 1 ||
                special[findSpecialById("gameinf")].value[itm - (_fs - 1)] == 4)
        {
            _count++;
        }
    }
    if  (itm - 1 >= 0 && Math.floor((itm)/_fs) != Math.ceil((itm)/_fs))
    { //left
        if (special[findSpecialById("gameinf")].value[itm - 1] == 1 ||
            special[findSpecialById("gameinf")].value[itm - 1] == 4) 
        {
            _count++;
        }
    }
    if  (itm + 1 < _fs*_fs && Math.floor((itm+1)/_fs) != Math.ceil((itm+1)/_fs))
    { //right
        if (special[findSpecialById("gameinf")].value[itm + 1] == 1 ||
            special[findSpecialById("gameinf")].value[itm + 1] == 4)
        {
            _count++;
        }
    }
    if  (itm + (_fs - 1) < _fs*_fs && Math.floor((itm)/_fs) != Math.ceil((itm)/_fs))
    { //bottom-left
        if (special[findSpecialById("gameinf")].value[itm + (_fs - 1)] == 1 ||
            special[findSpecialById("gameinf")].value[itm + (_fs - 1)] == 4)
        {
            _count++;
        }
    }
    if  (itm + _fs < _fs*_fs)
    { //bottom
        if (special[findSpecialById("gameinf")].value[itm + _fs] == 1 ||
            special[findSpecialById("gameinf")].value[itm + _fs] == 4)
        {
            _count++;
        }
    }            
    if  (itm + (_fs + 1) < _fs*_fs && Math.floor((itm+1)/_fs) != Math.ceil((itm+1)/_fs))
    { //bottom-right
        if (special[findSpecialById("gameinf")].value[itm + (_fs + 1)] == 1 ||
            special[findSpecialById("gameinf")].value[itm + (_fs + 1)] == 4)
        {
            _count++;
        }
    }
    return _count;
}

function changeSapperImgByCount(cnt, itm)
{
    var _imgs = special[findSpecialById("imgs")].value;
    var _img = new Image();
    _img = _imgs[itm];
    switch (cnt) 
    {
        case -1:
            _img.src="assets/sapper_img01.png";
        break;
        case -2:
            _img.src="assets/sapper_img02.png";
        break;
        case -4:
            _img.src="assets/sapper_img04.png";
        break;
        case -5:
            _img.src="assets/sapper_img05.png";
        break;
        case -6:
            _img.src="assets/sapper_img06.png";
        break;
        case -7:
            _img.src="assets/sapper_img07.png";
        break;
        case 0:
            _img.src="assets/sapper_img03.png";
        break;
        case 1:
            _img.src="assets/sapper_img11.png";
        break;
        case 2:
            _img.src="assets/sapper_img12.png";
        break;
        case 3:
            _img.src="assets/sapper_img13.png";
        break;
        case 4:
            _img.src="assets/sapper_img14.png";
        break;
        case 5:
            _img.src="assets/sapper_img15.png";
        break;
        case 6:
            _img.src="assets/sapper_img16.png";
        break;
        case 7:
            _img.src="assets/sapper_img17.png";
        break;
        case 8:
            _img.src="assets/sapper_img18.png";
        break;     
    }
}

function sapperLogic(fi)
{
    var _tmpItem = new Array();
    _tmpItem.push(fi);
    while (_tmpItem.length>0)
    {
        var _checkAround = sapperCheckBombAround(_tmpItem[0]);
        if (_checkAround == 0)
        {
            var _fs = special[findSpecialById("fieldSize")].value; 
            //    
            if  (_tmpItem[0] - (_fs+1) >= 0 && Math.floor((_tmpItem[0])/_fs) != Math.ceil((_tmpItem[0])/_fs))
            { //top-left
                if (special[findSpecialById("gameinf")].value[_tmpItem[0] - (_fs+1)] == 0)
                {
                    _tmpItem.push(_tmpItem[0] - (_fs+1));
                }
            } 
            if  (_tmpItem[0] -_fs >= 0)
            { //top
                if (special[findSpecialById("gameinf")].value[_tmpItem[0]-_fs] == 0)
                {
                    _tmpItem.push(_tmpItem[0]-_fs);
                }                   
            }
            if  (_tmpItem[0] - (_fs - 1) >= 0 && Math.floor((_tmpItem[0]+1)/_fs) != Math.ceil((_tmpItem[0]+1)/_fs))
            { //top-right
                if (special[findSpecialById("gameinf")].value[_tmpItem[0] - (_fs - 1)] == 0)
                {
                    _tmpItem.push(_tmpItem[0] - (_fs - 1));
                }
            }
            if  (_tmpItem[0] - 1 >= 0 && Math.floor((_tmpItem[0])/_fs) != Math.ceil((_tmpItem[0])/_fs))
            { //left
                if (special[findSpecialById("gameinf")].value[_tmpItem[0]-1] == 0)
                {
                    _tmpItem.push(_tmpItem[0]-1); 
                }                   
            }
            if  (_tmpItem[0] + 1 < _fs*_fs && Math.floor((_tmpItem[0]+1)/_fs) != Math.ceil((_tmpItem[0]+1)/_fs))
            { //right
                if (special[findSpecialById("gameinf")].value[_tmpItem[0] + 1] == 0)
                {
                    _tmpItem.push(_tmpItem[0] + 1);     
                }               
            }
            if  (_tmpItem[0] + (_fs - 1) < _fs*_fs && Math.floor((_tmpItem[0])/_fs) != Math.ceil((_tmpItem[0])/_fs))
            { //bottom-left
                if (special[findSpecialById("gameinf")].value[_tmpItem[0] + (_fs - 1)] == 0)
                {
                    _tmpItem.push(_tmpItem[0] + (_fs - 1));
                }
                }
            if  (_tmpItem[0] + _fs < _fs*_fs)
            { //bottom
                if (special[findSpecialById("gameinf")].value[_tmpItem[0] + _fs] == 0)
                {
                    _tmpItem.push(_tmpItem[0] + _fs);                    
                }
            }
            if  (_tmpItem[0] + (_fs + 1) < _fs*_fs && Math.floor((_tmpItem[0]+1)/_fs) != Math.ceil((_tmpItem[0]+1)/_fs))
            { //bottom-right
                if (special[findSpecialById("gameinf")].value[_tmpItem[0] + (_fs + 1)] == 0)
                {
                    _tmpItem.push(_tmpItem[0] + (_fs + 1));  
                }
            }
        }  
        //
        special[findSpecialById("gameinf")].value[_tmpItem[0]] = 2;  
        changeSapperImgByCount(_checkAround, _tmpItem[0]);
        //
        _tmpItem.splice(0,1);   
    }
}

function fillSapperGameField(clickedFieldId)
{
    var _fs = special[findSpecialById("fieldSize")].value;
    var _gameField = new Array(_fs*_fs);
    _gameField.fill(0);
    var _unplantedBombCount=special[findSpecialById("sapperTarget")].value;
    while (_unplantedBombCount>0) 
    {
        var _tmpInt = Math.floor(Math.random() * _fs*_fs);
        if (_gameField[_tmpInt] == 0 && _tmpInt!= clickedFieldId)
        {
            _gameField[_tmpInt] = 1;
            _unplantedBombCount--;
        }
    }
    special.push({id:"gameinf", value:_gameField});
}

function sapper_flagAddDelete(mode)
{
    var _utl = special[findSpecialById("userTargetsLeft")];
    
    if (mode == 1)
    {
        _utl.value++;
    } else
    {
        _utl.value--;
    }    
    document.getElementById("lblSapper_MinesLeft").innerHTML  = "Mines:"+_utl.value+". ";
}

function sapper_checkWin()
{
    var _gi = special[findSpecialById("gameinf")].value;
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
        special[findSpecialById("gameStatus")].value = -2;
        var _div = document.getElementById("divSapper_menu");
        var _elem = document.createTextNode("Congratulations! You win!");
        _div.appendChild(_elem);
    }
}

function divSapper_gameField_click(e) 
{
    console.log("mainField click");
    if (special[findSpecialById("gameStatus")].value<=0)
    {
        return;
    }
    //
    var _fieldId = Number(e.target.id);
    //    
    /*
        Known issue: If user click flag firstly and then clicked on the field the bomb's map will be created.
        Resolution: put to backlog.
    */
    if (special[findSpecialById("sapperFirstTurn")].value)
    {
        special[findSpecialById("sapperFirstTurn")].value = false;
        fillSapperGameField(_fieldId);
    }
    //
    var _gameInf = special[findSpecialById("gameinf")].value;
    var _clMode = special[findSpecialById("clickMode")].value;    
    switch (_gameInf[_fieldId]) 
    {
        case 0: //empty closed 
            if (_clMode == 1)
            {
                sapperLogic(_fieldId);
            }
            else
            {
                changeSapperImgByCount(-2,_fieldId);             
                special[findSpecialById("gameinf")].value[_fieldId] = 3;
                sapper_flagAddDelete(0);
            }
            break;
        case 3: //flag without bomb closed            
            if (_clMode == 1)
            {
                sapperLogic(_fieldId);
            } else
            {
                changeSapperImgByCount(-1,_fieldId);            
                special[findSpecialById("gameinf")].value[_fieldId] = 0;
                sapper_flagAddDelete(1);
            }
            break;
        case 1: //with bomb closed
            if (_clMode == 1)
            {
                changeSapperImgByCount(-4,_fieldId);            
                special[findSpecialById("gameinf")].value[_fieldId] = 5;
                special[findSpecialById("gameStatus")].value = -1;
                var _div01 = document.getElementById("divSapper_menu");
                var _txt01 = document.createTextNode("You found a bomb!");
                _div01.appendChild(_txt01);
                for (var i = 0; i < _gameInf.length; i++) 
                {
                    switch (_gameInf[i])
                    {
                        case 0:  
                            changeSapperImgByCount(0,i); 
                            break;
                        case 1:
                            changeSapperImgByCount(-5,i);   
                            break;
                        case 3:
                            changeSapperImgByCount(-7,i);   
                            break;
                        case 4:
                            changeSapperImgByCount(-6,i);   
                            break;
                        default:    
                    }
                }
            }
            else
            {
                changeSapperImgByCount(-2,_fieldId);  
                special[findSpecialById("gameinf")].value[_fieldId] = 4;
                sapper_flagAddDelete(0);
            }
            break;
        case 4: //flag with bomb closed
            if (_clMode == 1)
            {
                changeSapperImgByCount(-4,_fieldId);            
                special[findSpecialById("gameinf")].value[_fieldId] = 5;
                special[findSpecialById("gameStatus")].value = -1;
                var _div01 = document.getElementById("divSapper_menu");
                var _txt01 = document.createTextNode("You found a bomb!");
                _div01.appendChild(_txt01);
                for (var i = 0; i < _gameInf.length; i++) 
                {
                    switch (_gameInf[i])
                    {
                        case 0:  
                            changeSapperImgByCount(0,i); 
                            break;
                        case 1:
                            changeSapperImgByCount(-5,i);   
                            break;
                        case 3:
                            changeSapperImgByCount(-7,i);   
                            break;
                        case 4:
                            changeSapperImgByCount(-6,i);   
                            break;
                        default:    
                    }
                }
            }
            else
            {
                changeSapperImgByCount(-1,_fieldId);  
                special[findSpecialById("gameinf")].value[_fieldId] = 1;
                sapper_flagAddDelete(1);
            }
            break;
        case 2: //empty open            
            break;   
        default:
            alert( "no actions" );
    } 
    sapper_checkWin(); 
}

function btnSapper_chooseFlag_click(event)
{
    console.log("btnSapper_chooseFlag_click");
    special[findSpecialById("clickMode")].value = 2;
    document.getElementById("btnSapper_chooseFlag").style.background='#00FF00';
    document.getElementById("btnSapper_chooseOpenField").style.background='#DDDDDD';
}

function btnSapper_chooseOpenField_click(event)
{
    console.log("btnSapper_chooseOpenField_click");
    special[findSpecialById("clickMode")].value = 1;
    document.getElementById("btnSapper_chooseFlag").style.background='#DDDDDD';
    document.getElementById("btnSapper_chooseOpenField").style.background='#00FF00';
}
function removeSupper()
{
    document.getElementById("btnSapper_chooseFlag").removeEventListener('click', btnSapper_chooseFlag_click);
    document.getElementById("btnSapper_chooseOpenField").removeEventListener('click', btnSapper_chooseOpenField_click);
    document.getElementById("btnSapper_exit").removeEventListener('click', btnSapper_exit_click);
    document.getElementById("btnSapper_restart").removeEventListener('click', btnSapper_restart_click);
    document.getElementById("divSapper_gameField").removeEventListener('click', divSapper_gameField_click);
    //    
    document.getElementById("btnSapper_chooseFlag").remove();
    document.getElementById("btnSapper_chooseOpenField").remove();
    document.getElementById("lblSapper_MinesLeft").remove();    
    document.getElementById("div01").remove();
    document.getElementById("divSapper_gameField").remove();    
    document.getElementById("btnSapper_exit").remove();
    document.getElementById("btnSapper_restart").remove();
    document.getElementById("divSapper_menu").remove();
    //
    removeFromSpecialById("clickMode");
    removeFromSpecialById("fieldSize");
    removeFromSpecialById("sapperTarget");
    removeFromSpecialById("userTargetsLeft");
    removeFromSpecialById("sapperFirstTurn");
    removeFromSpecialById("imgHH");
    removeFromSpecialById("imgWW");
    removeFromSpecialById("imgs");
    removeFromSpecialById("gameinf");
    removeFromSpecialById("gameStatus");
}

function btnSapper_exit_click(event)
{
    console.log("btnSapper_exit_click");
    removeSupper();
    this.cargo.gameScreen = 1;
    gameManager(this.cargo);
}
function btnSapper_restart_click(event)
{
    console.log("btnSapper_restart_click");
    var _fs = special[findSpecialById("fieldSize")].value;     
    var _st = special[findSpecialById("sapperTarget")].value;     
    removeSupper();
    special.push({id:"fieldSize", value:_fs});
    special.push({id:"sapperTarget", value:_st});
    gameManager(this.cargo);
}

function screen2(storage) 
{
    var _fs = special[findSpecialById("fieldSize")].value;  
    special.push({id:"clickMode", value:1});
    special.push({id:"gameStatus", value:_fs});
    var _st = special[findSpecialById("sapperTarget")].value;
    special.push({id:"userTargetsLeft", value:_st});
    special.push({id:"sapperFirstTurn", value:true});
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
    _elem.innerHTML  = '<img src="assets/sapper_img02.png" />';
    _elem.setAttribute("id", "btnSapper_chooseFlag");
    _elem.addEventListener('click', btnSapper_chooseFlag_click);
    _div.appendChild(_elem);
    
    _elem = document.createElement('button');
    _elem.style.background='#00FF00';
    _elem.innerHTML  = '<img src="assets/sapper_img03.png" />';
    _elem.setAttribute("id", "btnSapper_chooseOpenField");
    _elem.addEventListener('click', btnSapper_chooseOpenField_click);    
    _div.appendChild(_elem);
    
    storage.mainField.appendChild(_div); 
    //
    _div = document.createElement('div');
    _div.style.lineHeight = 0+"em";
    _div.setAttribute("id", "divSapper_gameField");
    _div.addEventListener('click', divSapper_gameField_click);
    
    var _gameFieldImg = new Array(_fs*_fs);
    var _img; 
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
        _img.src="assets/sapper_img01.png";
        _img.style.left = (_div.style.left+_br*_i) + "px";
        _img.setAttribute("id", _i);         
        _div.appendChild(_img); 

        _gameFieldImg[_i] = _img; 
        _div.appendChild(_img);
    }
    special.push({id:"imgs", value:_gameFieldImg});
    _img.onload = function() 
    {      
        special.push({id:"imgHH", value:this.height});
        special.push({id:"imgWW", value:this.width});
        _img.onload = null; 
    }       
    
    storage.mainField.appendChild(_div);
    //    
    _div = document.createElement('div'); 
    _div.setAttribute("id", "divSapper_menu");
    //
    _elem = document.createElement("button");
    _elem.textContent = "exit";
    _elem.setAttribute("id", "btnSapper_exit");
    _elem.addEventListener('click', {handleEvent: btnSapper_exit_click, cargo:storage});
    _div.appendChild(_elem);
    //
    _elem = document.createElement("button");
    _elem.textContent = "restart";
    _elem.setAttribute("id", "btnSapper_restart");
    _elem.addEventListener('click', {handleEvent: btnSapper_restart_click, cargo: storage});        
    _div.appendChild(_elem);
    //
    storage.mainField.appendChild(_div);
}

//main app area
function gameManager(strg)
{    
    console.log("gameScreen:"+strg.gameScreen);
    switch (strg.gameScreen) 
    {
        case 1:
            screen1(strg);
            break;
        case 2:
            screen2(strg);
            break;
        default:
            alert( "no screen" );
      }
}

//script game logic execute point
document.addEventListener('DOMContentLoaded', function() 
{
    storage.mainField = document.getElementById('mainField');
    gameManager(storage);
});

var mf = document.getElementById('mainField');
function resizeHandler() 
{
    console.log("window resize"); 
    var ratio = window.devicePixelRatio;
    console.log("ratio:"+ratio);
}
window.addEventListener('load', resizeHandler);
window.visualViewport.addEventListener('resize', resizeHandler);