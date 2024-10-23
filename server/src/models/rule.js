const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
    type : {
        type: String,
        required : true,
        enum : ['operator', 'condition', 'field', 'value']
    },
    operator : {
        type : String,
        enum : [">", "<", "=", ">=", "!=", "<=", "AND", "OR"]
    },
    field : {
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
    ruleID : {
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