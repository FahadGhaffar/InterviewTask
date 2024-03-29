

import express from 'express';
const router = express.Router();

import {
    getAllUsers,
    getSingleUser,
    createUser,
    getByName,
    getByAccount,
    viewTransaction

} from '../controllers/customersController.js'



router
    .route('/')
    .get(getAllUsers);

router
    .route('/viewTransaction')
    .get(viewTransaction);

router.route('/').post(createUser);
router.route('/name').post(getByName);
router.route('/account').post(getByAccount);


router.route('/:id').get(getSingleUser);

// module.exports = router;
export default router