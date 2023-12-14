module.exports = (app) => {
  const devices = require('./device.controller.js');
  const datas = require('./data.controller.js');
  const resvs = require('./reservate.controller.js');
  const logins = require('./login.controller.js');

  // devices 라우팅
  app.get('/devices', devices.findAll);
  app.get('/devices/:deviceId', devices.findOne);
  app.post('/devices', devices.create);
  app.put('/devices/:deviceId', devices.update);
  app.delete('/devices/:deviceId', devices.delete);

  // datas 라우팅 - deviceId를 기준으로 업데이트 및 삭제 - router.js
  app.post('/datas', datas.create);
  app.get('/datas/:deviceId', datas.findOne);
  app.put('/datas/:deviceId/:hospitalId', datas.updateByHospitalId);   // deviceId와 hospitalId 를 기준으로 업데이트
  app.delete('/datas/:deviceId/:hospitalId', datas.deleteByHospitalId); // deviceId와 hospitalId를 기준으로 삭제

  //Resv 라우팅
  app.post('/resvs', resvs.create);
  app.get('/resvs/:deviceId', resvs.findOne);
  app.put('/resvs/:deviceId/:reservateId', resvs.updateByReservationId);   // reservateId와 hospitalId를 기준으로 업데이트
  app.delete('/resvs/:deviceId/:reservateId', resvs.deleteByReservationId); // reservateId와 hospitalId를 기준으로 삭제

  //login
  app.get('/logins', logins.findAll);      //모든 Id 검색
  app.get('/logins/:Id', logins.findOne);  //특정 Id 검색
  app.post('/logins', logins.create);      //새로운 Id 추가, 회원 가입
  app.put('/logins/:Id', logins.update);   //특정 Id 업데이트
  app.delete('/logins/:Id', logins.delete); //특정 Id 삭제

}
