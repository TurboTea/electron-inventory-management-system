<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                >
                    <v-list-item three-line>
                        <v-list-item-icon>
                            <v-icon color="next" large>mdi-cart</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <div class="text-overline mb-4">
                            Total incom
                            </div>
                            <v-list-item-title class="text-h5 mb-1">
                            10 000 DZD
                            </v-list-item-title>
                            <v-list-item-subtitle>Saved 25%</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>

            <v-col>
                <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                    shaped
                >
                    <v-list-item three-line>
                        <v-list-item-icon>
                         <v-icon color="next" large>mdi-warehouse</v-icon>
                        </v-list-item-icon>
                    <v-list-item-content>
                        <div class="text-overline mb-4">
                        Total incom
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                        10 000 DZD
                        </v-list-item-title>
                        <v-list-item-subtitle>Saved 25%</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col>
                <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                    shaped
                    color=" warning"
                    dark
                >
                    <v-list-item three-line>
                        <v-list-item-avatar>
                         <v-img
                            left
                            src="../assets/icons/point-of-sale.png"
                            >
                        </v-img>
                        </v-list-item-avatar>
                    <v-list-item-content>
                        <div class="text-overline mb-4">
                        Total incom
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                        10 000 DZD
                        </v-list-item-title>
                        <v-list-item-subtitle>Saved 25%</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            
        </v-row>
        <v-row>
            <v-col>
                <template>
                    <div id="donut">
                        <apexchart type="donut" height="350" :options="chartOptions" :series="series"></apexchart>
                    </div>
                </template>
            </v-col>

            <v-col>
                <template>
                   <div id="polarArea">
                        <apexchart type="polarArea" :options="chartOptions1" :series="series1"></apexchart>
                    </div>
                </template>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div id="line">
                    <apexchart type="line" height="350" :options="chartOptions2" :series="series2"></apexchart>
                </div>
            </v-col>
        </v-row>
       
    </v-container>
</template>

<script>


export default {
   
    data: () => ({
        
          series1: [14, 23, 21, 17, 15, 10, 12, 17, 21],
          chartOptions1: {
            chart: {
                id: "polarArea",
                type: 'polarArea',
            },
            stroke: {
              colors: ['#fff']
            },
            fill: {
              opacity: 0.8
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
          },

            series: [44, 55, 41, 17, 15],
          chartOptions: {
            chart: {
                id: 'donut',
              type: 'donut',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],   
      },

      //////
        series2: [{
              name: "Session Duration",
              data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
            },
            {
              name: "Page Views",
              data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
            },
            {
              name: 'Total Visits',
              data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
            }
          ],
          chartOptions2: {
            chart: {
                id: 'line',
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: [5, 7, 5],
              curve: 'straight',
              dashArray: [0, 8, 5]
            },
            title: {
              text: 'Page Statistics',
              align: 'left'
            },
            legend: {
              tooltipHoverFormatter: function(val, opts) {
                return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
              }
            },
            markers: {
              size: 0,
              hover: {
                sizeOffset: 6
              }
            },
            xaxis: {
              categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
                '10 Jan', '11 Jan', '12 Jan'
              ],
            },
            tooltip: {
              y: [
                {
                  title: {
                    formatter: function (val) {
                      return val + " (mins)"
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val + " per session"
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val;
                    }
                  }
                }
              ]
            },
            grid: {
              borderColor: '#f1f1f1',
            }
          },


      //////

    })
}

</script>

<style scoped>
.col {
    padding: 5px;
  }
</style>