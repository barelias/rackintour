import pandas as pd
import numpy as np
import re

df = pd.read_csv('stops.csv')
df.columns = ["id","code","name","desc","lat","lon","zone","url","type","station"]
lines = ['288', '287', '285', '032', '290', '289', '284', '001', '239', '193']
lines_stop = {}
for line in lines:
  lines_stop[line] = []

# print(df.head())
for line in lines:
  sdf = pd.read_csv('line_'+line+'.csv')
  sdf.columns = ["trip","arrival","departure","id","sequence","dist"]
  for i,r in sdf.iterrows():
    l = df.loc[df['id'] == r['id']][['id', 'name', 'lat', 'lon']]
    lines_stop[line].append(l)
  # for l in content:
  #   stop_id = re.search('\".+\",\".+\",\"(.+)\",\"(.+)\".+', l).group(1)
  #   idx = df.index[str(df['id']) == stop_id]
  #   print(idx)
    # for index, row in df.iterrows():
    #   if(row['id'] == stop_id):
    #     print(row)
    #   else:
    #     print(row['id'], stop_id)
p = [pd.Series(lines_stop.items())]
j = pd.concat(p, axis=1).to_json(orient='records')
f = open('lines_stops.json', 'w+')
f.write(j)
f.close()
#"544403_ida_0_0","03:55:00","03:55:00","35500012","0","8.0" 