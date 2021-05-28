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
        rows:
        [
            {  
                view       : "toolbar" ,       
                elements   :
                [  
                    {  
                        view  : "label" , 
                        label : "WhatsApp"  
                    }, 
                    { },
                    {  
                        view  : "icon"  , 
                        icon  : "fas fa-search" , 
                        width : 45  
                    },  
                    {  
                        view  : "icon"  , 
                        icon  : "fas fa-ellipsis-v" , 
                        width : 45  
                    }
                ] 
            }, 
            {  
                id    : "content",   
                rows:
                [
                    {
                        view       : "tabbar"   ,  
                        value      : "listView" , 
                        optionWidth: 90        , 
                        multiview  : true       , 
                        options    : 
                        [
                            { id: "listView"   , value: "<span class='webix_icon fas fa-camera'></span>", width:40  },
                            { id: "formView"   , value: "CHATS"    },
                            { id: "emptyView"  , value: "ESTADOS"  },
                            { id: "lamadaView" , value: "LLAMADAS" }
                        ]
                    },    
                    {   
                        id   : "mymultiview",
                        cells:
                        [
                            { id: "listView"  , template: "Form Content"},                       
                            { id: "formView"  , template: "<i>Info about the Form</i>"},        
                            { id: "emptyView" , template: "empty Content"},                         
                            { id: "lamadaView", template: "<i>Info about the llamada</i>"}
                        ]
                    }
                ]
            }
        ]

    }); 
});
