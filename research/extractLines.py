import pandas as pd
import numpy as np
import re

df = pd.read_csv('dados_sicop_2016.csv', ';')
raw = pd.DataFrame()
raw['linha'] = df.linha.unique()
data = pd.DataFrame()
for linha in raw['linha']:
  idx = df.index[df['linha'] == linha]
  locus = df.loc[idx]
  _d = pd.DataFrame()
  _d['linha'] = [linha]
  _d['total'] = [locus['qtdpass'].sum()]
  data = data.append(_d)
data = data.reset_index(drop=1)
data = data.sort_values(by=['total'], ascending=0)
f = open('lines_2016.json', 'w+')
f.write(data.to_json(orient='records'))