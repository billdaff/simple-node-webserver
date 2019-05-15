const http = require('http');


const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Welcome!</title></head>')
        res.write('<body><h1>Welcome to the server!</h1>')
        res.write('<p>Username: <form action ="/create-user" method ="POST"><input type="text" name ="username"><button type ="submit">Send</button></form></h1></p></body>')
        res.write('</html>');
        return res.end();
    }
    if(url ==='/users'){
        res.write('<html>');
        res.write('<head><title>Users</title></head>')
        res.write('<body><h1>Users</h1><ul>')
        for(let i = 0; i< 5; i++){
            res.write('<li>User '+i+'</li>');
        }
       
        res.write('</ul></body></html>');
        return res.end();
    }
    if(url ==='/create-user'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1]
            if(username != ''){
                console.log(username)
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            }
        });
    }
});


server.listen(3000);
