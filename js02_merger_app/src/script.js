import * as PIXI from '../pixi/pixi.min.mjs';

const GameState = 
{
    Init: 0,
    MainScreen: 1
}
const GameFunc = 
{
    No: 0,
    Game: 10,
    Shop: 20
}

const app = new PIXI.Application();
var container;

var gameState = GameState.Init;
var gameFunc = GameFunc.No;

var itm;
var itemLineList = new Array();
var itemList = new Array();
var screenItemList = new Array();
var assets = new Array();

var leftX = 0;
var topY = 0;
var boardX = 21;
var boardY = 144;
var cellSize = 70;
var boardWidth = 7;
var boardHeight = 9;

var imgBG = "../assets/bg01.png";
var imgBGTexture;
var imgBGItem;

var imgBoard = "../assets/board01.png";
var imgBoardTexture;
var imgBoardItem;

var itmDown = -1;
var itmTap = -1;
var tapX = -1;
var tapY = -1;

async function baseInit()
{
    await app.init(
    { 
        background: '#1099bb', 
        width: 600,
        height: 800, 
    });
    document.body.appendChild(app.canvas);
    app.view.id = "pixicanvas";
    const rect = document.getElementById('pixicanvas').getBoundingClientRect();
    //
    leftX = Math.ceil(rect.x);
    topY = Math.ceil(rect.y);
    //
    container = new PIXI.Container();
    container.width=600;
    container.height=800;
    container.x = 0;
    container.y = 0;
    app.stage.addChild(container);
    //
    imgBGTexture = await PIXI.Assets.load(imgBG);
    imgBGItem = new PIXI.Sprite(imgBGTexture);
    imgBGItem.x = 0;
    imgBGItem.y = 0;
    container.addChildAt(imgBGItem,0);
    //
    itm = {id:1, name:"shell", maxLevel:1};
    itemLineList.push(itm);
    itm = {id:2, name:"fish", maxLevel:5};
    itemLineList.push(itm);
    //
    itm = {id:1, name:"shell", itemLineID:1, level:1, AssetId:"shell01_01", maker:true, make:[{id:2, chance:85}, {id:3, chance:15}] };
    itemList.push(itm);
    itm = {id:2, name:"little fish", itemLineID:2, level:1, AssetId:"fish01_01", maker:false};
    itemList.push(itm);
    itm = {id:3, name:"fish teenager", itemLineID:2, level:2, AssetId:"fish01_02", maker:false};
    itemList.push(itm);
    itm = {id:4, name:"fish worker", itemLineID:2, level:3, AssetId:"fish01_03", maker:false};
    itemList.push(itm);
    itm = {id:5, name:"fish scientist", itemLineID:2, level:4, AssetId:"fish01_04", maker:false};
    itemList.push(itm);
    itm = {id:6, name:"fish adventurer", itemLineID:2, level:5, AssetId:"fish01_05", maker:false};
    itemList.push(itm);
    //
    itm = {xx:4, yy:5, listId:1, style:"active", texture:null, item:null, status:"placed"};
    screenItemList.push(itm);
    //
    assets.push({id:"shell01_01", texture:"../assets/shell01_01.png"});
    assets.push({id:"fish01_01", texture:"../assets/fish01_01.png"});
    assets.push({id:"fish01_02", texture:"../assets/fish01_02.png"});
    assets.push({id:"fish01_03", texture:"../assets/fish01_03.png"});
    assets.push({id:"fish01_04", texture:"../assets/fish01_04.png"});
    assets.push({id:"fish01_05", texture:"../assets/fish01_05.png"});
    //
    imgBoardTexture = await PIXI.Assets.load(imgBoard);
    imgBoardItem = new PIXI.Sprite(imgBoardTexture);
    imgBoardItem.x = boardX;
    imgBoardItem.y = boardY;
    container.addChildAt(imgBoardItem,1);

    var _sil;
    var _a;
    for (var _i=0; _i<screenItemList.length; _i++)
    {
        console.log("_i:"+_i);
        _sil = getItemById(itemList, screenItemList[_i].listId);
        if (_sil < 0)
        {
            continue;
        }
        if (screenItemList[_i].style == "active")
        {
            _a = getItemById(assets, itemList[_sil].AssetId);       
        } else /*empty for now*/
        {
            _a = getItemById(assets, itemList[_sil].AssetId); 
        }
        screenItemList[_i].texture = await PIXI.Assets.load(assets[_a].texture);
        screenItemList[_i].item = new PIXI.Sprite(screenItemList[_i].texture);
        screenItemList[_i].item.x = leftX + boardX + (screenItemList[_i].xx-1)*cellSize;
        screenItemList[_i].item.y = topY + boardY + (screenItemList[_i].yy-1)*cellSize;
        console.log(screenItemList[_i].x+":"+screenItemList[_i].y);
        container.addChildAt(screenItemList[_i].item,2);
    }
}

function getItemById(storage, itmId)
{
    for (var i=0; i<storage.length; i++)
    {
        if (storage[i].id == itmId)
        {
            return i;
        }
    }
    return -1;
}

function checkField(itmId)
{
    var _xx = Math.ceil((screenItemList[itmId].item.x+cellSize/2-leftX-boardX)/cellSize);
    var _yy = Math.ceil((screenItemList[itmId].item.y+cellSize/2-topY-boardY)/cellSize);
    return {res:true, xx:_xx, yy:_yy};
}

async function putItmDown(field)
{
    //console.log("putItmDown);
    //console.log("field.xx:"+field.xx);
    //console.log("field.yy:"+field.yy);
    var _itm = -1;
    var _itmDown = itmDown;
    for (var _i=0; _i<screenItemList.length; _i++)
    {
        if (screenItemList[_i].xx==field.xx && 
            screenItemList[_i].yy==field.yy &&
            _i != _itmDown)
        {
            _itm = _i;
            break;
        }
    }
    if (_itm == -1)
    {   
        //console.log("found empty cell");
        screenItemList[_itmDown].xx=field.xx;
        screenItemList[_itmDown].yy=field.yy;
        screenItemList[_itmDown].item.x = leftX+boardX+(field.xx - 1)*cellSize;
        screenItemList[_itmDown].item.y = topY+boardY+(field.yy - 1)*cellSize;
    } else
    {
        //console.log("cell is engaged");
        if (screenItemList[_itmDown].listId == screenItemList[_itm].listId)
        {
            //console.log("found that 2 items are the same");
            var _itmListId1 = getItemById(itemList, screenItemList[_itm].listId);
            var _itmLineListId1 = getItemById(itemLineList, itemList[_itmListId1].itemLineID);
            if (itemLineList[_itmLineListId1].maxLevel > itemList[_itmListId1].level)
            {
                console.log("max level still has not achived");
                for (var _i=0; _i<itemList.length; _i++)
                {
                    if (itemList[_i].itemLineID == itemList[_itmListId1].itemLineID &&
                        itemList[_i].level == itemList[_itmListId1].level + 1)
                    {
                        console.log (itemList[_i]);
                        console.log("item template of the next level was found");
                        screenItemList[_itm].listId = itemList[_i].id;
                        var _a = getItemById(assets, itemList[_i].AssetId); 
                        screenItemList[_itm].texture = await PIXI.Assets.load(assets[_a].texture);
                        screenItemList[_itm].item.texture = screenItemList[_itm].texture;
                        //
                        container.removeChild(screenItemList[_itmDown].item);
                        screenItemList[_itmDown].texture.destroy();
                        screenItemList.splice(_itmDown,1);
                        break;
                    }
                }
            } else
            {
                //console.log("max level had been achived");
                screenItemList[_itmDown].item.x = leftX+boardX+(field.xx - 1)*cellSize;
                screenItemList[_itmDown].item.y = topY+boardY+(field.yy - 1)*cellSize;
            }
        } else
        {
            //console.log("return shifted item to it's place");
            screenItemList[_itmDown].item.x = leftX+boardX+(screenItemList[_itmDown].xx - 1)*cellSize;
            screenItemList[_itmDown].item.y = topY+boardY+(screenItemList[_itmDown].yy - 1)*cellSize;
        }
    }
}
async function itemAnalyze(itmId)
{
    //console.log("itemAnalyze");
    var _ilId = getItemById(itemList, screenItemList[itmId].listId);
    if (itemList[_ilId].maker == true)
    {
        //console.log("Item is maker.");
        //console.log("Check chance of item now.");
        var _rnd = Math.ceil(Math.random()*100);
        var _nmb=0;
        for (var _i=0; _i<itemList[_ilId].make.length; _i++)
        {
            _nmb +=itemList[_ilId].make[_i].chance;
            if(_rnd<=_nmb)
            {
                _nmb = itemList[_ilId].make[_i].id;
                break;
            }
        }
        //console.log("Choosing the best field for place of new item");
        var _distArr = new Array();        
        for (var _x=1; _x<=boardWidth; _x++)
        {
            for (var _y=1; _y<=boardHeight; _y++)
            {
                var _check = false;
                for (var _i=0; _i<screenItemList.length; _i++)
                {
                    if (screenItemList[_i].xx == _x &&
                        screenItemList[_i].yy == _y)
                    {
                        _check = true;
                        break;
                    }
                }
                if (_check)
                {
                    continue;
                }
                _distArr.push(
                    {
                        xx:_x, 
                        yy:_y, 
                        distx:Math.abs(screenItemList[itmId].xx-_x), 
                        disty:Math.abs(screenItemList[itmId].yy-_y)
                    }
                );                
            }
        }
        if (_distArr.length>0)
        {      
            var _i=0;
            while (_i< _distArr.length)
            {
                if (_distArr[_i].distx + _distArr[_i].disty > _distArr[0].distx + _distArr[0].disty)
                {
                    _distArr.splice(_i, 1);
                    continue;
                } else if (_distArr[_i].distx + _distArr[_i].disty < _distArr[0].distx + _distArr[0].disty &&
                     _distArr[_i].distx + _distArr[_i].disty != 0)
                {
                    _distArr.splice(0, _i);
                    _i=0;
                    continue;
                }
                _i++;
            }
        }
        
        if (_distArr.length > 0)
        {
            //console.log("_adding an item");
            var _rnd = Math.floor(Math.random()*_distArr.length);            
            var _itm = 
            {
                xx:_distArr[_rnd].xx, 
                yy:_distArr[_rnd].yy, 
                listId:_nmb, 
                style:"active", 
                texture:null, 
                item:null, 
                status:"init", 
                curx:0, 
                cury:0
            };
            screenItemList.push(_itm);
            var _sil = getItemById(itemList, _nmb);
            var _a = getItemById(assets, itemList[_sil].AssetId); 
            screenItemList[screenItemList.length-1].texture = await PIXI.Assets.load(assets[_a].texture);
            screenItemList[screenItemList.length-1].item = new PIXI.Sprite(screenItemList[screenItemList.length-1].texture);
            screenItemList[screenItemList.length-1].item.x = screenItemList[itmId].item.x;
            screenItemList[screenItemList.length-1].item.y = screenItemList[itmId].item.y;
            container.addChildAt(screenItemList[screenItemList.length-1].item,3);
        }
    }
}

function handler()
{
    for (var _i=0; _i<screenItemList.length; _i++)
    {
        if (screenItemList[_i].status == "init" && screenItemList[_i].item)
        {
            if (screenItemList[_i].item.x<(screenItemList[_i].xx-1)*cellSize+leftX+boardX)
            {
                screenItemList[_i].item.x+=3;
            }
            if (screenItemList[_i].item.x>(screenItemList[_i].xx-1)*cellSize+leftX+boardX)
            {
                screenItemList[_i].item.x-=3;
            }
            if (screenItemList[_i].item.y<(screenItemList[_i].yy-1)*cellSize+topY+boardY)
            {
                screenItemList[_i].item.y+=3;
            }
            if (screenItemList[_i].item.y>(screenItemList[_i].yy-1)*cellSize+topY+boardY)
            {
                screenItemList[_i].item.y-=3;
            }
            if (screenItemList[_i].item.x >= (screenItemList[_i].xx-1)*cellSize+leftX+boardX-2 &&
                screenItemList[_i].item.x <= (screenItemList[_i].xx-1)*cellSize+leftX+boardX+2 &&
                screenItemList[_i].item.y >= (screenItemList[_i].yy-1)*cellSize+topY+boardY-2 &&
                screenItemList[_i].item.y <= (screenItemList[_i].yy-1)*cellSize+topY+boardY+2)
            {
                screenItemList[_i].status = "placed";
            }
        }
    }
}

window.addEventListener('pointermove', (e) => 
{
    //console.log('Mouse moved globally at coordinates:');
    //console.log('X:', e.clientX, 'Y:', e.clientY);
});
window.addEventListener('mousedown', (e) => 
{
    if (e.clientX>leftX+boardX && e.clientX<leftX+boardX+boardWidth*cellSize &&
        e.clientY>topY+boardY && e.clientY<topY+boardY+boardHeight*cellSize)
    {
        for (var _i=0; _i<screenItemList.length; _i++)
        {
            if (e.clientX>=leftX+boardX+(screenItemList[_i].xx-1)*cellSize &&            
                e.clientX<=leftX+boardX+(screenItemList[_i].xx-1)*cellSize + cellSize &&
                e.clientY>=topY+boardY+(screenItemList[_i].yy-1)*cellSize &&            
                e.clientY<=topY+boardY+(screenItemList[_i].yy-1)*cellSize + cellSize)
            {
                itmDown = _i;
                //console.log("clicked:"+_i);
                tapX = e.clientX;
                tapY = e.clientY;
                break;
            }
        }
    }
});
window.addEventListener('mousemove', (e) => 
{
    if (itmDown != -1 &&
        e.clientX>=leftX+boardX + cellSize/4 &&
        e.clientX<=leftX+boardX+boardWidth*cellSize - cellSize/4 && 
        e.clientY>=topY+boardY+cellSize/4 &&
        e.clientY<=topY+boardY+boardHeight*cellSize - cellSize/4)
    {
        screenItemList[itmDown].item.x=e.clientX - cellSize/2;
        screenItemList[itmDown].item.y=e.clientY - cellSize/2;
    }
});
window.addEventListener('mouseup', (e) => 
{
    if (itmDown != -1)
    {
        var _field = checkField(itmDown);
        if (_field.res)
        {
            putItmDown(_field);
        }
        if (itmTap == -1)
        {
            itmTap = itmDown;
        } else
        {
            if (tapX == e.clientX && e.clientY == tapY)
            {
                itemAnalyze(itmDown);
            }
        }

        itmDown = -1;
    }
});

async function appInit()
{
    await baseInit();

    gameFunc = GameFunc.Game;    
    
    app.ticker.add((time) =>
    {
        manager();
        handler();
    });
}

function init()
{
    appInit().then(console.log("inited"));
}

function manager()
{
    if (gameState == GameState.Init)
    {
        gameState = GameState.MainScreen;
        init();
    }
    
    console.log("starter");
}
manager();


    
