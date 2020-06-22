/*
    @layout Main
    @type   Default  
*/
app.define("app.layout.main",function()
{   
    document.body.innerHTML = "";
    document.body.removeAttribute("style"); 

    webix.ui
    ({  
        id    : "main" , 
        rows:
        [
            { 
                id         : "header", 
                view       : "mdl_toolbar" ,       
                elements   :
                [  
                    { 
                        id    : "top-menu:left", 
                        view  : "mdl_icon" , 
                        icon  : "fa fa-home" , 
                        width : 56  
                    }, 
                    { 
                        view     : "mdl_toolbar_image" , 
                        template : "<img src='./ui/img/logo-rounded-simple.svg' />"  
                    },  
                    { 
                        id    : "top-menu:right",
                        view  : "mdl_icon_rounded"  , 
                        icon  : "fa fa-user" , 
                        width : 56 , 
                        popup : "popup_user_options" 
                    } 
                ] 
            },
            { 
                id    : "content"  
            } 
        ]

    });
 
    webix.ui
    ({ 
        id        : "popup_user_options",
        css       : "mo-window",
        view      : "popup",  
        width     : 170,
        borderless: true,
        margin    : 0,
        padding   : 0,
        body      :
        {
            css: "mo-modal",
            rows:
            [ 
                {
                    css       : "mo-list",
                    view      : "list", 
                    borderless: true,
                    margin    : 0,
                    padding   : 0,
                    type      : { height:40  },
                    template  : "<span class='webix_icon fa-#icon#'></span> #name#", 
                    select    : true,
                    autoheight: true,
                    data      :
                    [ 
                        { id: "app.layout.home"             , name:"Inicio"        , icon: " fa fa-home"       }, 
                        { id: "app.layout.datos_personales" , name:"Mis Datos"     , icon: " fa fa-user"       }, 
                        { id: "sys.widget.logout"           , name:"Cerrar sesión" , icon: " fa fa-power-off"  } 
                    ],
                    on        :
                    {
                        onItemClick: function(id)
                        { 
                            if( __.isNumber(id)) return; 

                            $$("popup_user_options").hide();

                            app.require( this.getItem(id).id );
                        } 
                    }                       
                }
            ]         
        }
    }); 
 
});
