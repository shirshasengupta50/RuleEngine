const modificationAST = require('./modificationAST');

module.exports = {
    buildAST : require('./buildAST'),
    combine_rules : require('./combineRules'),
    evaluateASTNode : require('./evaluateAST'),
    parseTokens : require('./parseTokes'),
    parseValue : require('./parseValues'),
    tokenExtraction : require('./tokenExtraction'),
    modificationAST
}