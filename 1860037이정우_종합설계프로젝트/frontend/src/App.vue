<template>
  <v-app id="inspire">
    <v-app-bar app color="purple" dark>
      <v-app-bar-nav-icon @click.stop="bDrawer = !bDrawer"></v-app-bar-nav-icon>
      <v-img src="https://to2.kr/eXA" max-height="64" contain @click="goToHome"></v-img>
      <v-toolbar-title>대전 병원정보 포털</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/login"><v-btn class="gary">로그인</v-btn></router-link>
      <v-btn @click="logout" class="gary">로그아웃</v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>
    <v-navigation-drawer absolute temporary v-model="bDrawer">
      <v-toolbar flat height="100px">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-avatar>
                <img src="https://to2.kr/eXA">
              </v-list-item-avatar>
              <v-list-item-title class="title">
                <h5> 회원님 환영합니다<v-btn text value="서비스 안내">
                    <v-icon>
                      <h5>out</h5>
                    </v-icon>
                  </v-btn></h5>
              </v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list class="pt-3">
        <v-list-item v-for="item in items" :key="item.text" :href="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer>
      <v-btn text value="서비스 안내">
        <v-icon>병원 정보 확인 및 예약이 가능한 홈페이지 입니다.</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>
  
<script>
export default {
  name: 'App',
  data() {
    return {
      bDrawer: false,
      items: [
        { text: '병원 정보확인', icon: 'mdi-image-area', to: '/about' },
        { text: '병원 위치 조회', icon: 'mdi-information-slab-circle', to: '/location' },
        { text: '병원 예약 관리', icon: 'mdi-star', to: '/reservate' },
        { text: '회원관리', icon: 'mdi-star', to: '/member' },
      ],
    };
  },
  methods: {
    goToHome() {
      // 현재 경로와 새로운 경로가 다른지 확인
      if (this.$router.currentRoute.path !== '/') {
        // 다를 경우에만 홈 화면으로 이동
        this.$router.push('/');
      }
    },
    logout() {
      this.$http.get('http://127.0.0.1:8000/logout')
        .then(response => {
          if (response.status === 200) {
            this.$router.push('/login');  
          }
        })
        .catch(error => {
          console.error(error);
        });
      router.push('/');
    },
  },
  created() {
    this.$socket.emit('rint', { data: 'First Request' });
  },
};
</script>
  
<style scoped>a {
  text-decoration: none;
  color: white;
}</style>
  