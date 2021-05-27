var mobile = window.mobile || {};

mobile._mirror_events = {};

mobile.on = function(name, callback)
{   
    try
    {
        var fn = callback;

        if( (typeof mobile._mirror_events[name])  == "function")
        {
            fn = mobile._mirror_events[name]; 
        } 

        window.removeEventListener(name, fn);  
    }
    catch(e)
    {
        app.log(e);
    }

    mobile._mirror_events[name]=callback;
    window.addEventListener(name, callback);
};

mobile.trigger = function(name, value)
{  
    window.dispatchEvent(new CustomEvent(  name,  { detail: value, bubbles: true, cancelable: true }) );
};

if( __loader.iphoneDevice() == true)
{ 
    /*
    mobile.function = function(value)
    {
        webkit.messageHandlers.mobile.postMessage("function "+value);
    };  
    */  
} 

if( __loader.pcDevice() == true)
{
    /* 
    mobile.function  = function(value)
    {
        app.log("function dont work without mobile device");
    };
    */ 
} 