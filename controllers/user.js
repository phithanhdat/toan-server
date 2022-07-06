const User = require('../models').User;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? (page-1) * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    console.log('page: '+page);
    console.log('limit: '+limit);
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    items.forEach(d => {
        d.password = '*******';
    });
    return { totalItems, items: items, totalPages, currentPage };
}


module.exports = {
    create(req, res) {
        return User
        .create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            phone: req.body.phone,
            role: 2,
            status: 1,
        })
        .then(user => {
            user.password = '******'
            res.status(201).send(user)
        })
        .catch(error => res.status(400).send(error));
    },

    login(req, res) {
        const {email, password} = req.body;
        console.log('email:'+email)
        console.log('password:'+password);
        var condition = {email: email, password: password};

        User.findAll({
            attributes: ['id', 'email', 'userName', 'phone', 'role', 'status'],
            where: condition
        }).then(user => {
            if(user.length > 0){
                if(user[0].status == 0){
                    const data = {message: 'Tài khoản chưa được kích hoạt', user: null};
                    res.statusMessage = 'Account is deactivated';
                    res.status(400).send(data);
                }else{
                    //const data = {message: 'Succsessfull', user: user[0]}
                    res.status(200).send({message: 'Login success', user: user[0]});
                }
            }else{
                User.findAll({where: {email: email}})
                .then(data => {
                    if(data.length > 0){
                        const data = {message: 'Mật khẩu không chính xác', user: null};
                        res.statusMessage = 'Mat khau khong chinh xac';
                        res.status(400).send(data);
                    }else{
                        const data = {message: 'Tài khoản không tồn tại', user: null};
                        res.statusMessage ='Tai khoan khog ton tai';
                        res.status(400).send(data);
                    }
                })
            }
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    updateInfo(req, res) {
        const {password, name, phone, status, role, user_id} = req.body;
        if(password){
            User.update({
                password: password,
                name: name,
                phone: phone,
                status: status,
                role: role,
            }, {
                where: {id: user_id}
            }).then(count => {
                res.status(200).send({
                    message: 'Update success',
                    affectedRows: count 
                });
            })
            .catch(err => res.status(400).send(err))
        }else{
            User.update({
                name: name,
                phone: phone,
                status: status,
                role: role,
            }, {
                where: {id: user_id}
            }).then(count => {
                res.status(200).send({
                    message: 'Update success',
                    affectedRows: count 
                });
            })
            .catch(err => res.status(400).send(err))
        }
    }, 

    list(req, res) {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);

        User.findAndCountAll({where: {}, limit, offset})
        .then(data => {
            const users = getPagingData(data, page, limit)
            res.statusMessage = 'Successfull'
            res.status(200).send(users);
        })
        .catch(err => {
            res.statusMessage = 'Error'
            res.status(400).send(err);
        })
    }, 
}