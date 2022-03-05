
/**
 * Contains the methods for logging.
 */
export default class Logger {
    
    private static readonly gray = '\x1b[90m';
    private static readonly reset = '\x1b[0m';
    
    private static getDate(after: string): string {
        return `${this.gray}${new Date().toISOString()}${after}`;
    }
    
    /**
     * Logs a message to the console.
     * @param message {string} The message to log.
     */
    public static log(message: string): void {
        //format <BLUE>[INFO]</BLUE> <message>
        //replace <BLUE> with color code
        const blue = `\x1b[34m`;
        process.stdout.write(`${blue}[INFO  | ${Logger.getDate(blue)}]${Logger.reset} ${message}\n`);
    }
    
    /**
     * Logs a warning to the console.
     * @param message {string} The warning to log.
     */
    public static warn(message: string): void {
        //format <YELLOW>[WARN]</YELLOW> <message>
        //replace <YELLOW> with color code
        const yellow = `\x1b[33m`;
        process.stdout.write(`${yellow}[WARN  | ${Logger.getDate(yellow)}]${Logger.reset} ${message}\n`);
    }
    
    /**
     * Logs an error to the console.
     * @param message {string} The error to log.
     */
    public static error(message: string): void {
        //format <RED>[ERROR]</RED> <message>
        //replace <RED> with color code
        const red = `\x1b[31m`;
        process.stdout.write(`${red}[ERROR | ${Logger.getDate(red)}]${Logger.reset} ${message}\n`);
    }
    
}
