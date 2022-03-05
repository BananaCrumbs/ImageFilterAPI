import magick from "../../magick/magick";
import ImageFilterRoute from "../../struct/ImageFilterRoute";
import Bounds from "../../config/Bounds";

export default class Swirl implements ImageFilterRoute {
    
    private readonly image_data: Buffer;
    private readonly query: any;
    
    public constructor(image_data: Buffer, query: any) {
        this.image_data = image_data;
        this.query = query;
        Bounds.check("swirl", query);
    }
    
    public async apply(): Promise<Buffer> {
        return magick(this.image_data, ["-swirl", `${this.query.degrees ?? 100}`]);
    }
    
}
