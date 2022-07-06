'use strict';
function genInfo() {
  const nameDic = [
    'DatDat', 'HoaLien', 'MingMing', 'LoaLoa', 'KhaKha', 'LinkLink', 'LongLong', 'VienVien'
  ];
  const tail = 'asdfghjklpoiuytrewqzxcvbnm';
  const name = nameDic[Math.floor(Math.random() * nameDic.length)] +
   tail.charAt(Math.floor(Math.random() * tail.length)) +
   tail.charAt(Math.floor(Math.random() * tail.length));
  const email = name.toLocaleLowerCase() + "@gmail.com";
  return {name, email};
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 50; i++) {
      const info = genInfo();
      const user = {
        userName: info.name,
        email: info.email,
        password: '123456',
        phone: '0123456789',
        role: 2,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      users.push(user);
    }
    return queryInterface.bulkInsert('Users', users);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
