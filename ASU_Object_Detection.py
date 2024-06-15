from ultralytics import YOLO
from datetime import datetime
from PIL import Image
import cv2
import os
import urllib
import schedule
import time
import detect

# download image
os.makedirs('data', exist_ok=True)
urllib.request.urlretrieve("https://ultralytics.com/images/bus.jpg", 'data/bus.jpg')

# Create a new YOLO model from scratch
# model = YOLO("yolov8n.yaml")

# # Load a pretrained YOLO model (recommended for training)
model = YOLO("yolov8n.pt")

# source 0 for webcame, show=True means show live
results = model.predict(source="0", show=True)

# img1 = Image.open("bus.jpg")
# results = model.predict(source=img1, save=True)

# img2 = cv2.imread("bus.jpg")
# results = model.predict(source=img2, save=True, save_txt=True)

# results = model.predict(source=[img1, img2])








# Train the model using the 'coco8.yaml' dataset for 3 epochs
# results = model.train(data="coco8.yaml", epochs=3)

# Evaluate the model's performance on the validation set
# results = model.val()

# Perform object detection on an image using the model
# results = model("https://ultralytics.com/images/bus.jpg")

# Export the model to ONNX format
# success = model.export(format="onnx")















"""

# path -> Folder where the video will be stored
print("\nC:\\Users\\frank\\OneDrive\\Desktop\\Docker")
print(" --- Find CCTV Video downloaded folder --- " )
print("Path_to_wacth_CCTV : ")
path = str(input())


def job():  # Run at 00:00
    dateformat = "%m%d%Y"
    past = folder_name = datetime.now().strftime(dateformat)  # 01012023
    if not os.path.isdir(path + "/" + folder_name):
        os.mkdir(path + "/" + folder_name)  # create folder on path
    path_to_watch = path + "/" + folder_name  # "C:/Users/ngltr/OneDrive/Desktop/Docker/12312022"
    old = os.listdir(path_to_watch)
    print("Ready to Run - YOLO_Engine")
    while True:
        now = datetime.now().strftime(dateformat)
        if now != past:
            print("Date_Change : ", now)
            break
        new = os.listdir(path_to_watch)
        if len(new) > len(old):
            newfile = list(set(new) - set(old))
            print("New_File : ", newfile)
            for n in range(len(newfile)):
                print("Reading_File : ", newfile[n])
                old = new
                extension = os.path.splitext(path_to_watch + "/" + newfile[n])[1]
                if extension == ".mp4":
                    video_path = path_to_watch + "/" + str(newfile[n])
                    time.sleep(1)
                    read_cntr_number_region(video_path, folder_name)
                    # print("Video_Path : ", video_path)
                else:
                    continue
        else:
            continue

def read_cntr_number_region(video_path, folder_name):
    weight = "./runs/train/TruckNumber_yolov5s_results34/weights/best.pt"  # educated model
    video = video_path
    # video = "./Test_Video/video5.mp4"
    conf = 0.5
    detect.run(weights=weight, source=video, conf_thres=conf, name=folder_name)
    print("Detected_ Time : ", datetime.now() )



## MAIN ##

# Schedule the job to run every second
schedule.every(1).seconds.do(job)


while True:
    # Run all jobs that are scheduled to run
    schedule.run_pending()
    # Sleep for a short amount of time to avoid high CPU usage
    time.sleep(1)

"""