import { Screens } from "./screens";
import { AppStorage } from "./appStorage";
import { AppScreen } from "./appScreen";
import { SapperMenuScreen } from "./sapper/sapperMenuScreen";
import { SapperScreen } from "./sapper/sapperScreen";
import { Tictactoe5MenuScreen } from "./tictaktoe5/tictactoe5MenuScreen";
import { Tictactoe5Screen } from "./tictaktoe5/tictactoe5Screen";
import { DefaultScreen } from "./defaultScreen";

class Main 
{
    private storage:AppStorage;
    private appScreen!:AppScreen;

    constructor() 
    {
        this.storage = new AppStorage();
        
    }

    public gameManager():void
    {
        if (this.storage.toChangeScreen)
        {
            this.storage.toChangeScreen = false;
            switch (this.storage.gameScreen) 
            {
                case Screens.default_menu:
                    this.appScreen = new DefaultScreen(this.storage);
                    this.appScreen.screen();
                    break;
                case Screens.tictactoe5_menu:
                    this.appScreen = new Tictactoe5MenuScreen(this.storage);
                    this.appScreen.screen();
                    break;
                case Screens.tictactoe5_game:
                    this.appScreen = new Tictactoe5Screen(this.storage);
                    this.appScreen.screen();
                    break;
                case Screens.sapper_menu:
                    this.appScreen = new SapperMenuScreen(this.storage);
                    this.appScreen.screen();
                    break;
                case Screens.sapper_game:                        
                    this.appScreen = new SapperScreen(this.storage);
                    this.appScreen.screen();
                    break;
                default:
                    alert( "no screen" );
            }
        }
    }
}

function test(storage:AppStorage, str:String="storage:"):void
{
    console.log(str);
    for (var i=0; i<storage.special.length; i++)
    {
        console.log("i:"+i+"; id:"+storage.special[i].id+"; value:"+storage.special[i].value);
    }
    console.log("---");
}

const main: Main = new Main();

export function mediator()
{
    console.log("back to gameManager");
    main.gameManager();
}

//script game logic execute point
document.addEventListener('DOMContentLoaded', function() 
{    
    main.gameManager();
});

// var mf = document.getElementById('mainField');
// function resizeHandler() 
// {
//     console.log("window resize"); 
//     var ratio = window.devicePixelRatio;
//     console.log("ratio:"+ratio);
// }
// window.addEventListener('load', resizeHandler);
// window.visualViewport.addEventListener('resize', resizeHandler);