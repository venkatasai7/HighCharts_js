window.addEventListener('DOMContentLoaded', (event) => {
    $.get({
        url: './data.json', success: (res) => {
            processing_data(res);
        }
     }); 
});



function processing_data(res)
{
    companies={}
    let c=0
    //console.log(res)
    for(key in res)
    { 
        if (!companies[res[key]['company']])
            companies[res[key]['company']]={'total':0};
        if(! companies[res[key]['company']][res[key]['year']] )
            companies[res[key]['company']][res[key]['year']]={'total':0,'January':{'total':0},'February':{'total':0},'March':{'total':0},'April':{'total':0},'May':{'total':0},'June':{'total':0},'July':{'total':0},'August':{'total':0},'September':{'total':0},'October':{'total':0},'November':{'total':0},'December':{'total':0} }
        if(! companies[res[key]['company']][res[key]['year']][res[key]['month']][res[key]['Type']] )
        {
            companies[res[key]['company']][res[key]['year']][res[key]['month']][res[key]['Type']] =res[key]['Premium'];
            companies[res[key]['company']][res[key]['year']][res[key]['month']]['total']+=res[key]['Premium'];
            companies[res[key]['company']][res[key]['year']]['total']+=res[key]['Premium'];
            companies[res[key]['company']]['total']+=res[key]['Premium'];
        }

    }
    console.log(companies)
    graph(companies);
}


function graph(d)
{
    data=[]
    for (k1 in d)
    {
       data.push({
            name : k1,
            y:d[k1]['total'],
            drilldown:k1
       })
    }
    console.log("data:",data);
    drill_data=[]
    for (k1 in d)
    {
        if (k1!='total')
            {   
                dd=[]
                for(k2 in d[k1])
                {
                    if (k2!='total')
                    {           
                        dd1=[]
                        for(k3 in d[k1][k2])
                        {
                            
                            if (k3!='total')
                            {           
                                dd2=[]
                                for(k4 in d[k1][k2][k3])
                                {
                                    
                                    if (k4!='total')
                                    {           
                                    
                                        dd2.push({
                                            name : k4,
                                            y:d[k1][k2][k3][k4]})
                                    }            
                                }

                                dd1.push({
                                    name : k3,
                                    y:d[k1][k2][k3]['total'],
                                    drilldown:k1+k2+k3 })
                                drill_data.push({
                                        id:k1+k2+k3,
                                        name : k3,
                                        data:dd2})
                            }            
                        }
                        dd.push({
                            name : k2,
                            y:d[k1][k2]['total'],
                            drilldown:k1+k2 })
                        
                         drill_data.push({
                    id:k1+k2,
                    name : k2,
                    data:dd1})
                    }            
                }
            }
            drill_data.push({
                id:k1,
                name : k1,
                data:dd})
        }
    console.log('drilldata:',drill_data)
    draw_graph(data, drill_data )
}

function draw_graph(data, drill_data  )
{
    let chart = Highcharts.chart('container', {
        chart:
        {
            type: 'bar',
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -60,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false,
       },
        xAxis: {
           type: 'category'
        },
        plotOptions: {
           series: {
              colorByPoint: true
           }
        },
  
        series: [{
            name:'Companies ',
           data: data,
        }],
  
        drilldown: {
           series: drill_data,
        },
  
  
     });    
}