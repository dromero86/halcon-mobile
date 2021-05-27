app.run(function(){  
    
	webix.ready(function(){   

		webix.ui.fullScreen();   
        webix.Touch.enable ();   

        if(usr.session.enable == true )
        {
            app.require("sdk.sys.core.session", function(session) { 
                __.session = session; 
                __.session.on.check(); 
            });             
        }
        else 
        { 
            app.require("sdk.app.layout.main" ); 
        }
	});  
}); 