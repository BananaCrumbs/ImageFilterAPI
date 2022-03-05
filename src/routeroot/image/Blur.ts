import ImageFilterRoute from "../../struct/ImageFilterRoute";
import magick from "../../magick/magick";
import Bounds from "../../config/Bounds";

export default class Blur implements ImageFilterRoute {
    
    private readonly image_data: Buffer;
    private readonly query: any;
    
    public constructor(image_data: Buffer, query: any) {
        this.image_data = image_data;
        this.query = query;
        Bounds.check("blur", query);
    }
    
    public async apply(): Promise<Buffer> {
        return magick(this.image_data, ["-blur", `0x${this.query.intensity || 5}`]);
    }
    
}
