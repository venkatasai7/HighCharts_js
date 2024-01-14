window.addEventListener('DOMContentLoaded', (event) => {
    data=[
        {
            name: "Browsers",data: [{name: "chrome", y:50, drilldown: "1"}]
        }
    ],
 
    drill_data={
    series: [
        {
            name: "Chr",id: "1",y:50,
            data: [ {name: "chromev65.0",
                    id: "chromev65.0",y:10,
                    drilldown: "2",
                    data: [
                            ["v65.0s",1],]},    ]
        },
        {
          name: "chromev65.0",
          id: "2",
          drilldown: "2",
          data: [
            {
                name: "v65.0",
                id: "3",
                y:50,
                colorByPoint: true,
                data: [
                    [
                        "v65.0",
                        0.1
                    ],
                    [
                        "v2.0",
                        1.3
                    ],
                    [
                        "v3.0",
                        0.26
                    ]
                ]
            },
              [
                  "v2.0",
                  1.3
              ],
              [
                  "v3.0",
                  0.26
              ]
          ]
      }
       
    ]
}
  
  
  
  
  
    Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    xAxis: {
        type: 'category'
    } ,
    series: data,

    drilldown: drill_data
     
});
});