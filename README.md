# FURI Project Progress

## Project Update: Automating Yard Management with Object Detection and OCR

### **Project Description**

This project aims to automate the Yard Management System (YMS) by using Machine Learning (ML) technologies, particularly Object Detection (OD) and Optical Character Recognition (OCR). In the traditional process, when trucks enter or exit a yard, a gate operator manually checks the container details and records them into a system, which can take anywhere from 5 to 10 minutes per truck.

This project leverages camera-based object detection and OCR to automatically capture container information, streamlining the process and reducing the time per truck to as little as 10 seconds. This automation eliminates manual errors, increases efficiency, and provides a modern solution to yard management.

### **Technology Stack**

- **Frontend**: React, JavaScript, TypeScript
- **Framework**: Next.js
- **Backend**: Node.js, Python, Supabase (BaaS Platform)
- **Deployment**: Vercel, AWS EC2 with Load Balancer, Route53

### **Project Repository**

- 🚀 [Visit the site](https://asu-furi-project.vercel.app/)
- 🚀 [GitHub Repository](https://github.com/songjeongjun320/ASU_FURI_Project)
- 🚀 [LinkedIn Post](https://www.linkedin.com/posts/junsong0602_asu-ocr-project-poster-activity-7228136673174282240-VnH8?utm_source=share&utm_medium=member_desktop)

### **How it Works**

1. **Camera Input**: A camera installed at the gate captures images of incoming or outgoing containers.
2. **Object Detection**: YOLOv5 is used to identify and extract the container number from the images.
3. **OCR Processing**: The detected images are sent to AWS Textract for Optical Character Recognition, which converts the image content into text (container number and size).
4. **Data Storage**: The extracted data (container number, container size, date, and driver name) is stored in Supabase and associated with a unique ID for tracking.
5. **Image Storage**: The highest-quality image detected by YOLO is uploaded to AWS S3 and linked to the database entry.
6. **User Interface**: Users can access the main page, where they can view real-time detected container images, download videos, and review container data.

### **Contact and Feedback**

If you have any questions, ideas, or feedback about the project, feel free to reach out to me via email at:  
**songjeongjun320@gmail.com**

I would love to hear your thoughts and discuss any potential improvements or collaborations!

---

## Demo Videos

[Demo video: 1 mins](https://www.youtube.com/watch?v=AhEH7NC7Qd0)  
[Demo video: 2 mins](https://www.youtube.com/watch?v=VhfH5aEldSc)

<iframe width="770" height="432" src="https://www.youtube.com/embed/AhEH7NC7Qd0" frameborder="0" allowfullscreen></iframe>  
<iframe width="770" height="432" src="https://www.youtube.com/watch?v=VhfH5aEldSc" frameborder="0" allowfullscreen></iframe>
