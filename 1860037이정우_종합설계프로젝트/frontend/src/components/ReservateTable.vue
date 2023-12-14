<template>
  <div id="app">
    <v-btn color="primary" @click.native="openDialog">예약</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          예약 추가
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="newReservation.deviceId" label="병원번호"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newReservation.reservateId" label="예약번호"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newReservation.resroom" label="예약진료실"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newReservation.resname" label="예약자명"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newReservation.resdate" label="예약일"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newReservation.restime" label="예약시간"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click.native="closeDialog">취소</v-btn>
          <v-btn color="blue darken-1" text @click.native="addNewReservation">추가</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-data-table :headers="headers" :items="items" class="custom-table">
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.deviceId }}</td>
          <td>{{ row.item.reservateId }}</td>
          <td>{{ row.item.resroom }}</td>
          <td>{{ row.item.resname }}</td>
          <td>{{ row.item.resdate }}</td>
          <td>{{ row.item.restime }}</td>
          <td>{{ row.item.register_date }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      urlinfo: 'http://127.0.0.1:8000/resvs/',
      headers: [
        { text: '예약번호', align: 'left', value: 'reservateId' },
        { text: '예약진료실', align: 'left', value: 'resroom' },
        { text: '예약자명', align: 'left', value: 'resname' },
        { text: '예약일', align: 'left', value: 'resdate' },
        { text: '예약시간', align: 'left', value: 'restime' },
        { text: '등록일', align: 'left', value: 'register_date' }
      ],
      items: [],
      dialog: false,
      newReservation: {
        reservateId: '',
        resroom: '',
        resname: '',
        resdate: '',
        restime: ''
      }
    };
  },

  created() {
    this.$bus.$on('Reservate1', this.refleshData);
    this.refreshData();
  },

  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    addNewReservation() {
      axios.post(this.urlinfo, this.newReservation)
        .then((res) => {
          console.log(res.data);
          this.items.push(res.data);
          this.dialog = false;
        })
        .catch((err) => {
          alert('에러 발생: ' + err);
        });
    },
    refleshData(data) {
      axios.get(this.urlinfo + data.deviceId) //서버에 요청하기
        .then((res) => {
          console.log(res.data); //성공시
          this.items = res.data;
        })
        .catch((err) => {
          alert('에러 발생: ' + err); //에러 발생
        });
    }
  }
};
</script>

<style scoped>
#app {
  margin: 20px;
}

.custom-table .v-data-table {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #000000; 
}

.custom-table th,
.custom-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #000000; 
}

.custom-table .v-data-table th {
  background-color: #000000;
  color: white; 
}

.custom-table .v-data-table tbody tr:nth-child(odd) {
  background-color: #000000;
}

.custom-table .v-data-table tbody tr:hover {
  background-color: #000000;
}
</style>