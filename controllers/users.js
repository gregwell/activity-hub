import User from '../models/user.js';

export const getUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createUser = async (req,res) => {
    const user = req.body;
    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);

    } catch (error) {
        res.status(409).json({message :error.message})
    }
}

export const deleteUser = async (req,res) => {
    
    User.remove({_id: req.params.id })
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json("request failed"));

}

export const getUserById = async (req,res) => {

    User.findById(req.params.id)
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json("Request failed"));

}

export const patchUser = async (req,res) => {
    
    User.updateOne({_id: req.params.id} , {$set: req.body })
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json("Request failed"));

}