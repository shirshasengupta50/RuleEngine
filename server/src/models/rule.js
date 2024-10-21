const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
    type : {
        type: String,
        required : true,
        enum : ['operator', 'condition', 'feild', 'value']
    },
    operator : {
        type : String,
        enum : [">", "<", "=", ">=", "<=", "AND", "OR"]
    },
    feild : {
        type : String
    },
    value : {
        type : mongoose.Schema.Types.Mixed
    },
    left : {
        type : mongoose.Schema.Types.Mixed
    },
    right : {
        type : mongoose.Schema.Types.Mixed
    }
});

const ruleSchema = new mongoose.Schema({
    rudeID : {
        type: Number,
        required: true,
        unique: true
    },
    ruleName: {
        type : String,
        required : true
    },
    root : nodeSchema,
});

const Rule = mongoose.model('Rule', ruleSchema);

module.exports = Rule;