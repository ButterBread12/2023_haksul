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
import Reservate from '../components/Reservate';


export default {
    name: 'App',
    components: {
        DeviceTable,
        DataTable,
        LiveView,
        ReservateTable,
        Reservate
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
  