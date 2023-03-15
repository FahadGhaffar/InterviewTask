import User from "../models/customers.js"

import { StatusCodes } from "http-status-codes"

import { NotFoundError, BadRequestError } from "../errors/index.js"

import fs from 'fs'

// const data = JSON.parse(fs.readFileSync('./sample_analytics/customers.json'))
const transactionsSample = JSON.parse(fs.readFileSync('./sample_analytics/transactionsSample.json'))


const viewTransaction = async (req, res) => {

    // const users = await User.find({});
    res.status(StatusCodes.OK).json({ transactionsSample });
};
const getAllUsers = async (req, res) => {

    const users = await User.find({});
    res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        throw new NotFoundError(`No user with id : ${req.params.id}`);
    }

    res.status(StatusCodes.OK).json({ user });
};


const createUser = async (req, res) => {


    try {
        const user = await User.create(req.body);
        // const user = await User.create(data);
        // const task = new Task({ "name": "ABC", 'completed': true });
        // await task.save()
        res.status(StatusCodes.CREATED).json({ user })

    } catch (error) {


        throw new BadRequestError(`Please provide correct info`);

    }

    // const task = req.body;
    // res.status(201).json({ task })
}
const getByName = async (req, res) => {

    try {

        const { name: Username } = req.body;
        console.log(Username);
        const user = await User.findOne({ name: Username });
        if (!user) {


            throw new NotFoundError(`No user with  : ${Username}`);
        }

        // res.json({ id: req.params.id })
        res.status(StatusCodes.OK).json({ user })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error })
    }

}
// const getByAccount = async (req, res) => {

//     try {

//         const { account_id: accountId } = req.body;
//         console.log(accountId);
//         // const user = await User.findOne({ accounts: [{ account_id: accountId }] });
//         const user = await User.findOne({ "accounts.account_id": accountId });
//         if (!user) {

//             throw new NotFoundError(`No user with  : ${accountId}`);
//         }

//         // res.json({ id: req.params.id })
//         res.status(200).json({ user })
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }

// }


const getByAccount = async (req, res) => {

    try {

        const { account_id: accountId } = req.body;
        console.log(accountId);
        const user = await User.findOne({ "user.accounts": { $elemMatch: { account_id: accountId } } });

        if (!user) {

            throw new NotFoundError(`No user with  : ${accountId}`);
        }
        const getaccountArray = user.accounts
        // console.log(getaccountArray);
        // res.json({ id: req.params.id })
        let getAccount = getaccountArray.filter(function (obj) {
            return obj.account_id == accountId;
        })[0];

        res.status(200).json({ getAccount })
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}




export {
    getAllUsers,
    getSingleUser,
    createUser,
    getByName,
    getByAccount,
    viewTransaction

}

