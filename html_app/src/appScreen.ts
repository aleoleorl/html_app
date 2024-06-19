import { Screens } from "./screens";
import { AppStorage } from "./appStorage";
import { mediator } from './main';

export class AppScreen
{
    protected storage:AppStorage;

    constructor(storage:AppStorage) 
    {
        this.storage = storage;
    }
    
    protected remove():void
    {
        document.getElementById("upperMenu_btn01")!.removeEventListener('click', (event) => this.upperMenuBtn_click(event));
        document.getElementById("upperMenu_lbl01")!.remove();
        document.getElementById("upperMenu_br01")!.remove();
        document.getElementById("upperMenu_btn01")!.remove();
    }

    protected makeExit(name:string):void
    {
        var _elem:HTMLElement;
        var _div:HTMLElement = document.getElementById('upperField')!;
        _elem = document.createElement('label');
        _elem.innerHTML = name;
        _elem.style.display = "inline-block";
        _elem.style.padding = "1em";
        _elem.setAttribute("id", "upperMenu_lbl01");
        _elem.setAttribute("class", "lblHeader");  
        _div.appendChild(_elem);

        _elem = document.createElement('br');
        _elem.setAttribute("id", "upperMenu_br01");
        _div.appendChild(_elem);

        _elem = document.createElement('button');
        _elem.innerHTML  = '<img src="assets/gameGeneral/closeBtn.png" />';
        _elem.setAttribute("id", "upperMenu_btn01");        
        _elem.addEventListener('click', (event) => this.upperMenuBtn_click(event));
        _div.appendChild(_elem);        
        
        const _qs:HTMLImageElement | null = document.querySelector('#upperMenu_btn01 img');
        if (_qs)
        {
            _qs.style.width = '100%';
            _qs.style.height  = '100%';
            _qs.style.objectFit = 'cover';
        }
    }

    protected upperMenuBtn_click(event:MouseEvent):void
    {
        this.remove();
        this.storage.gameScreen = Screens.default_menu;
        this.storage.toChangeScreen = true;
        
        mediator();
    }

    public screen():void
    {
        console.log("hi0");
    }
}