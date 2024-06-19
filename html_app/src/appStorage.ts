import { Screens } from "./screens";

export class AppStorage
{
    public gameScreen: Screens;
    public mainField: HTMLElement;
    public special: Array<{id: string; value: any}>;
    public toChangeScreen:boolean;

    constructor() 
    {
        this.gameScreen = Screens.default_menu;
        this.mainField = document.getElementById('mainField')!;
        this.special = new Array<{id: string; value: any}>();
        this.toChangeScreen = true;
    }   

    public findSpecialById(name:any):number
    {    
        for (var _i = 0; _i < this.special.length; _i++) 
        {
            if (this.special[_i].id == name)
            {
                return _i;
            }
        }
        return -1;
    }

    public removeFromSpecialById(name:any)
    {    
        const  _sp = this.findSpecialById(name);
        console.log("name:"+name+"; res:"+_sp);
        if (_sp>=0)
        {
            this.special.splice(_sp, 1);
        }
    }
}