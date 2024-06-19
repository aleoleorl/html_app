# html_app

Version 1.0 - initial version
Description:
Here presented 2 applications: js01_sapper_app and html_app.
js01_sapper_app was made by js-code only and contains varsion of sapper game. 
html_app was done with TypeScript and contains version of a Sapper game, version of a 5-in-row tictaktoe game and simple lobby for them. Also I didn't delete node-modules from repository that necessary for building TypeScript code into js-code by WebPack tool.
Known issues:
1. In the reason that was not handle a proper refactoring of the code here, it still can contains some incorrect naming style of variables, properties and methods, also were realize anonimous event methods that can't be deleted instead of name-known methods. Also the separating of code entities here and there still need to be improved to avoiding code dublicatation.
2. Logic of the tictaktoe-5 game sometimes choose not the best field to stop the player.