const http = require("http");
const fs = require("fs");


const server = http.createServer((req, res) => {
    console.log(req.url);

    res.setHeader('Content-Type', 'text/html');
    let url1 ='./';

    if(req.url == '/'){
        url1 +='index.html';
        res.statusCode = 200;
    }else if (req.url == '/about'){
        url1 +='about.html';
        res.statusCode = 200;
    }else if (req.url == '/contact'){
        url1 +='contact.html';
        res.statusCode = 200;
    }else{
        url1 +='404.html';
        res.statusCode = 404;
    }

    fs.readFile(url1, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    });

} );

server.listen(3000, "localhost", () => {
    console.log("listening")
})