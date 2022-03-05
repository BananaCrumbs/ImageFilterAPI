import ImageFilterRoute from "../../struct/ImageFilterRoute";
import magick from "../../magick/magick";
import Bounds from "../../config/Bounds";

export default class Deepfry implements ImageFilterRoute {
    
    private readonly image_data: Buffer;
    private readonly query: any;
    
    public constructor(image_data: Buffer, query: any) {
        this.image_data = image_data;
        this.query = query;
        Bounds.check("deepfry", query);
    }
    
    public async apply(): Promise<Buffer> {
        return magick(this.image_data, ["-modulate", `${this.query.modulation_a ?? 50},${this.query.modulation_b ?? 200}`,
            "-emboss", `0x${this.query.embossity ?? 1.1}`]);
    }
    
}
