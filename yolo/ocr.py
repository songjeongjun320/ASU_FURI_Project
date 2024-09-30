import os
import glob
import ocr_function
import datetime
import time
import json
import cv2
import requests
import boto3

# If you change the file location, You should change.
# path_to_watch, img location, img.replace on Main_by_Trigger.py

# original == 150, reverse == 120 // 
# CKOUT == 100, reverse == 50 
gr_bl_constant = 100 # Constant value of threshold
result_possibility = False # To check the condition of

ACCESS_KEY = ''
SECRET_KEY = ''

def check_img(file_path):
    company_list = company_list_download()
    time.sleep(2)
    output = read(file_path, company_list)
    return output


# Counting how many transactions per day, if the date changed, it should be reset to 1
count_day = 1
yesterday = datetime.datetime.now()

# img : image file which we need to read
# company_list : to revise the result, it is the list from company_list.txt
def read(f_name, company_list):
    today = datetime.datetime.now()

    if yesterday != today: count_day = 1

    dateformat = '%m%d%Y'
    success_detected = False
    
    # JSON File - Let's make this later
    file_path = '.\\JSON_API\\'+today.strftime(dateformat)  # .\JSON_API\01012023
    file_path = file_path + "_" + str(count_day)  # .\JSON_API\01012023_1
    count_day += 1

    # if not os.path.isdir(file_path):
    #     os.mkdir(file_path)

    name,ext = os.path.splitext(f_name)
    name = os.path.basename(name)
    print("\n============================================")
    print("< JPG_F_NAME :", name, ".jpg >")

    camera_position = name.split('-')[1]
    print(camera_position)

    if camera_position == "CKOUT":
        gr_bl_constant = 100
        gr_bl_constant_reverse = 50
        h_max = 40
        h_min = 20

    elif camera_position == "CKIN":
        gr_bl_constant = 150
        gr_bl_constant_reverse = 100
        h_max = 150
        h_min = 50

    print("Here", f_name)
    if str(ext) == ".jpg":
        chars, cntr_number, reverse = ocr_function.main(f_name, gr_bl_constant, gr_bl_constant_reverse,\
                h_max, h_min, result_possibility, company_list)                    
        print("Cntr_Number-- : " + cntr_number)
        print("============================================\n")

        # if make_json(cntr_number, cntr_size, name, file_path, today, newfolder): success_detected = True

    if success_detected == True and len(glob.glob(file_path + "\\*.json")) != 0:  # If it is not empty, send API to YMS
        file = glob.glob(file_path + "\\*.json")
        fp = file[0]
        print("json_file_name : ", file[0])
        # status_code, img_path = api_to_yms(fp)

        # if status_code == 200:  # 200 means success API to YMS
        #     fn = img_path.split('\\')
        #     img_path = img_path.replace("/", "\\")
        #     print("IMG_PATH : ", img_path)
        #     print("Status_Code : " , fn)
        #     img_path = path_to_watch + "\\" + img_path.replace("\\","\\crops\\Container_Number\\")
        #     print("img_path : ", img_path)  # 010620234\crops\Container_Number\CKOUT-153529-15355221.jpg,
        #     img_to_yms(img_path, fn[0])


    # if container number is valuable number return true else false
    if len(cntr_number) > 6:
        return True
    else:
        return False

# if it is clear pic, return true else, return false
# threshold is gonna be criteria. If the variance is smaller than threshold, it is blurry
# The larger variance, the more clear images.
def is_clear(image_path, threshold=100.0):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    variance = variance_of_laplacian(image)
    print("Image laplacian variance : ", variance)
    return variance > threshold


def variance_of_laplacian(image):
    # calculate image's laplacian
    laplacian = cv2.Laplacian(image, cv2.CV_64F)
    # variance of laplacian
    variance = laplacian.var()
    return variance


def make_json(result, cntr_size, name, file_path, now, newfolder):  # If right CntrNo detected, send .json file to YMS
    if len(result) == 11 or result != "Can't Detect":
        img_data = name.split('-')
        format = '%m/%d/%Y %H:%M:%S'
        d = dict()
        d['division'] = img_data[0]
        d['cameraPosition'] = img_data[1]
        d['cntrNo'] = result
        d['imgPath'] = newfolder + "/" + name + ".jpg"
        d['imgNm'] = name+".jpg"
        d['detectedTime'] = now.strftime(format)

        f_name = name
        json_path = file_path + '\\' + f_name + ".json"
        with open (json_path, 'w', encoding='UTF-8') as fp:
            json.dump(d, fp, indent=4)
        return True  # If right CntrNo
        # print("File_name ", f_name)
    return False  # If wrong CntrNo


def api_to_yms(fp):
    url = "" # url for the website
    with open(fp, encoding='UTF-8') as json_file:
        data = json.load(json_file)
    headers = {'Content-type': 'application/json', 'Accept': '*/*', 'Cookie' : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjY3NDI2NDA5LCJleHAiOjE2Njc1MTI4MDksInJvbGUiOiJST0xFX1VTRVIifQ.64v_dKMvak6pSjLpKCL1imDO6ma4oyHWJLsG_AFbC5guR-YoR6AB7gb9CJi-cx-fu1jK13U3tvwkOhpY8WQG4g'}
    # r = requests.post(url, data=json.dumps(data), headers=headers)
    # print("Status code: ", r.status_code)
    # return r.status_code, data["imgPath"]  # "010620234/CKOUT-153529-15355221.jpg"


def img_to_yms(img_path, fn):  # Img send to YMS, ex fn = 01052023
    img_name = img_path.split('\\')
    print("fn before : ", fn)
    fn = fn.split('/')
    fn = fn[0]
    # print(img_name)
    img_name = img_name[-1]
    print("fn : ", fn)
    print("img_name :", img_name)
    # s3 = boto3.client('s3',
    #                     region_name='us-west-1',
    #                     aws_access_key_id=ACCESS_KEY,
    #                     aws_secret_access_key=SECRET_KEY)
    # s3.upload_file(img_path, 'asu-ocr-img-bucket', fn + "/" + img_name)

# After changing AWS Textract, We don't need this code.
def company_list_download():
    # Company_List DB create to adjust the Character
    c = open("./backend/Company_List.txt", 'r')
    lines = c.readlines()
    company_list = []

    ########## When the container list can be extracted by TMS, company_list --> container_list #########

    company_list = [line.replace('\n', '') for line in lines]
    c.close()
    return company_list




