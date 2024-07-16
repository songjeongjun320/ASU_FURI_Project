## ASU_FURI_Project

# Automated Video Processing with YOLO and Custom OCR Engine

I'm excited to share a project I've been working on that combines the power of YOLO (You Only Look Once) for object detection with a custom OCR (Optical Character Recognition) engine. This system is designed to automate the process of detecting and extracting container numbers from CCTV video footage.

---

### Key Features

- 🔭 **Real-Time Folder Monitoring**: The system continuously monitors a specified folder for new video files.
- 📽 **Automated Video Processing**: Upon detecting a new video file, the system processes it to identify and extract container numbers using a custom-trained YOLO model.
- 📁 **Data Storage and API Integration**: Extracted data is formatted into JSON and stored locally. Additionally, this data can be sent to a remote server via an API for further processing or integration into other systems.
- **AWS Integration**: The project also includes functionality for uploading images to AWS S3, enabling scalable and secure storage solutions.

---

### Key Technologies

- **Python**: The core programming language used to develop the system.
- **YOLO**: For real-time object detection.
- **OpenCV**: For video and image processing.
- **AWS S3**: For cloud storage.
- **Custom OCR**: Tailored specifically for reading container numbers from images.

---

### Future Updates and Improvements (As of 7/15/2024)
- **Front-End Web Development**: Developing a user-friendly interface for viewing and managing the processed data.
- **Optimized AWS Transactions**: Refining our process to upload only cleanly cropped images with correctly extracted information to reduce the number of transactions and ensure accuracy.
- **Codebase Integration**: Integrating OCR and YOLO components for better efficiency and maintainability.
- **YOLO Engine Optimization**: Enhancing our YOLO engine to stop processing after the target object has passed, reducing execution time and improving performance.
- **Conduct Further Tests**: Ensuring the updated code is error-free.
- **AWS Textract Integration**: Integrating AWS Textract to read the images and provide results in real-time.
- **Cost Reduction**: Evaluating ways to reduce the number of AWS transactions to lower costs.

 
This project not only automates a previously time-consuming manual process but also enhances accuracy and efficiency. It's a significant step towards smarter and more efficient logistics and supply chain management.

[Check out the video below for a detailed demonstration of the system in action. Your feedback and thoughts are most welcome!](https://www.linkedin.com/posts/junsong0602_ai-machinelearning-yolo-activity-7212526873040277504-xzzy?utm_source=share&utm_medium=member_desktop)

---

### YOLOv8

We chose YOLOv8 over the latest version, YOLOv10, because YOLOv8 offers a better balance between speed and accuracy. While YOLOv10 has been optimized for faster performance, YOLOv8 maintains a higher level of accuracy, which is crucial for our application. Here are the four key tactics of YOLOv10:

- **NMS-Free Training**
- **Special-Channel Decoupled DownSampling**
- **Rank-Guided Block Design**
- **Lightweight Classification Heads**

---

### Recent Updates (As of 7/15/2024)
One of the major recent updates focuses on reducing the runtime of our code. Initially, the system would capture a large number of images (sometimes 30-40) whenever there was movement of a truck. Many of these images were unnecessary, being blurry or improperly cropped.

We introduced a new function to check the clarity of an image using the variance of the Laplacian method:

'''python
def is_clear(image_path, threshold=50.0):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    variance = variance_of_laplacian(image)
    return variance > threshold, variance

def variance_of_laplacian(image):
    # calculate image's laplacian
    laplacian = cv2.Laplacian(image, cv2.CV_64F)
    # variance of laplacian
    variance = laplacian.var()
    return variance
'''

---

By applying this function, we filter out only the clearest images, selecting just three clean and usable images for storage. This not only results in a cleaner dataset but also reduces processing time by approximately half. As a result, we believe that the system can now update the website within 2 minutes when a container passes through the gate.

---

This project not only automates a previously time-consuming manual process but also enhances accuracy and efficiency. It's a significant step towards smarter and more efficient logistics and supply chain management.

---
