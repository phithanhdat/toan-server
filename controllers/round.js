
const Round = require('../models').Round;
const db_config = require('../config/config.json');
const { Sequelize } = require('../models');
const db = new Sequelize(
    db_config.development.database,
    db_config.development.username,
    db_config.development.password, {
        host: db_config.development.host,
        dialect: db_config.development.dialect,
        pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        },
    });

module.exports = {
    list(req, res) {
        const userId = req.query.user_id;
        const _where = `WHERE user_id = ${userId}`
        const query = `SELECT * FROM score_join ${_where} ORDER BY round_id ASC`;
        return db.query(query, { type: Sequelize.QueryTypes.SELECT})
        .then(data => {
            if (data) {
                if (data.length > 0) {
                    res.status(200).send({message: 'Get data success', data});
                } else {
                    Round.findAll({
                        attributes: [['id', 'round_id'], 'type', ['name', 'round_name']]
                      })
                    .then(_data => {
                        if (_data) {
                            const okdata = [];
                            const dumData = {user_id: userId, stars: 0, active: 0, lock: 0};
                            _data.forEach(o => {
                                const newData = {
                                    id: o.dataValues.round_id,
                                    ...dumData,
                                    ...o.dataValues,
                                };
                                okdata.push(newData);
                            });
                            res.status(200).send({message: 'Get data success', data: okdata});
                        } else {
                            res.status(400).send({message: 'Get data _fail', data: null});
                        }
                    })
                    .catch(err => {
                        res.status(400).send({error: err});
                    })
                }
            } else {
                res.status(400).send({message: 'Get data fail', data: null});
            }
        })
        .catch(error => res.status(400).send(error));
    }
}