app.define("sdk.sys.core.session",function()  
{   
    var session = 
    {
        isOnline        : false,
        module          : 'sdk.app.layout.login',
        callAfterCheck  : true,
        postCallback    : function(o){ },

        config          :
        {
            url_check    : usr.session.check  , 
            sess_key     : usr.session.key    ,
            sess_hash    : usr.session.hash   ,
            module_denied: 'sdk.app.layout.login' ,
            module_pass  : "sdk.app.layout.main" 
        },

        set_hash: function(token)
        { 
            webix.storage.local.put( session.config.sess_hash , { value: token });  
        },

        get_hash: function()
        {
            var hash =  webix.storage.local.get( session.config.sess_hash );
            var hash_value =(hash!=null ? hash.value : "") ; 
            return hash_value;
        },
  
        on:
        {   
            logout    : function()
            {  
                session.isOnline = false ;  
                session.module   = session.config.module_denied;  

                webix.storage.session.clear();  
                webix.storage.local.clear();
 
                webix.message({type:"error", text: "Desconectado del servidor"}); 
                if( session.callAfterCheck )
                {
                    document.querySelector("body").innerHTML="";
                    app.require(session.module, session.postCallback);
                }

            },

            login    : function(server)
            {   
                session.isOnline = server.status ;
                session.module   = server.status ? session.config.module_pass : session.config.module_denied;  
                
                if( server.status == false ) 
                {
                    webix.storage.session.remove(session.config.sess_key); 
                    webix.message({type:"error", text: server.message + " (Codigo: "+server.errno+")" });
                }
                else
                {
                    webix.storage.session.remove(session.config.sess_key); 
                    webix.storage.session.put   (session.config.sess_key, server);   
                    session.set_hash(server.token);
                }
                     
                if( session.callAfterCheck )
                {
                    $$("login-panel").destructor();
                    app.require(session.module, session.postCallback);  
                }  
            },

            check    : function()
            {   
                __.GET( { "action": session.config.url_check, "token": session.get_hash()  },  session.on.afterCheck ); 
            }, 

            afterCheck : function( response )
            {  
                session.isOnline = response.status ;  
                
                if( response.status == false ) 
                {
                    webix.message({ type:"error", text: response.message + " (Codigo: "+response.errno+")"  });  

                    session.module = session.config.module_denied; 
                }
                else
                {
                    session.module = session.config.module_pass ; 

                    webix.storage.session.remove(session.config.sess_key); 
                    webix.storage.session.put   (session.config.sess_key, response);  
                }
  
                if( session.callAfterCheck ) 
                    app.require(session.module, session.postCallback); 

            },
            recover_start: function( response )
            {
                if( response.status == false ) 
                { 
                    $$("_recover_start").enable();
                    webix.message({ type:"error", text: response.message + " (Codigo: "+response.errno+")" }); 
                }
                else
                { 
                    try{ $$("_recover_start").close(); }catch(ex){ }
                    app.require("sdk.sys.widget.recover_end"); 
                }
            },
            recover_end: function( response ){
                if( response.status == false ) 
                { 
                    $$("_recover_end").enable();
                    webix.message({ type:"error", text: response.message + " (Codigo: "+response.errno+")" }); 
                }
                else
                { 
                    try{ $$("_recover_end").close(); }catch(ex){ }
                    app.require("sdk.sys.widget.login"); 
                }
            }
        } 
    };

    return session; 
});
