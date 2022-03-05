import Config from "./Config";
import ParametersOutsideBoundsError from "../struct/ParametersOutsideBoundsError";
import NoSuchBoundError from "../struct/NoSuchBoundError";

/**
 * Utility for checking the bounds of query parameters.
 */
export default class Bounds {
    
    /**
     * Check query parameter values against the Config.ts bounds.
     * 
     * This will return nothing if everything is within bounds, else it will throw an error.
     * 
     * @param path {string} the image API path (ex. `blur`, `sepia`, `grayscale`)
     * @param query {any} the query parameter values (ex. `{amount: 10}`)
     * 
     * @throws {ParametersOutsideBoundsError} if the query parameter values are out of bounds
     * @throws {NoSuchBoundError} if there are no bounds defined for the given path
     */
    public static check(path: string, query: any): void {
        // @ts-ignore
        const bounds = Config.BOUNDS[path];
        
        if(!bounds) {
            throw new NoSuchBoundError(`No bounds for path: ${path}`);
        }
        
        for(const key in bounds) {
            if(!bounds.hasOwnProperty(key)) {
                continue;
            }
            
            let value = query[key];
            
            if(!value) {
                continue;
            }
            
            const numeric_value = Number(value);
            
            //if value is not a number, then it is not a valid parameter
            if(isNaN(numeric_value)) {
                throw new ParametersOutsideBoundsError(`${key} parameter for ${path} is not a number`);
            }
            
            const min = bounds[key].min;
            const max = bounds[key].max;
            
            if(numeric_value < min || numeric_value > max) {
                throw new ParametersOutsideBoundsError(`The value of the ${key} parameter is outside the bounds of the ${path} endpoint (${min} - ${max})`);
            }
        }
    }
    
}
