import mongoose from "mongoose";
const UserAccount = mongoose.Schema({

    account_id: { type: String, required: true },
    limit: { type: Number, required: true },
    transaction_count: { type: Number, required: true },

});


const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        birthdate: {
            type: Date,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },

        accounts: [UserAccount],

    },
    { timestamps: true }
);

export default mongoose.model('User', UserSchema);