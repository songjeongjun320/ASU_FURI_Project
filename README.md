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

### Future Updates and Improvements

- **Front-End Web Development**: Developing a user-friendly interface for viewing and managing the processed data.
- **Optimized AWS Transactions**: Refining our process to upload only cleanly cropped images with correctly extracted information to reduce the number of transactions and ensure accuracy.
- **Codebase Integration**: Integrating OCR and YOLO components for better efficiency and maintainability.
- **YOLO Engine Optimization**: Enhancing our YOLO engine to stop processing after the target object has passed, reducing execution time and improving performance.

This project not only automates a previously time-consuming manual process but also enhances accuracy and efficiency. It's a significant step towards smarter and more efficient logistics and supply chain management.

[Check out the video below for a detailed demonstration of the system in action. Your feedback and thoughts are most welcome!](https://www.linkedin.com/posts/junsong0602_ai-machinelearning-yolo-activity-7212526873040277504-xzzy?utm_source=share&utm_medium=member_desktop)

---

### YOLOv8

We chose YOLOv8 over the latest version, YOLOv10, because YOLOv8 offers a better balance between speed and accuracy. While YOLOv10 has been optimized for faster performance, YOLOv8 maintains a higher level of accuracy, which is crucial for our application. Here are the four key tactics of YOLOv10:

- **NMS-Free Training**
- **Special-Channel Decoupled DownSampling**
- **Rank-Guided Block Design**
- **Lightweight Classification Heads**
