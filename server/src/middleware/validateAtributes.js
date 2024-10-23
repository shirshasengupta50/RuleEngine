const tokenExtraction = require('../utils/tokenExtraction');
const { InvalidAttributeError } = require('../utils/errors/index');
const attributeCatalog = require('../utils/catalog/attributeCatalog');

const validateAttributesMiddleware = (req, res, next) => {
    try {
      const { ruleString } = req.body;

      let idx = 0;
      let tokens = [];
  
      while (idx < ruleString.length) {
        let [token, nextIdx] = tokenExtraction(ruleString, idx);
        tokens.push(token);
        idx = nextIdx;
      }

      tokens.forEach(token => {
        if (!['AND', 'OR', '>', '<', '>=', '<=', '=', '!=', '(', ')'].includes(token) && isNaN(token)) {
            if (!attributeCatalog.includes(token)) {
                throw new InvalidAttributeError(token);
            }
        }
      });
  
      next(); 
    } catch (error) {
      if (error instanceof InvalidAttributeError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
  
  module.exports = validateAttributesMiddleware;