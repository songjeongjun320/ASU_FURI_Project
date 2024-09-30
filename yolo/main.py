from datetime import datetime
from dotenv import load_dotenv
import schedule
import time
import os
import boto3
import detect  # Assuming detect is a custom module you've implemented
import logging

# Logger
logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)

# Setting the Filehandler
log_file = 'log.txt'
file_handler = logging.FileHandler(log_file)
file_handler.setLevel(logging.INFO)

# Add Handler Logger
LOGGER.addHandler(file_handler)

from typing import List, Tuple

# path for CCTV video files
path: str = ""

# Function to perform the job
def job() -> None:
    dateformat = "%m%d%Y"
    current_date = datetime.now().strftime(dateformat)  # Current date in format 01012024
    folder_path = os.path.join(path, current_date)  # path/01012024

    # Create folder if it doesn't exist
    if not os.path.isdir(folder_path):
        os.mkdir(folder_path)

    previous_files = os.listdir(folder_path)

    # Watch for changes in the specified folder
    while True:
        now = datetime.now().strftime(dateformat)

        # Check if date has changed to break out of the loop
        if now != current_date:
            print("Date changed: ", now)
            break

        # Retrieve list of files in the folder
        current_files = os.listdir(folder_path)

        print("current ", current_files)
        print("previous ", previous_files)

        # Detect new files added since last check
        if len(current_files) > len(previous_files):
            new_files = list(set(current_files) - set(previous_files))
            print("New File(s): ", new_files)

            # Process each new video file
            for new_file in new_files:
                print("Processing File: ", new_file)
                file_extension = os.path.splitext(new_file)[1]

                # Check if the file is a video (.mp4)
                if file_extension == ".mp4":
                    video_path = os.path.join(folder_path, new_file)
                    time.sleep(1)  # Optional delay before processing

                    # Call your function to process the video
                    read_cntr_number_region(video_path, current_date)
                else:
                    continue

        # Update the list of files for the next iteration
        previous_files = current_files

        time.sleep(1)  # Adjust sleep time as needed

# It will return 
def read_cntr_number_region(video_path, folder_name) -> str:
    # Example weights and configuration
    weight = "./runs/train/TruckNumber_yolov5s_results34/weights/best.pt"
    conf_threshold = 0.5

    # Run detection using your custom detect module
    max_conf_img_path = detect.run(weights=weight, source=video_path, conf_thres=conf_threshold, name=folder_name)
    print("Detection Completed at: ", datetime.now())
    print("The most confident img path: ", max_conf_img_path)
    return max_conf_img_path

# AWS Textrac #
def configure() -> None:
    load_dotenv()

def get_acct() -> Tuple[str, str, str]:
    area = os.getenv('textract_area')
    access_id = os.getenv('access_id')
    access_key = os.getenv('access_key')
    return area, access_id, access_key

# Extract the text from the cutted image file
def send_to_AWS_Textract(max_conf_img_path) -> dict:
    # connect AWS Textract acct
    area, access_id, access_key = get_acct()
    try:
        textract = boto3.client(
            'textract',
            aws_access_key_id=access_id,
            aws_secret_access_key=access_key,
            region_name=area
        )
    except Exception as e:
        print("Can't connect to Textract", e)
    else:
        print("Textract connected!")
    
    # Open the img
    with open(max_conf_img_path, 'rb') as image:
        imageBytes = image.read()

    # Sending img to Textract
    response = textract.detect_document_text(Document={'Bytes': imageBytes})
            
    return response

def read_result_from_Textract(response) -> List[str]:
    print("Image read by Textract: ")
    output: List[str] = []
    # Get the results from here
    if 'Blocks' in response:
        for item in response['Blocks']:
            if item['BlockType'] == 'LINE':
                print(item['Text'])
                output.append(item['Text'])
    else:
        print("No text detected.")
    return output


# Main loop to run the scheduler
def main() -> None:
    # Define the path where the CCTV videos will be downloaded
    print("\n\n=============================================================")
    print("C:\\Users\\frank\\OneDrive\\Desktop\\Docker")
    print("--- Find CCTV Video downloaded folder ---")
    print("Path to watch CCTV: ")
    path = input().strip()  # Get path from user input
    print("=============================================================")
    print("Ready to Run - YOLO_Engine")

    while True:
        schedule.run_pending()
        current_date = datetime.now().strftime("%m%d%Y")
        folder_path = os.path.join(path, current_date)
        
        # Create folder if it doesn't exist
        if not os.path.isdir(folder_path):
            os.mkdir(folder_path)
        
        previous_files = os.listdir(folder_path)
        
        while True:
            now = datetime.now().strftime("%m%d%Y")
            
            # Check if date has changed to break out of the loop
            if now != current_date:
                print("Date changed: ", now)
                break
            
            # Retrieve list of files in the folder
            current_files = os.listdir(folder_path)
            
            # Detect new files added since last check
            if len(current_files) > len(previous_files):
                new_files = list(set(current_files) - set(previous_files))
                print("New File(s): ", new_files)
                
                # Process each new video file
                for new_file in new_files:
                    print("Processing File: ", new_file)
                    file_extension = os.path.splitext(new_file)[1]
                    
                    # Check if the file is a video (.mp4)
                    if file_extension == ".mp4":
                        video_path = os.path.join(folder_path, new_file)
                        time.sleep(1)  # Optional delay before processing
                        
                        # Call your function to process the video
                        max_conf_img_path = read_cntr_number_region(video_path, current_date)
                        if max_conf_img_path == "":
                            LOGGER.info(f"NO DETECTION - {new_file}")
                        response = send_to_AWS_Textract(max_conf_img_path)
                        read_result_from_Textract(response)
                    else:
                        continue
            
            # Update the list of files for the next iteration
            previous_files = current_files
            
            time.sleep(1)  # Adjust sleep time as needed

if __name__ == "__main__":
    main()