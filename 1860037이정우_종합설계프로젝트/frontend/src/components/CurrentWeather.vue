<template>
    <div>
        <v-card class="current-weather-card"></v-card>
        <div id="current-weather">
            <div class="location"> 현재 위치: {{ location }}</div>
            <div class="weather"> 날씨: {{ weather }}</div>
            <div class="temperature"> 기온: {{ temperature }}℃</div>
            <div class="air">미세먼지 정보: {{ airQualityText }} <br>{{ air }}μg/m3</div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'current-weather',
    data() {
        return {
            location: '',
            weather: '',
            temperature: 0,
            air: 0,
            airQualityText: '',
            lat: 37.566535,
            lng: 126.977969,
        }
    },
    created() {
        this.$bus.$on('sendCordinate', this.setCordinate);
    },
    methods: {
        setCordinate(cordinate) {
            this.lat = cordinate.lat();
            this.lng = cordinate.lng();

            this.axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=67c78818c6afe50f6425fa397c98a955`)
                .then((response) => {
                    let data = response.data;
                    this.location = data.name;
                    this.weather = data.weather[0].main;
                    this.temperature = (data.main.temp - 273.15).toFixed(1);
                })
                .catch((error) => {
                    console.error('OpenWeatherMap API 호출 중 오류:', error);
                });

            this.axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${this.lat}&lon=${this.lng}&rad=500&key=GR0%2F%2FgT%2FgYnnHqm%2Bw8pgwh9qRl84HwE5pCzZJ0u4X0m3VA1aNkyS6r%2B65gWguwKLJolwZN4TxNWtTlkXSpAgZA%3D%3D`)
                .then((response) => {
                    let data = response.data.data;
                    if (data && data.current && data.current.pollution) {
                        this.air = data.current.pollution.aqius;
                        this.setAirQualityText(this.air);
                    } else {
                        console.error('미세먼지 정보가 없습니다.');
                    }
                })
                .catch((error) => {
                    console.error('AirVisual API 호출 중 오류:', error);
                });
        },
        setAirQualityText(airQuality) {
            if (airQuality >= 0 && airQuality <= 30) {
                this.airQualityText = '좋음';
            } else if (airQuality >= 31 && airQuality <= 80) {
                this.airQualityText = '보통';
            } else if (airQuality >= 81 && airQuality <= 150) {
                this.airQualityText = '나쁨';
            } else {
                this.airQualityText = '매우나쁨';
            }
        }
    }
}
</script>

<style scoped>
.current-weather-card {
    border: 2px solid black;
    /* 테두리 추가 */
    padding: 15px;
    /* 내부 여백 추가 */
    margin: 10px;
    /* 외부 여백 추가 */
}

.location,
.weather,
.temperature,
.air {
    text-align: center;
    font-size: 20pt;
    color: black;
    font-weight: bold;
    /* 글자 굵기 추가 */
    border: 1px solid black;
    /* 텍스트에 테두리 추가 */
    padding: 5px;
    /* 텍스트 내부 여백 추가 */
    margin: 5px;
    /* 텍스트 외부 여백 추가 */
}

.weather {
    font-size: 16pt;
    /* 날씨 텍스트에 대한 별도의 크기 지정 */
}

.temperature {
    font-size: 30pt;
    /* 온도 텍스트에 대한 별도의 크기 지정 */
}

.air {
    font-size: 16pt;
    /* 대기질 텍스트에 대한 별도의 크기 지정 */
}</style>