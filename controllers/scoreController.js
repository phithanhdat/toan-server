const Score = require('../models').Score;
const Sequelize = require('sequelize');

module.exports = {
    update(req, res) {
        const { stars, active, lock, round_id, user_id } = req.body;
        Score.update({
                stars: stars,
                active: active,
                lock: lock,
            },
            { where: Sequelize.and({user_id: user_id}, {round_id: round_id})}
        ).then(count => {
            if (count > 0) {
                res.status(200).send({
                    message: 'Update success',
                    affectedRows: count 
                });
            } else {
                return Score
                .create({
                    stars: stars,
                    active: active,
                    lock: lock,
                    round_id: round_id,
                    user_id: user_id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .then(score => {
                    res.status(201).send(score)
                })
                .catch(error => res.status(400).send(error));
            }
        })

    }
}
