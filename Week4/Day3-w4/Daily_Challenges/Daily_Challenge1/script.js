
class Video {
    constructor(title, uploader, time) {
        this.title = title
        this.uploader = uploader
        this.time = time
    }
    
    
    watch() {
        console.log(`${this.uploader} watched all ${this.time} minute of ${this.title} !`)
    }
}

const firstVid = new Video("firstTitle", "Houssam", 5)
firstVid.watch()
const secondVid = new Video("SecodTitle", "Khalid", 34)
secondVid.watch()



const videoDataArray = [
    { title: "Cats Compilation", uploader: "Maya", time: 150 },
    { title: "JavaScript Crash Course", uploader: "Sam", time: 1800 },
    { title: "Nature Documentary", uploader: "Lina", time: 2400 },
    { title: "Workout Routine", uploader: "Tom", time: 900 },
    { title: "Cooking Pasta", uploader: "Anna", time: 600 }
];

const videos = videoDataArray.map(vid=> new Video(vid.title, vid.uploader,vid.time))
videos.forEach(video=> video.watch())