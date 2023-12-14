<template>
    <div class="reservation">
        <v-container fluid>
            <v-row>
                <v-col>
                    <device-table />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <data-table />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <date-picker v-on:newDate="dateUpdate"></date-picker>
                </v-col>
                <v-col class="small-font">
                    <reservate-table />
                </v-col>
                <v-col>
                    <live-view />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import DeviceTable from '../components/DeviceTable';
import DataTable from '../components/DataTable';
import LiveView from '../components/LiveView';
import ReservateTable from '../components/ReservateTable';
import DatePicker from '../components/DatePicker';


export default {
    name: 'App',
    components: {
        DeviceTable,
        DataTable,
        LiveView,
        ReservateTable,
        DatePicker
    },
    data: () => ({
        //
    }),
    methods: {
        dateUpdate(date) {
            alert(date);
        }
    }
}
</script>
  