import { Screens } from "../screens";
import { AppScreen } from "../appScreen";
import { FieldValue } from "./eFieldValue";
import { AppStorage } from "../appStorage";
import { mediator } from '../main';

async function delay(timeInMillis: number): Promise<void> 
{
    return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
}

export class AI
{
    private storage:AppStorage;

    constructor(storage:AppStorage) 
    {
        this.storage = storage;
    }
    protected changeImgByCount(cnt:FieldValue, itm:number):void
    {
        var _imgs = this.storage.special[this.storage.findSpecialById("imgs")].value;
        var _img = new Image();
        _img = _imgs[itm];
        switch (cnt) 
        {
            case FieldValue.empty:
                _img.src="assets/gameTictaktoe5/ttt5_img01.png";
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
    protected AITurn_FieldCounting(goodFields:Array<number>, val:number, pers:FieldValue):boolean 
    {
        var _collisionFields:Array<{item:number, count:number}> = new Array<{item:number, count:number}>();
        var _check;
        for (var _i = 0; _i<goodFields.length; _i++)
        {
            _check = false;
            for (var _j=0; _j<_collisionFields.length; _j++)
            {
                if (_collisionFields[_j].item == goodFields[_i])
                {
                    _collisionFields[_j].count++;
                    _check = true;
                    break;
                }
            }
            if (!_check)
            {
                _collisionFields.push({item:goodFields[_i], count:1});
            }
        }
        var count = 0;
        var _results:Array<number> = new Array<number>();
        for (var _i=0; _i<_collisionFields.length; _i++)
        {
            if (_collisionFields[_i].count == count)
            {
                _results.push(_collisionFields[_i].item);
            }
            if (_collisionFields[_i].count > count)
            {
                count = _collisionFields[_i].count;
                _results.push(_collisionFields[_i].item);
            }
        } 
        //
        if (_results.length>0)
        {
            var _choosenField = Math.floor(Math.random()*_results.length);
            this.storage.special[this.storage.findSpecialById("gameinf")].value[_results[_choosenField]] = val;
            this.changeImgByCount(pers, _results[_choosenField]);

            return true;
        } else
        {
            return false;
        }
    }

    protected AITurn_GamerBewareOf(bewareOfCount:number):boolean
    {
        var _gi = this.storage.special[this.storage.findSpecialById("gameinf")].value;   
        var _fs = this.storage.special[this.storage.findSpecialById("fieldSize")].value;
        var _sum:number;
        var _badWay:boolean;
        var _goodFields:Array<number> = new Array<number>();
        for (var _i = 0; _i < _gi.length; _i++) 
        {
            if (_gi[_i] == -1)
            {
                continue;
            }
            // 
            for (var _tmp=-4; _tmp<=0; _tmp++)
            {
                //hor
                _badWay = false;
                _sum=0;
                for (var _j = _i+_tmp; _j <= _i+_tmp+4; _j++)
                {
                    if (!this.AITurn_FieldCheck (_j, true, -1, _i+_tmp, _i+_tmp+4 ))
                    {
                        _badWay = true;
                        break;
                    }                    
                    _sum += _gi[_j];                  
                }
                if (!_badWay && _sum>=bewareOfCount)
                {     
                    for (var _j = _i+_tmp; _j <= _i+_tmp+4; _j++)  
                    {     
                        if (_gi[_j] == 0)
                        {        
                            _goodFields.push(_j);
                        }
                    }
                }
                //ver
                _badWay = false;
                _sum=0;
                for (var _j = _i+_tmp*_fs; _j <= _i+(_tmp+4)*_fs; _j += _fs)
                {
                    if (!this.AITurn_FieldCheck (_j, false, -1))
                    {
                        _badWay = true;
                        break;
                    }
                    _sum+=_gi[_j];     
                }
                if (!_badWay && _sum>=bewareOfCount)
                {     
                    for (var _j = _i+_tmp*_fs; _j <= _i+(_tmp+4)*_fs; _j += _fs)  
                    {     
                        if (_gi[_j] == 0)
                        {        
                            _goodFields.push(_j);
                        }
                    }
                }
                //diaMain
                _badWay = false;
                _sum = 0;
                for (var _j = _i+_tmp*_fs-4; _j <=_i+(_tmp+4)*_fs; _j+=(_fs+1))
                {
                    if (!this.AITurn_FieldCheck(_j, true, -1, _i+_tmp*_fs-4, _i+(_tmp+4)*_fs))
                    {
                        _badWay = true;
                        break;
                    }
                    _sum += _gi[_j]; 
                }
                if (!_badWay && _sum>=bewareOfCount)
                {     
                    for (var _j = _i+_tmp*_fs-4; _j <=_i+(_tmp+4)*_fs; _j+=(_fs+1))
                    {     
                        if (_gi[_j] == 0)
                        {        
                            _goodFields.push(_j);
                        }
                    }
                }
                //diaAdd
                _badWay = false;
                _sum=0;
                for (var _j = _i-_tmp*_fs-4; _j <=_i-(_tmp+4)*_fs; _j-=(_fs-1))
                {
                    if (!this.AITurn_FieldCheck (_j, true, -1, _i-_tmp*_fs-4, _i-(_tmp+4)*_fs))
                    {
                        _badWay = true;
                        break;
                    }                 
                    _sum += _gi[_j]; 
                }
                if (!_badWay && _sum>=bewareOfCount)
                {  
                    for (var _j = _i-_tmp*_fs-4; _j <=_i-(_tmp+4)*_fs; _j-=(_fs-1))
                    {     
                        if (_gi[_j] == 0)
                        {        
                            _goodFields.push(_j);
                        }
                    }
                }
            }                    
        }
        //
        return this.AITurn_FieldCounting(_goodFields, -1, FieldValue.playerY);
    }
    protected AITurn_AINotLessThan(notLessThan:number):boolean
    {
        var _gi = this.storage.special[this.storage.findSpecialById("gameinf")].value;   
        var _fs = this.storage.special[this.storage.findSpecialById("fieldSize")].value;
        var _sum:number;
        var _badWay:boolean;
        var _goodFields:Array<number> = new Array<number>();
        for (var _i = 0; _i < _gi.length; _i++) 
        {
            if (_gi[_i] == 1)
            {
                continue;
            }
            // 
            for (var _tmp=-4; _tmp<=0; _tmp++)
            {
                //hor
                _badWay = false;
                _sum=0;
                for (var _j = _i+_tmp; _j <= _i+_tmp+4; _j++)
                {
                    if (!this.AITurn_FieldCheck (_j, true, 1, _i+_tmp, _i+_tmp+4 ))
                    {
                        _badWay = true;
                        break;
                    }                    
                    _sum-=_gi[_j];                  
                }
                if (!_badWay && _sum>=notLessThan)
                {     
                    for (var _j = _i+_tmp; _j <= _i+_tmp+4; _j++)  
                    {     
                        if (_gi[_j] == 0)
                        {        
                            _goodFields.push(_j);
                        }
                    }
                }
                //ver
                _badWay = false;
                _sum=0;
                for (var _j = _i+_tmp*_fs; _j <= _i+(_tmp+4)*_fs; _j += _fs)
                {
                    if (!this.AITurn_FieldCheck (_j, false, 1))
                    {
                        _badWay = true;
                        break;
                    }
                    _sum-=_gi[_j];     
                }
                if (!_badWay && _sum>=notLessThan)
                {     
                    for (var _j = _i+_tmp*_fs; _j <= _i+(_tmp+4)*_fs; _j += _fs)  
                    {     
                        if (_gi[_j] == 0)
                        {        
                            _goodFields.push(_j);
                        }
                    }
                }
                //diaMain
                _badWay = false;
                _sum = 0;
                for (var _j = _i+_tmp*_fs-4; _j <=_i+(_tmp+4)*_fs; _j+=(_fs+1))
                {
                    if (!this.AITurn_FieldCheck(_j, true, 1, _i+_tmp*_fs-4, _i+(_tmp+4)*_fs))
                    {
                        _badWay = true;
                        break;
                    }
                    _sum-=_gi[_j]; 
                }
                if (!_badWay && _sum>=notLessThan)
                {     
                    for (var _j = _i+_tmp*_fs-4; _j <=_i+(_tmp+4)*_fs; _j+=(_fs+1))
                    {     
                        if (_gi[_j] == 0)
                        {        
                            _goodFields.push(_j);
                        }
                    }
                }
                //diaAdd
                _badWay = false;
                _sum=0;
                for (var _j = _i-_tmp*_fs-4; _j <=_i-(_tmp+4)*_fs; _j-=(_fs-1))
                {
                    if (!this.AITurn_FieldCheck (_j, true, 1, _i-_tmp*_fs-4, _i-(_tmp+4)*_fs))
                    {
                        _badWay = true;
                        break;
                    }                 
                    _sum-=_gi[_j]; 
                }
                if (!_badWay && _sum>=notLessThan)
                {  
                    for (var _j = _i-_tmp*_fs-4; _j <=_i-(_tmp+4)*_fs; _j-=(_fs-1))
                    {     
                        if (_gi[_j] == 0)
                        {        
                            _goodFields.push(_j);
                        }
                    }
                }
            }                    
        }
        //
        return this.AITurn_FieldCounting(_goodFields, -1, FieldValue.playerY);        
    }

    protected AITurn_FieldCheck(itm:number, lrcase:boolean, checkValue:number = 1, cng1:number=0, cng2:number=0):boolean
    {
        var _gi = this.storage.special[this.storage.findSpecialById("gameinf")].value;  
        var _fs = this.storage.special[this.storage.findSpecialById("fieldSize")].value;
        if (itm<0 || itm>=_gi.length)
        {
            return false;
        }
        if (lrcase && itm != cng1 && Math.floor((itm)/_fs) == Math.ceil((itm)/_fs))
        {
            return false;
        }
        if (lrcase && itm != cng2 && Math.floor((itm+1)/_fs) == Math.ceil((itm+1)/_fs))
        {
            return false;
        }
        if (_gi[itm] == checkValue)
        {
            return false;
        }
        return true;
    }

    protected AITurn_AINo():boolean
    {
        var _gi = this.storage.special[this.storage.findSpecialById("gameinf")].value;   
        var _fs = this.storage.special[this.storage.findSpecialById("fieldSize")].value;
        var _mx:number = 0;
        var _curx:number=0;
        var _sum:number=0;
        var _goodFields:Array<number> = new Array<number>();
        for (var _i = 0; _i < _gi.length; _i++) 
        {
            if (_gi[_i] != 0)
            {
                continue;
            }
            //
            _curx=0;  
            for (var _tmp=-4; _tmp<=0; _tmp++)
            {
                //hor
                _sum = 0;
                for (var _j = _i+_tmp; _j <= _i+_tmp+4; _j++)
                {
                    if (!this.AITurn_FieldCheck (_j, true, 1, _i+_tmp, _i+_tmp+4 ))
                    {
                        continue;
                    }
                    _sum ++;
                }
                if (_sum >= 5)
                {
                    _curx++;
                }
                //ver
                _sum = 0;
                for (var _j = _i+_tmp*_fs; _j <= _i+(_tmp+4)*_fs; _j += _fs)
                {
                    if (!this.AITurn_FieldCheck (_j, false, 1))
                    {
                        continue;
                    }
                    _sum ++;
                }
                if (_sum >= 5)
                {
                    _curx++;
                }
                //diaMain
                _sum = 0;
                for (var _j = _i+_tmp*_fs-4; _j <=_i+(_tmp+4)*_fs; _j+=(_fs+1))
                {
                    if (!this.AITurn_FieldCheck (_j, true, 1, _i+_tmp*_fs-4, _i+(_tmp+4)*_fs))
                    {
                        continue;
                    }
                    _sum ++;
                }
                if (_sum >= 5)
                {
                    _curx++;
                }
                //diaAdd
                _sum = 0;
                for (var _j = _i-_tmp*_fs-4; _j <=_i-(_tmp+4)*_fs; _j-=(_fs-1))
                {
                    if (!this.AITurn_FieldCheck (_j, true, 1, _i-_tmp*_fs-4, _i-(_tmp+4)*_fs))
                    {
                        continue;
                    }
                    _sum ++;
                }
                if (_sum >= 5)
                {
                    _curx++;
                }
            }
            //
            if (_curx == _mx)
            {
                _goodFields.push(_i);
            }
            if (_curx > _mx)
            {
                _mx = _curx;
                _goodFields = new Array<number>();
                _goodFields.push(_i);
            }            
        }
        if (_goodFields.length == 0)
        {
            for (_i=0; _i<_gi.length; _i++)
            {
                if (_gi[_i] == 0)
                {
                    _goodFields.push(_i);
                }
            }
        }

        var choosenField = Math.floor(Math.random()*_goodFields.length);
        this.storage.special[this.storage.findSpecialById("gameinf")].value[_goodFields[choosenField]] = -1;
        this.changeImgByCount(FieldValue.playerY, _goodFields[choosenField]);

        return true;
    }

    public async AITurn():Promise<void>
    {
        await delay(500+Math.floor(Math.random()*1500));
        //
        var _result = false;
        if (!_result)
        {
            _result = this.AITurn_AINotLessThan(4);
        }
        if (!_result)
        {
            _result = this.AITurn_GamerBewareOf(4);
        }
        if (!_result)
        {
            _result = this.AITurn_AINotLessThan(3);
        }
        if (!_result)
        {
            _result = this.AITurn_GamerBewareOf(3);
        }
        if (!_result)
        {
            _result = this.AITurn_AINotLessThan(2);
        }
        if (!_result)
        {
            _result = this.AITurn_AINotLessThan(1);
        }
        if (!_result)
        {            
            _result = this.AITurn_AINo();
        }       
    }
}