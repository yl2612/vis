__author__ = 'LaiQX'
import pandas as pd
import numpy as np

def Lcount(string, topic):
    if string.count(topic[0])>0:
        return -1

    ncount = 0;
    for keywords in topic:
        ncount += string.count(keywords)

    return ncount



if __name__ =="__main__":

    topic1 = ["political","bureaucratic","legislative","official","politics", "social unrest", "social", "unrest", "president","civic","civil", "government","president","state","rebel","election"]

    topic2 = ["conflict", "war", "coalition","campaign","weapen","military","kill","wounded","attack","soldiers","forces","security","gun","fight",""]

    topic3 = ["population displacement", "population", "displacement", "move", "refugee", "aslyum","migratin","flee"]

    topic4 = ["disaster", "typhoon", "aid ","rain","storm","", "calamity", "catastrophe","collapse","crash","debacle","flood"]

    topic5 = ["food insecurity", "health","food", "insecurity", "drought","famine","water supply","shortage","pollution","hunger"]

    topic6 = ["disease", "cancer","defect","infection","sick","syndrome","flu","malady","measles","vaccinate","ill","infection","virus","disease outbreak","ebola","drug","medicine","medical"]

    topic7 = ["water", "water insecurity","pollution","famine"]

    topic8 = ["fund","market","stock","portfolio","investment","trade","$","capital","venture","money","cash","inflow","billion","investor","pct","dollar","euro"]


    topics = {
        1:topic1,
        2:topic2,
        3:topic3,
        4:topic4,
        5:topic5,
        6:topic6,
        7:topic7,
        8:topic8
    }

    df = pd.read_csv("Cleaned_Dataset.csv")
    # print df.iloc[5,5]

    topics_list = []

    untaged =0

    for i in range(df.shape[0]):
        print i
        max = 0
        max_index = 0
        num = 0
        ss = df.iloc[i,5]

        for j in range(1,9):
            num = Lcount(ss,topics[j])
            if num == -1:
                max = -1
                topics_list.append(j)
                break
            else:
                if num>max:
                    max = num
                    max_index = j

        if max==-1:
            continue
        elif max==0:
            untaged += 1
            continue
        else:
            topics_list.append(max_index)

    df["topic"] = np.array(topics_list)
    df.to_csv("data_added_topics.csv")
