import Activity from '../models/activity.js';

export const getActivities = async (req,res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createActivity = async (req,res) => {
    const activity = req.body;
    var startDate = new Date((new Date()).getTime() - activity.duration*60000);
    const newActivity = new Activity({...activity, start: startDate});
    try {
        await newActivity.save();
        res.status(201).json(newActivity);

    } catch (error) {
        res.status(409).json({message :error.message})
    }
}

export const deleteActivity = async (req,res) => {
    
    Activity.remove({_id: req.params.id })
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json("request failed"));

}

export const getActivityById = async (req,res) => {

    Activity.findById(req.params.id)
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json("Request failed"));

}

export const patchActivity = async (req,res) => {
    
    Activity.updateOne({_id: req.params.id} , {$set: req.body })
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json("Request failed"));

}