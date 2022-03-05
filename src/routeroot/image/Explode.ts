import ImageFilterRoute from "../../struct/ImageFilterRoute";
import magick from "../../magick/magick";
import Bounds from "../../config/Bounds";

export default class Explode implements ImageFilterRoute {
    
    private readonly image_data: Buffer;
    private readonly query: any;
    
    public constructor(image_data: Buffer, query: any) {
        this.image_data = image_data;
        this.query = query;
        Bounds.check("explode", this.query);
    }
    
    public async apply(): Promise<Buffer> {
        //explode is reverse implode, so a negative count will reverse the effect
        return magick(this.image_data, ["-implode", `${(this.query.amount ?? 0.75) * -1}`]);
    }
}
