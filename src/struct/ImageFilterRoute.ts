
export default interface ImageFilterRoute {
    
    apply(): Promise<Buffer>;
    
}
