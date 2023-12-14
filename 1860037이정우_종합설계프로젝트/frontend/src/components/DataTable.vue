<template>
  <div id="app">
    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.deviceId }}</td>
          <td>{{ row.item.hospitalId }}</td>
          <td>{{ row.item.room }}</td>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.register_date }}</td>
         
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      urlinfo: 'http://127.0.0.1:8000/datas/',
      contactInfo: {
        id: null,
        deviceId: null,
        hospitalId: null,
        room: '',
        name: '',
        register_date: null
      },
      dialog: false,
      dialogTitle: null,
      headers: [
        { text: '병원번호', align: 'left', value: 'deviceId' },
        { text: '병원코드', align: 'left', value: 'hospitalId' },
        { text: '진료실', align: 'left', value: 'room' },
        { text: '원장님성함', align: 'left', value: 'name' },
        { text: '등록일', align: 'left', value: 'register_date' }

      ],
      items: []
    }
  },

  created() {
    this.$bus.$on('deviceSelected1', this.refleshData)

  },
  methods: {
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
}
</script>
<style scoped>
div {
  margin: 0 5px 0 5px;
}
</style>