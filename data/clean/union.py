import os
import pandas as pd

df1 = pd.read_csv("Lai/lai.csv")
df2 = pd.read_csv("Lei/data_2.csv")
df3 = pd.read_csv("Xi/Xi.csv")
df2.columns = ['FileName', 'Date/Time', 'Region', 'Country', 'Title', 'Content','Source']
df3.columns = ['FileName', 'Region', 'Country', 'Date/Time', 'Title', 'Content','Source']
can_Df = pd.concat([df2,df3,df1])
orders = can_Df.columns
orders = orders[[3,4,1,2,6,0,5]]
can_Df = can_Df[orders]
can_Df = can_Df.drop("FileName",axis=1)
times = can_Df["Date/Time"]
times = pd.to_datetime(times.values)
can_Df["Date/Time"] = times


can_Df.to_csv("Cleaned_Dataset.csv")
