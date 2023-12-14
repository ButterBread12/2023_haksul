<template>
  <div class="about">
    <v-main>
      <v-container>
        <v-row class="text-center mt-3">
          <v-col>
            <v-card class="info-card">
              <v-card-text class="info-text">이미지를 클릭하시면 해당병원에 관련되어있는 E-gen 사이트로 이동되어 등록된 정보 열람이 가능합니다.</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(hospital, index) in hospitals" :key="index" cols="12" sm="6" md="4" lg="3">
            <v-card @click="goToCustomLink(hospital.link)" class="custom-card">
              <v-img :src="hospital.src" class="hospital-img" style="max-height: 200px;"></v-img>
              <v-card-subtitle class="hospital-name">{{ hospital.name }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<style scoped>
.custom-card {
  border: 2px solid black; 
}

.hospital-img {
  object-fit: cover; 
  max-height: 100%; 
}

.hospital-name {
  text-align: center; 
}

.about {
  background-color: #EE8D88; 
}

.info-card {
  padding: 10px;
  background-color: #4CAF50; 
}

.info-text {
  color: white; 
  font-size: 18px; 
}
</style>

<script>
export default {
  data() {
    return {
      hospitals: [
        { src: "https://to2.kr/eUX", name: "서울아산 이비인후과", link: "https://to2.kr/eW1" },//이미지 링크 이름 사이트 링크
        { src: "https://to2.kr/eWc", name: "연세으뜸이비인후과", link: "https://to2.kr/eW2" },
        { src: "https://to2.kr/eVP", name: "하나내과", link: "https://to2.kr/eW3" },
        { src: "https://to2.kr/eWd", name: "배사랑 내과", link: "https://to2.kr/eW4" },
        { src: "https://to2.kr/eWe", name: "미즈모아 산부인과", link: "https://to2.kr/eW5" },
        { src: "https://to2.kr/eWf", name: "관저 드림 의원", link: "https://to2.kr/eW6" },
        { src: "https://to2.kr/eWP", name: "관저 정신건강의학과", link: "https://to2.kr/eW7" },
        { src: "https://to2.kr/eWm", name: "사과나무치과의원", link: "https://to2.kr/eW8" },
      ]
    };
  },
  methods: {
    goToCustomLink(link) {
      // 이미지 클릭 시 해당 이미지의 링크로 이동하도록 설정
      window.location.href = link;
    },
  },
};
</script>
