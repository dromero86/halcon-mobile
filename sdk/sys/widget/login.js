app.define("sys.widget.login",function()
{
    try{ $$("_login").close(); }catch(ex){ }

    __.changeUri("sys.widget.login");  
    __.setTitle("Bienvenido");

    var onSubmit = function(event)
    {   
        $$("_login").disable();

        var post = $$("_Flogin").getValues();
        
       //try{ $$("_login").close(); }catch(ex){ }
        __.POST( { "action": usr.session.login }, post , __.session.on.login); 
    };
 
    webix.ui
    ({
        id          : "_login"    ,
        css         : "login"     ,
        view		: "window"    , 
        head:
        {
            height     : 70,
            template   : "<img src='#url#' style='width: calc( 100% - 20px);' />",
            data       : { url: "./ui/img/logo_white.svg" },
            borderless : true
        },
        headHeight  : 70          ,
        position	: "center"    ,
        modal       : true        ,
        borderless  : true        ,
        margin      : 0           ,
        padding     : 0           ,
        body		:
        {
            id          : "_Flogin",
            view		: "form"   ,
            elements	:
            [
                {
                    css:"login-input",
                    height : 50 ,
                    cols:
                    [
                        { 
                            view : "icon", 
                            css  : "input-icon", 
                            icon : "fa fa-user", 
                            width: 56 
                        },
                        {  
                            id          : '_f1user',  
                            name        : 'user'   , 
                            view        : "text"   ,
                            placeholder : "@username"
                        }
                    ]
                },
                {
                    css:"login-input",
                    height : 50 ,
                    cols:
                    [
                        { 
                            view : "icon", 
                            css  : "input-icon", 
                            icon : "fa fa-lock", 
                            width: 56 
                        },
                        { 
                            id          : '_f2user'   ,
                            name        : 'pass'      ,
                            view        : "text"      , 
                            type        : "password"  ,
                            placeholder  : "******" 
                        }
                    ]
                }, 

                { 
                    height: 50           ,
                    id    : "submit"     , 
                    view  : "mdl_button" , 
                    value : "INGRESAR"   , 
                    css   : "btn_white"  ,
                    click : onSubmit     
                } 
                
            ],
            rules: {  user : webix.rules.isNotEmpty   }
        }
    });

    $$("_login").show();
    $$('_f1user').focus();
 
    document.querySelector('[view_id="_f2user"] div input').onkeyup  = function(key){  if(key.code == "Enter") onSubmit(key); };
    document.querySelector(".webix_modal").classList.add("login-modal");

    mobile.on("keyboard_activity", function(status){ 
        $$("_login").resize();
    });
});
