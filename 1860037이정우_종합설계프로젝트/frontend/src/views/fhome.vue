<template>
  <div class="fhome">
    <v-main>
      <v-text-field v-model="searchText" label="검색" class="custom-text-field"></v-text-field>
      <v-date-picker v-model="selectedDate" class="custom-date-picker">
        <template v-slot:header="{ date }">
          <div class="custom-header">{{ date.toLocaleString('default', { year: 'numeric', month: 'long' }) }}</div>
        </template>
      </v-date-picker>

      <v-time-picker v-model="currentTime" label="실시간 시간" readonly class="custom-time-picker"></v-time-picker>
      <div class="slider-container">
        <div class="slider">
          <div class="images" ref="images">
            <img v-for="(image, index) in imageSources" :key="index" :src="image" class="image" :style="{ width: `${width}px`, height: `${height}px` }" />
          </div>
        </div>
        <div class="button-container">
          <button v-for="(image, index) in imageSources" :key="index" :data-position="index" @click="setCurrent(index)"
            class="slider-button">{{ index }}
          </button>
        </div>
         <v-card class="welcome-card">
          <v-card-text>
            <div>
              <h3>홈페이지 방문을 환영합니다!</h3>
            </div>
          </v-card-text>
        </v-card>
      </div>
      
    </v-main>
  </div>
</template>

<style>
.fhome {
  background-color: #EE8D88; 
}

.custom-text-field {
  position: fixed;
  bottom: 150px;
  right: 0;
  width: 280px;
  margin: 20px; 
  border: 1px solid black;
}

.custom-date-picker {
  position: fixed;
  top: 50px;
  right: 0;
  margin: 16px; 
}

.custom-time-picker {
  position: fixed;
  top: 50px;
  left: 0;
  margin: 16px;
}

.slider-container {
  position: fixed;
  top: 250px;
  left: 300px;
  margin: 50px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.slider {
  position: relative;
  width: 800px; 
  height: 400px; 
  overflow: hidden;
}

.images {
  position: absolute;
  display: flex;
  width: calc(800px * 8); 
  transition: left 0.5s ease-in-out;
}

.image {
  margin: 0 5px;
  width: 800px; 
  height: 400px; 
  object-fit: cover;
}

.button-container {
  margin-top: 10px;
  order: 1;
}

.slider-button {
  width: 50px;
  height: 30px;
  margin: 5px 0;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}

.custom-header {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.welcome-card {
  width: 800px; 
  margin-bottom: 20px; 
}


</style>

<script>
export default {
  data() {
    return {
      searchText: "",
      selectedDate: null,
      currentTime: null,
      width: 800,
      height: 400,
      current: 0,
      imageSources: [
        "https://to2.kr/eUX", // 서울아산이비인후과
        "https://to2.kr/eWc", // 연세으뜸이비인후과
        "https://to2.kr/eVP", // 하나내과
        "https://to2.kr/eWd", // 배사랑 내과
        "https://to2.kr/eWe", // 미즈모아 산부인과
        "https://to2.kr/eWf", // 관저드림의원
        "https://to2.kr/eWg", // 관저정신건강의학과
        "https://to2.kr/eWm", // 사과나무 치과
      ]
    };
  },
  mounted() {
    setInterval(this.nextSlide, 3000);
    setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
    this.updateCurrentTime();
  },
  methods: {
    setCurrent(index) {
      this.current = index;
      this.moveTo();
    },
    moveTo() {
      const images = this.$refs.images;
      if (images) {
        images.style.left = `-${this.current * this.width}px`;
      }
    },
    nextSlide() {
      this.current = (this.current + 1) % this.imageSources.length;
      this.moveTo();
    },
    updateCurrentTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      this.currentTime = `${hours}:${minutes}`;
    }
  }
};
</script>

