import json

f=open('data.json',)

data=json.load(f)
GraphData={}
for i in data:
    if i['company'] not in GraphData.keys():
        GraphData[i['company']]={"total":0}
    if i['year'] not in GraphData[i['company']].keys():
        GraphData[ i['company'] ] [ i['year'] ]={"total":0}
    if i['month'] not in GraphData[i['company']][i['year']].keys():
        GraphData[i['company']][i['year']][i['month']]={"total":0}
    if i['Type'] not in GraphData[i['company']][i['year']][i['month']].keys():
        GraphData[i['company']][i['year']][i['month']][i['Type']]=i['Premium']
        
        GraphData[i['company']][i['year']][i['month']]['total']+=i['Premium']
        GraphData[i['company']][i['year']]['total']+=i['Premium']
        GraphData[i['company']]['total']+=i['Premium']
for i in GraphData:
    print( i, GraphData[i]['total'])
    for j in GraphData[i].keys():
        if j!='total':
            print(j,GraphData[i][j]['total'])
            for k in GraphData[i][j].keys():
                print(k)
f.close()