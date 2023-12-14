
<template>
  <div>  
    <v-btn color="primary" dark @click="openDialog">예약</v-btn>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeDialog">취소</v-btn>
          <v-btn color="blue darken-1" text @click="submitReservation">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urlinfo: 'http://127.0.0.1:8000/resvs/',
      contactInfo: {
        id: null,
        deviceId: null,
        reservateId: null,
        reshospital: '',
        resroom: '',
        resname: '',
        resdate: '',
        restime: '',
        register_date: null
      },
      dialog: false,
      dialogTitle: '예약 정보 입력',
      valid: true
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    submitReservation() {
      // 유효성 검사
      if (this.$refs.form.validate()) {
        // 서버로 데이터 전송
        axios.post(this.urlinfo, this.contactInfo)
          .then((res) => {
            console.log(res.data);

            // 부모 컴포넌트에 이벤트를 발생시켜 예약 정보 전달
            this.$emit('resSelected2', this.contactInfo);

            // 다이얼로그 닫기
            this.closeDialog();
          })
          .catch((err) => {
            alert('에러 발생: ' + err);
          });
      }
    }
  }
}
</script>
