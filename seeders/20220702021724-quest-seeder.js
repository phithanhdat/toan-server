'use strict';

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));
                  
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

function ranInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

const foods = ['quả táo', 'quả cam', 'quả chuối', 'cái kẹo', 'cái bánh', 'cái bút', 'quyển vở'];
const liveFoods = ['con gà', 'con lợn', 'con vịt', 'con trâu', 'con bò', 'con dê'];
const friendNames = ['Mai', 'Lan', 'Minh', 'Tâm', 'Hoa'];
const adults = ['Cô giáo', 'Bố', 'Mẹ', 'Cô giáo', 'Bà ngoại', 'Cô giáo', 'Chú hàng xóm', 'Ông nội', 'Cô giáo', 'Mẹ', 'Mẹ', 'Mẹ', 'Mẹ', 'Mẹ'];

const quest_body = [
  'Có [x] [foods], bớt [y] [foods] còn mấy [foods]?',
  '[adults] có [x] [foods], [adults] cho bạn [friends] [y] [foods] vậy [adults] còn lại mấy [foods]?',
  'Nhà [friends] có [x] [live], ngày thứ nhất mẹ [friends] thịt [y] con, ngày thứ hai mẹ thịt [z] con, hỏi nhà [friends] còn lại mấy [live]?',
  '[friends] có [x] [foods], [adults] cho thêm [y] [foods], hỏi bây giờ [friends] có mấy [foods]?',
  'Thực hiện phép tính sau: \n [x] + [y] = ?',
  'Thực hiện phép tính sau: \n [x] - [y] = ?',
  'Chọn đáp án đúng để điền vào chỗ trống: \n ... + [y] = [x]',
  'Chọn đáp án đúng để điền vào chỗ trống: \n ... - [x] = [y]',
  'Chọn đáp án đúng để điền vào chỗ trống: \n [x] - ... = [y]',
  'Chọn đáp án đúng để điền vào chỗ trống: \n [y] + ... = [x]',
]

const getRange = (index) => {
  if (index < 10) {
    return 10
  } else if (index <= 20) {
    return 15
  } else if (index <= 40) {
    return 20
  } else if (index <= 60) {
    return 30
  } else if (index <= 100) {
    return 10
  } else if (index <= 120) {
    return 20
  } else if (index <= 150) {
    return 30
  }  else if (index <= 200) {
    return 50
  } else if (index <= 1000) {
    return 100
  }
}

const getBody = () => {
  const len = quest_body.length;
  const index = Math.floor(Math.random() * len);
  return quest_body[index];
} 

const pickout = (dict) => {
  const len = dict.length;
  const index = Math.floor(Math.random() * len);
  return dict[index];
}

const fillName = (body) => {
  // picking out
  const food = pickout(foods);
  const liveFood = pickout(liveFoods);
  const friendName = pickout(friendNames);
  const adult = pickout(adults);

  let tmp = body.replace(/\[foods\]/g, food);
  tmp = tmp.replace(/\[live\]/g, liveFood);
  tmp = tmp.replace(/\[adults\]/g, adult);

  // fix wrong upper replacement
  const indexOfWrongUpper = tmp.indexOf(adult, adult.length);
  if (indexOfWrongUpper !== -1) {
    let sub = tmp.substring(adult.length);
    const head = tmp.substring(0, adult.length);
    // sub = sub.replace(`${adult.toLowerCase()}`);
    // sub = sub.replace(`${adult.toLowerCase()}`);
    // sub = sub.replace(`${adult.toLowerCase()}`);
    tmp = head + sub.toLowerCase();

  }
  tmp = tmp.replace(/\[friends\]/g, friendName);
  return tmp;
}

const getType = (body) => {
  if (body.includes('bớt') || body.includes('cho bạn')
  || body.includes('tính sau') && body.includes(' - ')) {
    return 'minus';
  } else if (body.includes('thịt')) {
    return 'minus3';
  } else if (body.includes('cho thêm')
  || body.includes('tính sau') && body.includes(' + ')) {
    return 'plus';
  } else if (body.includes('chỗ trống:')) {
    if (body.includes('- ...') || body.includes('+ ...') || body.includes('... +')) {
      return 'minus'
    } else if (body.includes('... -')) {
      return 'plus'
    }
  }
} 

const genPlusOperan = (range) => {
  let total = ranInt(2, range);
  let x = ranInt(1, total - 1);
  let y = total - x;
  let correct = total;
  let a = correct;
  let b = correct - 2 > 1 ? correct - 2 : correct + 2;
  let c = correct + 1;
  let d = correct + 3;
  if (correct > 10) {
    b = correct + 5;
    c = correct - 5;
    d = correct + 8;
  }
  if (correct > 20) {
    b = correct + 10;
    c = correct - 10;
    d = correct + 15 < range ? correct + 15 : correct - 15;
  }
  let ans = [a,b,c,d];
  ans = shuffleArray(ans);
  return {x, y, correct, a: ans[0], b: ans[1], c: ans[2], d: ans[3]};
}

const genMinusOperan = (range) => {
  const bigNum = ranInt(2, range);
  const x = bigNum;
  const y = ranInt(1, bigNum-1);
  const correct = bigNum - y;
  let a = correct;
  let b = a + 1;
  let c = a + 2
  let d = a - 1;
  if (correct > 10) {
    b = a - 2;
    c = a + 2;
    d = a - 3;
  }
  if (correct > 20) {
    b = a - 10;
    c = a + 10;
    d = a - 15;
  }
  if (correct >= 30) {
    b = a + 5;
    c = a + 15;
    d = a - 20;
  }
  let ans = [a,b,c,d];
  ans = shuffleArray(ans);
  return {x, y, correct, a: ans[0], b: ans[1], c: ans[2], d: ans[3]};
}

const genMinus3Operan = (range) => {
  const bigNum = ranInt(3, range);
  const x = bigNum;
  let y = ranInt(2, bigNum-1);
  const correct = x - y;
  const z = ranInt(1, y-1);
  y = y - z;
  let a = correct;
  let b = a + 1;
  let c = a + 2
  let d = a - 1;
  if (correct > 10) {
    b = a - 2;
    c = a + 2;
    d = a - 3;
  }
  if (correct > 20) {
    b = a - 10;
    c = a + 10;
    d = a - 15;
  }
  if (correct >= 30) {
    b = a + 5;
    c = a + 15;
    d = a - 20;
  }
  let ans = [a,b,c,d];
  ans = shuffleArray(ans);
  let yz = [y,z];
  yz = shuffleArray(yz);
  return {x, y: yz[0], z: yz[1], correct, a: ans[0], b: ans[1], c: ans[2], d: ans[3]};
}

// type: plus, minus, minus3
const fillNumber = (body, range) => {
  const type = getType(body);
  let numData, _body, quest, answers;
  switch(type) {
    case 'plus':
      numData = genPlusOperan(range);
      _body = body.replace(/\[x\]/g, numData.x);
      _body = _body.replace(/\[y\]/g, numData.y);
      answers = {a: numData.a, b: numData.b, c: numData.c, d: numData.d}
      quest = {content: _body, correct: numData.correct, answers: JSON.stringify(answers), difficult: range}
      return quest;
    case 'minus':
      numData = genMinusOperan(range);
      _body = body.replace(/\[x\]/g, numData.x);
      _body = _body.replace(/\[y\]/g, numData.y);
      answers = {a: numData.a, b: numData.b, c: numData.c, d: numData.d}
      quest = {content: _body, correct: numData.correct, answers: JSON.stringify(answers), difficult: range}
      return quest;
    case 'minus3':
      numData = genMinus3Operan(range);
      _body = body.replace(/\[x\]/g, numData.x);
      _body = _body.replace(/\[y\]/g, numData.y);
      _body = _body.replace(/\[z\]/g, numData.z);
      answers = {a: numData.a, b: numData.b, c: numData.c, d: numData.d}
      quest = {content: _body, correct: numData.correct, answers: JSON.stringify(answers), difficult: range}
      return quest;
  }

}

module.exports = {
  async up (queryInterface, Sequelize) {
    const questions = [];
    const rans = []
    for (let i = 0; i < 1000; i++) {
      const r = getRange(i);
      let body = getBody();
      body = fillName(body);
      const quest = fillNumber(body, r);
      let data = {
        ...quest,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      questions.push(data)
    }

    return queryInterface.bulkInsert('Questions', questions);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
