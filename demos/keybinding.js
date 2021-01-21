$.engine.thisEqualsLast(() => {
    var keyboardEventObj = $.store.get("keyboardEvent");

    if (!keyboardEventObj.GetType().FullName.includes('EventConnection')) {
        //Bind to the asynchronous event (non-blocking)
        var keyboardEvent = $.keyboard.hook((sender, event) => {
                try {
                    //If the Left or Right Shift key is pressed/released
                    if(event.Key == vk.LSHIFT || event.Key == vk.RSHIFT) {
                        //Shift key is down
                        if(event.KeyState == KeyState.Down) {
                            sp.StoreBool("ShiftDown", true);
                        } else {
                            sp.CreateTimer("ShiftWatch", 100, 100, `sp.StoreBool("ShiftDown", false);sp.DeleteTimer("ShiftWatch");`); 
                        }
                    }

                    if (
                        event.Key == vk.INSERT &&
                        event.KeyState == KeyState.Down &&
                        sp.GetStoredBool("ShiftDown")
                    ) {
                        sp.MessageBox("Shift+NUMPAD0 (Shift+Insert)", "Key");
                    }   
                } catch {}
            });

        $.store.set("keyboardEvent", keyboardEvent);
    };
});