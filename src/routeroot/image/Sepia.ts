import ImageFilterRoute from "../../struct/ImageFilterRoute";
import magick from "../../magick/magick";
import Bounds from "../../config/Bounds";

export default class Sepia implements ImageFilterRoute {
    
    private readonly image_data: Buffer;
    private readonly query: any;
    
    public constructor(image_data: Buffer, query: any) {
        this.image_data = image_data;
        this.query = query;
        Bounds.check("sepia", query);
    }
    
    public async apply(): Promise<Buffer> {
        return magick(this.image_data, ["-sepia-tone", `${this.query.tone ?? 80}%`]);
    }
}
