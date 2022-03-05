/**
 * This class stores the configuration for the server.
 * 
 * For more information on how to use this class, see the Wiki on GitHub under "Configuration".
 * https://github.com/BananaCrumbs/ImageFilterAPI/wiki/
 */
export default class Config {
    
    /**
     * The port to host on.
     * 
     * Note: Linux operating systems reserve ports under 1024 for privileged processes.
     * 
     * If you want to use port 80/443, use nginx to forward the request to a different port.
     * DO NOT run this program as root.
     */
    public static readonly PORT = 8080;
    
    /**
     * The host to bind to.
     * 
     * If you do not know what this means, do not change it.
     */
    public static readonly HOST = "localhost";
    
    /**
     * Only enable HTTPS if you intend to host
     * this publicly (where external users connect)
     * 
     * If you are the only one accessing the API, you
     * do not need to enable HTTPS.
     */
    public static readonly HTTPS = false;
    
    /**
     * Location for the SSL certificate for HTTPS.
     * 
     * If you are not using HTTPS, this is ignored.
     */
    public static readonly HTTPS_OPS = {
        key: './ssl/key.pem',
        cert: './ssl/cert.pem'
    };
    
    /**
     * If you require users to authenticate before accessing the API, enable this
     * and define the API keys which they will use for the Authorization header here.
     * 
     * If you do add API keys, you will have to restart the server for
     * them to take effect; however, this may be changed in the future.
     */
    public static readonly API_KEYS = {
        enabled: false,
        
        //keys are just a string, generate them as you wish
        keys: [
            "1234567890abcdefghijklmnopqrstuvwxyz",
            "9876543210zyxwvutsrqponmlkjihgfedcba",
        ],
        
        //if you want to use a different header name, change this
        header: "Authorization"
    };
    
    /**
     * Change the upper and lower bounds of the parameters for each filter.
     */
    public static readonly BOUNDS = {
        blur: {
            intensity: {
                min: 0,
                max: 100,
            }
        },
        deepfry: {
            modulation_a: {
                min: 1,
                max: 300,
            },
            modulation_b: {
                min: 1,
                max: 300,
            },
            embossity: {
                min: 0.0,
                max: 5.0,
            },
        },
        emboss: {
            embossity: {
                min: 0.0,
                max: 5.0,
            }
        },
        explode: {
            amount: {
                min: 0,
                max: 100,
            }
        },
        implode: {
            amount: {
                min: 0.0,
                max: 1.0,
            }
        },
        pixelate: {
            descale: {
                min: 0,
                max: 10,
            },
            rescale: {
                min: 0,
                max: 1000,
            }
        },
        sepia: {
            tone: {
                min: 0,
                max: 100,
            }
        },
        spread: {
            amount: {
                min: 0,
                max: 500,
            }
        },
        swirl: {
            degrees: {
                min: -720,
                max: 720,
            }
        },
        wave: {
            amplitude: {
                min: 0,
                max: 100,
            },
            wavelength: {
                min: 0,
                max: 1000,
            }
        }
    }
}
