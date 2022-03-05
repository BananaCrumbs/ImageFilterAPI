import ImageFilterRoute from "../../struct/ImageFilterRoute";
import magick from "../../magick/magick";
import Bounds from "../../config/Bounds";

export default class Wave implements ImageFilterRoute {
    
    private readonly image_data: Buffer;
    private readonly query: any;
    
    public constructor(image_data: Buffer, query: any) {
        this.image_data = image_data;
        this.query = query;
        Bounds.check("wave", query);
    }
    
    public async apply(): Promise<Buffer> {
        return magick(this.image_data, ["-wave", `${this.query.amplitude ?? 5}x${this.query.wavelength ?? 5}`]);
    }
    
}
