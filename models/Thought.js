const { Schema, model, Types } = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
          },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
          },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);




thoughtSchema.virtual('formatDate').get(function(date){
    return moment(date).format('MMMM Do YYYY, h:mm:ss a')
});

reactionSchema.virtual('formatDate').get(function(date){
    return moment(date).format('MMMM Do YYYY, h:mm:ss a')
});
 



const Thought = model('thought', thoughtSchema);

module.exports = Thought;