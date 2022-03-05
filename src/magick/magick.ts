import {spawn} from "child_process";

/**
 * Uses the ImageMagick command line tools to perform various image
 * 
 * The library on npm was so awful and literally all it did was do the command
 * line, so I decided to write my own, and having a simple function to spawn
 * a child process and return a promise buffer is better than that library.
 * 
 * @param buffer {Buffer} The image to perform the operation on.
 * @param args {string[]} The arguments to pass to the command line.
 * @returns {Promise<Buffer>} The resulting image.
 */
export default async function(buffer: Buffer, args: string[]): Promise<Buffer> {
    
    //needed for magick stdout (last arg)
    if(args[args.length - 1] !== "-") {
        args.push("-");
    }
    
    //needed for magick stdin (first arg)
    if(args[0] !== "-") {
        args.unshift("-");
    }
    
    //spawn a child process of `convert ${args}`
    const child = spawn("convert", args);
    
    //send the buffer to the child process
    child.stdin.write(buffer);
    child.stdin.end();
    
    //allocate a new buffer which will be returned once the child process has finished
    let buff: Buffer = Buffer.alloc(0);
    
    //return the child process' stdout
    return new Promise((resolve, reject) => {
        //on error
        child.stderr.on("data", reject);
        
        //on data, append it to the buffer
        child.stdout.on("data", (data: Buffer) => {
            buff = Buffer.concat([buff, data]);
        });
        
        //on exit, resolve the promise
        child.on("exit", () => {resolve(buff)});
    });
}
