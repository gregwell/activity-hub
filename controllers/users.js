import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import Activity from '../models/activity.js';

export const signin = async (req,res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser) return res.status(404).json({ message: "User does not exist."});
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }

};

export const signup = async (req,res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "User already exist."});

        if(password !== confirmPassword)   return res.status(400).json({ message: "Password don't match."});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`})

        const token = jwt.sign({ email: result.email, id: result._id}, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ result: result, token });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export const getUsers = async (req,res) => {

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message:error.message});
    }

};

export const getUserActivities = async (req,res) => {

    Activity.find({athlete: req.params.id})
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json("Request failed"));
};

export const deleteUser = async (req,res) => {

    //in the request we specify id for example: http://localhost:5000/users/12345thisisID12345
    //then we use mongoose function deleteOne, to delete the one record with _id: = this id specified in the request
    User.deleteOne({_id: req.params.id })
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json("request failed"));
};

export const getUserById = async (req,res) => {

    
    User.findById(req.params.id)
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json("Request failed"));

};

export const patchUser = async (req,res) => {

    User.updateOne({_id: req.params.id} , {$set: req.body })
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json("Request failed"));

};
