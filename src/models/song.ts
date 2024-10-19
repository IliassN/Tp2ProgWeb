export class Song {
    constructor(
        public id: string,
        public name: string,
        public previewUrl?: string,
        public durationMs?: number,
        public artist?: string
    ) { }
}