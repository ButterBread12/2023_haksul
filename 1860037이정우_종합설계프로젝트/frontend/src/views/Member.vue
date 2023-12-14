<template> <!--관리자 페이지-->
    <div id="app">
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{dialogTitle}}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
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
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="btnClick($event)">취소</v-btn>
              <v-btn color="blue darken-1" text @click="btnClick($event)">확인</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-btn color="primary" v-on:click.native="addContact()">추가</v-btn>
      <v-data-table :headers="headers" :items="items" class="elevation-1">
          <template v-slot:item="row">
          <tr>
              <td>{{row.item.Id}}</td>
              <td>{{row.item.username}}</td>
              <td>{{row.item.password}}</td>
              <td>{{row.item.description}}</td>
              <td>{{row.item.register_date}}</td>
              <td class="text-xs-right">
                  <v-btn color="primary" v-on:click.native="updateContact(row.item)">수정</v-btn>
                  <v-btn color="primary" v-on:click.native="deleteContact(row.item)">삭제</v-btn>
                  <v-btn color="primary" v-on:click.native="sendEvent(row.item)">보기</v-btn>
              </td>
          </tr>
        </template>
      </v-data-table>
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
  
        headers: [
          { text: '번호', align: 'left', value: 'Id'},
          { text: '사용자', align: 'left', value: 'username'},
          { text: '패스워드', align: 'left',value: 'password'},
          { text: '설명', align: 'left', value: 'description'},
          { text: '등록일', align: 'left', value: 'register_date'},
          { text: '관리', align: 'left', value: '' },
        ],
        items:[]
      }
    },
    created(){
        axios.get(this.urlinfo,{withCredentials:true}) //서버에 요청하기
        .then((res) => {
            console.log(res.data); //성공시
            this.items = res.data;
        })
        .catch((err) => {
            alert('에러 발생: ' + err); //에러 발생
        });
    },
    methods:{
      addContact(){
        this.dialog = true;
        this.dialogTitle = "추가";
        this.deviceInfo.register_date = Date.now();
      },
      updateContact(data){
        this.dialog = true;
        this.dialogTitle = "수정";
        this.deviceInfo.Id = data.Id;
        this.deviceInfo.username = data.username;
        this.deviceInfo.password = data.password;
        this.deviceInfo.description = data.description;
        this.deviceInfo.register_date = data.register_date;
      },
      deleteContact(data){
        this.dialog = true;
        this.dialogTitle = "삭제";
        this.deviceInfo.Id = data.Id;
        console.log('deleteContact : ' + data);
      },
      sendEvent(data){
        this.$bus.$emit('deviceSelected',data);
      },
  
      btnClick($event){
        this.dialog = false;
        if($event.target.innerHTML == "확인"){
          if(this.dialogTitle =="추가"){ 
            axios.post(this.urlinfo,{ Id: this.deviceInfo.Id, username: this.deviceInfo.username, password: this.deviceInfo.password, description:  this.deviceInfo.description
    , register_date:this.deviceInfo.register_date
            },{withCredentials:true}).then(() => {
              axios.get(this.urlinfo,{withCredentials:true}) //서버에 요청하기
              .then((res) => {
                this.items = res.data;
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
          else if(this.dialogTitle=="수정"){
            //alert("입력된 정보 : " + "이메일 : " + this.contactInfo.email + " 패스워드 : " + this.contactInfo.password);
            axios.put(this.urlinfo + '/'+ this.deviceInfo.Id, { 
              Id: this.deviceInfo.Id, username: this.deviceInfo.username, password:  this.deviceInfo.password,
              description:  this.deviceInfo.description, 
              register_date:this.deviceInfo.register_date
            })
            .then(() => {          
              axios.get(this.urlinfo) //서버에 요청하기
              .then((res) => {
                //console.log(res.data); //성공시
                this.items = res.data;
                alert("업데이트 성공");
              })
              .catch((err) => {
                alert('에러 발생: ' + err); //에러 발생
              });
            })
            .catch((err) => {
              alert('에러 발생: ' + err); //에러 발생
            }); 
  
          }
          else {
            axios.delete(this.urlinfo + '/'+ this.deviceInfo.Id, { data: { Id: this.deviceInfo.Id } })
            .then((result) => { 
              console.log("삭제 후" + result); //성공시
              axios.get(this.urlinfo) //서버에 요청하기
              .then((res) => {
                this.items = res.data;
                alert("삭제 성공");
              })
              .catch((err) => {
                alert(' 삭제 후 데이터 가져오는 중 에러 발생: ' + err); //에러 발생
              });            
            })
            .catch((err) => { alert('에러 발생: ' + err); });          
  
          }
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
  