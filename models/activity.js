import mongoose from 'mongoose'

const activitySchema = mongoose.Schema({
    athlete: String,
    distance: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        default: 0
    },
    start: {
        type: Date,
        default: new Date(),
    },
    stop: {
        type: Date,
        default: new Date(),
    },
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;