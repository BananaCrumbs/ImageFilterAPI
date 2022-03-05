import ImageFilterRoute from "../../struct/ImageFilterRoute";
import magick from "../../magick/magick";

export default class Sketch implements ImageFilterRoute {
    
    private readonly image_data: Buffer;
    
    public constructor(image_data: Buffer, _query: any) {
        this.image_data = image_data;
    }
    
    public async apply(): Promise<Buffer> {
        return magick(this.image_data, ["-sketch", "0"]);
    }
    
}
