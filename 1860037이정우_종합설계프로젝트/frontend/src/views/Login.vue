<template>
  <v-app id="app">
    <v-main>
      <v-container
        style="position: relative; top: 20%; margin-left: 20%"
        class="text-xs-center"
      >
        <v-layout row wrap class="text-xs-center">
          <v-flex>
            <v-card flat class="mx-auto" max-width="800">
              <v-row style="margin-top: 60px">
                <v-col>
                  <v-form style="width: 400px; height: 300px">
                    <div class="mx-3">
                      <v-icon color="black" size="30px">person</v-icon>
                      userId
                      <div class="mx-1">
                        <v-text-field
                          placeholder="userId"
                          v-model="userId"
                          required
                        ></v-text-field>
                      </div>
                    </div>
                    <div class="mx-3">
                      <v-icon color="black" size="30px">lock</v-icon>
                      userPassword
                      <div class="mx-1">
                        <v-text-field
                          placeholder="userPassword"
                          type="password"
                          v-model="userPassword"
                          required
                        ></v-text-field>
                      </div>
                    </div>

                    <v-card-actions>
                      <v-btn
                        color="#2c4f91"
                        dark
                        large
                        block
                        @click="loginSubmit"
                        >Login</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-col>
              </v-row>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data() {
    return {
      urlinfo:'http://127.0.0.1:8000/login',
      userId: null,
      userPassword: null,
    };
  },
  methods: {
    loginSubmit() {
      let saveData = {};
      saveData.username = this.userId;
      saveData.password = this.userPassword;

      try {
          axios.post(this.urlinfo, qs.stringify(saveData), {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              },
//               withCredentials: true
          }).then((res) => {
            if (res.status === 200) {
              // 로그인 성공시 처리해줘야할 부분
              if(res.data.code === 0){        //로그인 실패
                  alert('로그인 실패');
                  this.$router.push('/subscribe');
              } else if(res.data.code === 2) {  //접근제한 페이지
                  alert('접근제한 페이지');
                  this.$router.push('/fail');                
              } else if(res.data.code === 1){
                  alert('로그인 성공');
                  this.$router.push('/fhome');
              }
              // 로그인 버튼 모양 바꾸어주기
            } else if(res.status === 401) {
              alert(res.data.message);
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>