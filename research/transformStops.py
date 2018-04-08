import pandas as pd
import numpy as np
import re

df = pd.read_json('lines_stops.json')
df.reset_index(drop=1)
new = pd.DataFrame(columns = ['id', 'stop'])
for i,v in df.iterrows():
  v.reset_index(drop = 1)
  # print(v.keys())
  new.loc[i] = [v[0][0], v[0][1]]
f = open('l_s.json', 'w+')
f.write(new.to_json(orient = 'records'))
f.close()
