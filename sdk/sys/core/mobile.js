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
    mobile.open_location_settings = function()
    {
        webkit.messageHandlers.mobile.postMessage("open_location_settings");
    };

    mobile.open_camera            = function()
    {
        webkit.messageHandlers.mobile.postMessage("open_camera");
    };

    /*
    mobile.start_videocall        = function(value, security)
    {
        webkit.messageHandlers.mobile.postMessage("start_videocall "+value+" "+security);
    }; 

    mobile.add_firebase_listener  = function(value)
    {
        webkit.messageHandlers.mobile.postMessage("add_firebase_listener "+value);
    };
    */
   
    mobile.notify_incoming        = function()
    {
        webkit.messageHandlers.mobile.postMessage("notify_incoming");
    };
    
    mobile.get_app_version        = function()
    {
        webkit.messageHandlers.mobile.postMessage("get_app_version");
    };

} 

if( __loader.pcDevice() == true)
{
    mobile.open_location_settings = function()
    {
        app.log("open_location_settings dont work without mobile device");
    };

    mobile.open_camera            = function()
    {
        app.log("open_camera dont work without mobile device");
    };

    /*
    mobile.start_videocall        = function(value)
    {
        app.log("start_videocall dont work without mobile device");
    }; 

    mobile.add_firebase_listener  = function(value)
    {
        app.log("add_firebase_listener dont work without mobile device");
    };
    */
   
    mobile.notify_incoming        = function()
    {
        app.log("notify_incoming dont work without mobile device");
    };

    mobile.get_app_version        = function()
    {
        app.log("get_app_version dont work without mobile device");
    };
} 