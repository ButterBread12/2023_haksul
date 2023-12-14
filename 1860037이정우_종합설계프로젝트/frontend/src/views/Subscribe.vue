<template><!--멤버-->
    <div id="app">
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{dialogTitle}}</span>
            </v-card-title>
            <v-card-text>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="사용자번호" v-model="deviceInfo.Id" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="사용자이름"  v-model="deviceInfo.username" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="패스워드"  v-model="deviceInfo.password" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="설명"  v-model="deviceInfo.description" required></v-text-field>
                  </v-flex> 
                  <v-flex xs12>
                    <v-text-field label="등록일"  v-model="deviceInfo.register_date" required></v-text-field>
                  </v-flex> 
                </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="btnClick($event)">취소</v-btn>
              <v-btn color="blue darken-1" text @click="btnClick($event)">확인</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-btn color="primary" v-on:click.native="addContact()">회원가입</v-btn>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data () {
      return {
        urlinfo:'http://127.0.0.1:8000/logins',
        deviceInfo:{
            _id: null,
            Id: null,
            username:null,
            password:null,
            description:null,
            register_date: null
        },
        dialog: false,
        dialogTitle:null,
      }
    },
    methods:{
      addContact(){
        this.dialog = true;
        this.dialogTitle = "회원가입";
        this.deviceInfo.register_date = Date.now();
      },
      btnClick($event){
        this.dialog = false;
        if($event.target.innerHTML == "확인"){ 
            axios.post(this.urlinfo,{ 
              deviceId: this.deviceInfo.deviceId, name: this.deviceInfo.name, latitude:  this.deviceInfo.latitude, longitude: this.deviceInfo.longitude, description:  this.deviceInfo.description
    , register_date:this.deviceInfo.register_date
            },{withCredentials:true})
            .then(() => {
              axios.get(this.urlinfo,{withCredentials:true}) //서버에 요청하기
              .then((res) => {
                //console.log(res.data); //성공시
                alert("연락처 추가 성공");
              })
              .catch((err) => {
                alert('에러 발생: ' + err); //에러 발생
              });
              
            })
            .catch((err) => {
              alert('에러 발생: ' + err); //에러 발생
            });          
        }
        this.deviceInfo.Id = null;
        this.deviceInfo.username = null;
        this.deviceInfo.password = null;
        this.deviceInfo.description = null;
        this.deviceInfo.register_date = null;
      }
  
    }
  }
  </script>
  <style scoped>
    div{
      margin:20px 5px 0 5px;
    }
  </style>
  