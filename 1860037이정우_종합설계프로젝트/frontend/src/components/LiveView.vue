<template>
    <v-container>
      <v-card class="reservation-card">
        <div class="star-decoration">★</div>
        <div id="live-view">
          <h3 class="reservation-heading">★★ 고객님의 예약정보★★</h3>
          <div class="id">병원코드: {{ deviceId }}</div>
          <div class="reservateId">예약번호: {{ reservateId }}</div>
          <div class="resroom">진료실: {{ resroom }}</div>
          <div class="resname">원장님 성함:{{ resname }}</div>
          <div class="resdate">예약일: {{ resdate }} </div>
          <div class="restime">예약시간: {{ restime }} </div>
        </div>
        <div class="star-decoration">★</div>
      </v-card>
    </v-container>
  </template>

<script>
export default {
    name: 'live-view',
    data() {
        return {
            deviceId: 0,
            reservateId: 0,
            resroom: '',
            resname: '',
            resdate: '',
            restime: ''
        }
    },
    created() {      //컴포넌트가 생성될 때 이벤트버스의 이벤트를 처리
        this.$socket.on('live', (data) => {
            this.deviceId = data.deviceId;
            this.reservateId = data.reservateId;
            this.resroom = data.resroom;
            this.resname = data.resname;
            this.resdate = data.resdate;
            this.restime = data.restime;
        })
    },
}
</script>

<style scoped>
.reservation-heading {
    color: green;
    text-align: center;

}
.reservation-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
}

.star-decoration {
  font-size: 2em;
  color: #071734;
}

.id {
    text-align: center;
    font-size: 15pt;
    color: #fbbccd;
}

.reservateId {
    text-align: center;
    font-size: 15pt;
    font-weight: 100;
    color: #fbbccd;
}

.resroom {
    text-align: center;
    font-size: 15pt;
    font-weight: 100;
    color: #fbbccd;
}

.resname {
    text-align: center;
    font-size: 15pt;
    font-weight: 100;
    color: #fbbccd;
}

.resdate {
    text-align: center;
    font-size: 15pt;
    font-weight: 100;
    color: #fbbccd;
}

.restime {
    text-align: center;
    font-size: 15pt;
    font-weight: 100;
    color: #fbbccd;
}

.live-view-container {
    text-align: center;
}

.id,
.reservateId,
.reshospital,
.resroom,
.resname,
.resdate,
.restime {
    font-size: 15pt;
    /* 원하는 크기로 조절하세요 */
    font-weight: bold;
    color: #fbbccd;
    border: 2px solid black;
    /* 테두리 추가 */
    padding: 10px;
    /* 내부 여백 추가 */
    margin: 5px;
    /* 외부 여백 추가 */
    background-color: #031935;
}</style>