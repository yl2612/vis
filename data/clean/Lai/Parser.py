from docx import *
import os
import csv

__author__ = 'LaiQX'
regions = {"GENERAL", "CEE/CIS", "CEE/SIS", "WACR", "EAPR", "ESAR", "EAPRO", "WCARO", "ESARO", "TACRO", "MENA", "ROSA",
           "TACR", "WCAR", "EAP", "ESA", "LAC", "WCA", "SA", "CEE/ CIS", "CEECIS"}

output_file = "lai.csv"
output = open(output_file, 'w+')
writer = csv.writer(output, delimiter=',')
writer.writerow(["FileName","Region", "Country", "Date/Time", "Title", "Content", "Source"])

dir_path = "Lai/"
file_list = os.listdir(dir_path)

aaaaa = 0

for file_name in file_list:
    aaaaa += 1
    if file_name[-4:] != "docx":
        continue

    # step one : convert the docx file to a list of word
    text_list = []
    document = Document(dir_path+"/"+file_name)     # input file

    # parse the time from file name to fomat "2013-09-10"
    year = "20"+file_name[:2]
    month = file_name[2:4]
    day = file_name[4:6]
    time = " 08:02:00"
    date_time = year+"-"+month+"-"+day

    paragraphs = document.paragraphs

    for paragraph in paragraphs:
        if "\n" in paragraph.text.encode('ascii', 'ignore').strip():
            print paragraph.text.encode('ascii', 'ignore').strip()
            print file_name
            print region
            print aaaaa
            raise Exception("strange text")
        if paragraph.text != "":
            text_list.append(paragraph)
    text_dict_list = []

    i = 0

    while not(text_list[i].text.encode('ascii', 'ignore').strip() in regions):
        i += 1

    # region = text_list[i].text.encode('ascii', 'ignore').strip()

    while i < len(text_list)-6:
        while text_list[i].text.encode('ascii','ignore').strip() == "":
            i += 1

        case = []

        case.append(file_name)

        if text_list[i].text.encode('ascii', 'ignore').strip() in regions:
            region = text_list[i].text.encode('ascii', 'ignore').strip()
            i += 1
        elif (text_list[i].runs[0].bold != True)and(text_list[i].style.font.bold != True):
            print text_list[i].text.encode('ascii', 'ignore').strip()
            print file_name
            print region
            raise Exception("Region not found")

        if region in regions:
            case.append(region)
        else:
            print text_list[i].text.encode('ascii', 'ignore').strip()
            print file_name
            print region
            raise Exception("Region not found")



        if (text_list[i+1].runs[0].bold == True)or(text_list[i+1].style.font.bold == True):
            country = text_list[i].text.encode('ascii', 'ignore').strip()
            i += 1

        case.append(country)

        case.append(date_time)
        case.append(text_list[i].text.encode('ascii', 'ignore').strip())
        i += 1

        content = ""
        count = 0
        while "http" not in text_list[i].text.encode('ascii', 'ignore').strip():
            content = content + text_list[i].text.encode('ascii', 'ignore').strip()
            i += 1
            count += 1
            if count >= 10:
                print file_name
                print region
                print country
                print text_list[i].text.encode('ascii', 'ignore').strip()
                print count
                raise Exception("stange content")

        case.append(content)

        source_tmp = ""
        while "http" in text_list[i].text.encode('ascii', 'ignore').strip():
            source_tmp = source_tmp + text_list[i].text.encode('ascii', 'ignore').strip() + " ; "
            i += 1

        case.append(source_tmp)

        writer.writerow(case)

output.close()
print "2013 done successfully!"