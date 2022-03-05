import ImageFilterRoute from "../../struct/ImageFilterRoute";
import magick from "../../magick/magick";

export default class Invert implements ImageFilterRoute {
    
    private readonly image_data: Buffer;
    
    public constructor(image_data: Buffer, _query: any) {
        this.image_data = image_data;
    }
    
    public async apply(): Promise<Buffer> {
        //i'm surprised this is all it takes tbh, magick is more useful than i thought
        return magick(this.image_data, ["-negate"]);
    }
    
}
