const fs = require('fs');

const PATH = './shared/last_queries.json';

const saveLastQueris = async (req, res, next) => {
   const queries = req.body.queries;
   const queriesJson = JSON.stringify({queries: queries});
   fs.writeFile(PATH, queriesJson, err => {
        if (err) {
        console.error(err);
        return;
        }
        res.status(200).send("Succeed writes to file");
  });
}

const getLastQueris = async (req, res, next) => {
    fs.readFile(PATH, 'utf8' , (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        if(data){
            res.status(200).json(data);
        }
    })
} 

exports.saveLastQueris = saveLastQueris;
exports.getLastQueris = getLastQueris;
