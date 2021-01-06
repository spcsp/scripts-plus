function clearhttpd(prefix = "localhost", port = 8885) {
    const server = new clr.System.Net.HttpListener();
    server.Prefixes.Add(`http://${prefix}:${port}/`);

    const getContext = server => {
        const context = server.GetContext(); //Blocks
        const request = context.Request;
        const response = context.Response;

        response.AddHeader("Content-Type", "application/json");
        return { request, response };
    };

    const reply = payload => {
        const { request, response } = getContext(server);
        const buffer = clr.System.Text.Encoding.UTF8.GetBytes(JSON.stringify(payload));
        const output = response.OutputStream;

        response.ContentLength64 = buffer.Length;
        output.Write(buffer, 0, buffer.Length);
        output.Close();
    };

    return { server, reply };
}



var { server, reply } = clearhttpd();

try {
    if (!server.IsListening) {
        server.Start();
        reply({ httpd: "says hello"});
    }    
} catch (err) {
    $.alert(`${err}`);
} finally {
    server.Stop();
}
