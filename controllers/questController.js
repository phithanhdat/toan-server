const Question = require('../models').Question;
const Sequelize = require('sequelize');

module.exports = {
    list(req, res) {
        Question.findAll({
            attributes: ['id', 'content', 'answers', 'correct', 'difficult']
        })
        .then(data => {
            if (data) {
                let okData = [];
                for (let i = 0; i < 10; i++) {
                    let idx = Math.floor(Math.random() * data.length);
                    let dataItem = data[idx]
                    dataItem.dataValues.answers = JSON.parse(dataItem.dataValues.answers);
                    okData.push(dataItem);
                }
                res.status(200).send({message: 'Get data success', data: okData})
            } else {
                res.status(400).send({message: 'Can not get data', data: null})
            }
        })
        .catch(err => {
            res.status(400).send({message: 'Can not get data', error: err})
        });
    }
}