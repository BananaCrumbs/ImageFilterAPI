import * as HTTPServer from "http";
import * as HTTPSServer from "https";

import ImageFilterRoute from "./struct/ImageFilterRoute";
import Config from "./config/Config";

//please make a pr if you know a way of loading without importing
import Pixelate from "./routeroot/image/Pixelate";
import Deepfry from "./routeroot/image/Deepfry";
import Explode from "./routeroot/image/Explode";
import Implode from "./routeroot/image/Implode";
import Emboss from "./routeroot/image/Emboss";
import Invert from "./routeroot/image/Invert";
import Sketch from "./routeroot/image/Sketch";
import Spread from "./routeroot/image/Spread";
import Magik from "./routeroot/image/Magik";
import Sepia from "./routeroot/image/Sepia";
import Swirl from "./routeroot/image/Swirl";
import Blur from "./routeroot/image/Blur";
import Wave from "./routeroot/image/Wave";
import * as url from "url";
import NoSuchBoundError from "./struct/NoSuchBoundError";
import ParametersOutsideBoundsError from "./struct/ParametersOutsideBoundsError";
import {readFileSync} from "fs";

export default class SiteServer {
    
    private readonly server: HTTPServer.Server | HTTPSServer.Server;
    
    public static readonly index: string = readFileSync("./pub/index.html", "utf8");
    
    public constructor() {
        
        //http/https server
        if(Config.HTTPS) {
            this.server = HTTPSServer.createServer({
                key: Config.HTTPS_OPS.key,
                cert: Config.HTTPS_OPS.cert,
                minVersion: "TLSv1.2",
            });
        } else {
            this.server = HTTPServer.createServer();
        }
        
        //the lambda must be done this way, do not arrow directly into SiteServer.onRequest
        this.server.on("request", (req, res) => {
            SiteServer.onRequest(req, res);
        });
    }
    
    public start(): void {
        this.server.listen(Config.PORT, Config.HOST);
    }
    
    private static runFilter(routeable: ImageFilterRoute, res: HTTPServer.ServerResponse) {
        routeable.apply().then((data) => {
            res.writeHead(200, {
                "Content-Type": "image/png",
                "Content-Length": data.length,
            });
            res.end(data);
        }).catch((err) => {
            res.writeHead(500, {
                "Content-Type": "text/plain",
            });
            res.end(err);
        });
    }
    
    private static async onRequest(req: HTTPServer.IncomingMessage, res: HTTPServer.ServerResponse): Promise<any> {
        
        console.log(`User ${req.socket.remoteAddress} requested ${req.url} with method ${req.method}`);
        
        if(req.url === "/") {
            res.writeHead(200, {
                "Content-Type": "text/html",
            });
            res.end(SiteServer.index);
            return;
        }
        
        //if the server requires authentication, check for it
        if(Config.API_KEYS.enabled) {
            
            //get the api key from the Authorization header
            const apiKey = req.headers.authorization;
            
            if(!apiKey) {
                res.writeHead(401);
                return res.end("Unauthorized");
            }
            
            //check if the api key is valid
            if(!Config.API_KEYS.keys.includes(apiKey)) {
                console.warn(`User ${req.socket.remoteAddress} attempted to use an invalid API key: ${apiKey.substring(0, 5)}...`);
                res.writeHead(401);
                return res.end("Unauthorized");
            }
            
            console.log(`User ${req.socket.remoteAddress} used a valid API key: ${apiKey.substring(0, 5)}...`);
        }
        
        if(req.method !== "POST") {
            res.writeHead(405);
            return res.end("405 Method Not Allowed");
        }
        
        if(!req.url) {
            res.writeHead(400);
            return res.end("400 Bad Request");
        }
        
        const query = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
        
        req.url = req.url.split("?")[0];
        
        let body = Buffer.alloc(0);
        
        req.on("data", (chunk) => {
            body = Buffer.concat([body, chunk]);
        });
        
        req.on("end", () => {
            
            try {
                //it's 2:30am for me, if you know a better way to do this, please make a pr
                switch (req.url) {
                    case "/image/blur": return this.runFilter(new Blur(body, query), res);
                    case "/image/deepfry": return this.runFilter(new Deepfry(body, query), res);
                    case "/image/emboss": return this.runFilter(new Emboss(body, query), res);
                    case "/image/explode": return this.runFilter(new Explode(body, query), res);
                    // case "/image/grayscale": return this.runFilter(new Grayscale(buff), res);
                    case "/image/implode": return this.runFilter(new Implode(body, query), res);
                    case "/image/invert": return this.runFilter(new Invert(body, query), res);
                    case "/image/pixelate": return this.runFilter(new Pixelate(body, query), res);
                    case "/image/magik": return this.runFilter(new Magik(body, query), res);
                    case "/image/sepia": return this.runFilter(new Sepia(body, query), res);
                    case "/image/sketch": return this.runFilter(new Sketch(body, query), res);
                    case "/image/spread": return this.runFilter(new Spread(body, query), res);
                    case "/image/swirl": return this.runFilter(new Swirl(body, query), res);
                    case "/image/wave": return this.runFilter(new Wave(body, query), res);
                    
                    default:
                        res.writeHead(404);
                        return res.end("404 Not Found");
                }
            } catch(err) {
                if(err instanceof NoSuchBoundError || err instanceof ParametersOutsideBoundsError) {
                    res.writeHead(400);
                    return res.end(`400: ${err.message}`);
                } else if(err instanceof Error) {
                    res.writeHead(500);
                    return res.end(`500: ${err.message}`);
                }
            }
        })
        
    }
    
}
