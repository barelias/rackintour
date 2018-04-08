import pandas as pd
import numpy as np
import re

df = pd.read_csv('stops.csv')
new_index = ['id', 'code', 'name', 'desc', 'lat', 'lon', 'zone', 'url', 'type', 'parent']
df.columns = new_index
# print(df.columns.values[0])
stopsDF = pd.DataFrame() 

stopsDF['id'] = df['id']
stopsDF['name'] = df['name']
stopsDF['lat'] = df['lat']
stopsDF['lon'] = df['lon']

stopsDF['lines'] = stopsDF['name'].apply(lambda x: x.split(', ')[1].split('-') if len(x.split(', ')) > 1 else x)
stopsDF['name'] = stopsDF['name'].apply(lambda x: x.split(', ')[0] if len(x.split(', ')) > 1 else x)

file = open('stops.json', 'w+')
file.write(stopsDF.to_json(orient='records'))