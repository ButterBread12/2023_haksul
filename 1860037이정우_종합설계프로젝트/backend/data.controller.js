const devData = require('./data.model.js');

// 새로운 연락처 만들기
exports.create = (req, res) => {
  $socket.emit('live', {         //새로운 장치 데이터가 업로드되면 소켓을 이용하여 클라이언트에 전달
    deviceId: req.body.deviceId,
    hospitalId: req.body.hospitalId,
    room: req.body.room,
    name: req.body.name
  });
  const sample = new devData({
    deviceId: req.body.deviceId,
    hospitalId: req.body.hospitalId,
    room: req.body.room,
    name: req.body.name
  });
  console.log("data update")
  //데이터베이스에 새로운 연락처 저장하기 
  sample.save()
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//모든 연락처 검색
exports.findAll = (req, res) => {
  devData.find()
    .then(samples => {
      res.send(samples);
      console.log(samples)	//test log
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//특정한 연락처 검색
exports.findOne = (req, res) => {
  devData.find({ deviceId: req.params.deviceId })
    .then(samples => {
      if (!samples) {
        return res.status(404).send({
          message: req.params.deviceId + "에 해당하는 장치가 없습니다."
        });
      }
      res.send(samples);
    }).catch(err => {
      return res.status(500).send({ message: req.params.deviceId + " 로 검색 중 에러 발생" });
    });
};
   /*data.controller.js*/
/* data.controller.js */
// 특정한 연락처 수정 (PUT 요청) - deviceId와 hospitalId를 기준으로 수정 
exports.updateByHospitalId = (req, res) => {
  devData.findOneAndUpdate(
    { deviceId: req.params.deviceId, hospitalId: req.params.hospitalId },
    { $set: { room: req.body.room, name: req.body.name } },
    { new: true }
  )
    .then(sample => {
      if (!sample) {
        return res.status(404).send({
          message: "해당하는 데이터가 없습니다."
        });
      }
      res.send(sample);
    })
    .catch(err => {
      return res.status(500).send({ message: "수정 중 에러 발생" });
    });
};

// 특정한 연락처 삭제 (DELETE 요청) - deviceId와 hospitalId를 기준으로 삭제
exports.deleteByHospitalId = (req, res) => {
  devData.findOneAndRemove({ deviceId: req.params.deviceId, hospitalId: req.params.hospitalId })
    .then(sample => {
      if (!sample) {
        return res.status(404).send({
          message: "해당하는 데이터가 없습니다."
        });
      }
      res.send({ message: "삭제되었습니다." });
    })
    .catch(err => {
      return res.status(500).send({ message: "삭제 중 에러 발생" });
    });
};

