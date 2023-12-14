<template>
  <v-row justify="center">
    <v-date-picker
      v-model="date"
      @click:date="Click"
      :allowed-dates="allowedDates"
      class="mt-4"
      min="2018-01-01"
      max="2023-12-31"
    ></v-date-picker>
    <p>
      Month:{{ date }}
      Year:{{ date }}
    </p>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    date: '2023-03-02',
  }),

  methods: {
    allowedDates: () => true, // All dates are allowed
    Click(date) {
      this.$emit('newDate', date);
    },
  },
};
</script>