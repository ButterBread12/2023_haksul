<template>
    <div class="location">
      <v-container fluid>
          <v-row>
              <v-col>
                  <device-table/>
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <google-map/> 
              </v-col>
              <v-col>
                  <current-weather/>                
              </v-col>
          </v-row>
      </v-container>
    </div>
  </template>
  <script>
  import DeviceTable from '../components/DeviceTable';
  import GoogleMap from '../components/GoogleMap';
  import CurrentWeather from '../components/CurrentWeather';

  export default {
    name: 'App',
    components: {
      DeviceTable,
      CurrentWeather,
      GoogleMap,
    },
    data: () => ({
      //
    }),
    methods:{
      dateUpdate(date){
          alert(date);
      }
    }
  }
  </script>
  