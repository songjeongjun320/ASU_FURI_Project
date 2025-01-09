# FURI Project: Automating Yard Management with Object Detection and OCR

### **Project Overview**

This project aims to automate Yard Management System (YMS) processes through the integration of advanced Machine Learning (ML) technologies, particularly Object Detection (OD) and Optical Character Recognition (OCR). Traditionally, gate operators manually check and record container details when trucks enter or exit a yard, a process that can take 5 to 10 minutes per truck. By implementing a camera-based system, the project automates the identification of container information, reducing this time to as little as 10 seconds per truck. This system eliminates human errors, increases operational efficiency, and modernizes yard management.

### **Technology Stack**

- **Frontend**: React, JavaScript, TypeScript
- **Framework**: Next.js
- **Backend**: Node.js, Python, Supabase (BaaS)
- **Deployment**: Vercel, AWS EC2 (Load Balancer, Route 53)
- **Optical Character Recognition**: AWS Textract
- **Machine Learning**: YOLOv5 (Object Detection)

### **Project Links**

- 🚀 [Visit the live site](https://asu-furi-project.vercel.app/)
- 🚀 [GitHub Repository](https://github.com/songjeongjun320/ASU_FURI_Project)
- 🚀 [LinkedIn Post](https://www.linkedin.com/posts/junsong0602_asu-ocr-project-poster-activity-7228136673174282240-VnH8?utm_source=share&utm_medium=member_desktop)
- 📄 [Research Paper (Google Drive)](https://drive.google.com/file/d/1EAijoLLQHSp7TzTMEZxA9vyoFSjiiZjM/view?usp=sharing)

### **3. Results**

#### **Project Website:**
[Visit the Project Website](https://asu-furi-project.vercel.app/)

#### **3.1 Performance Metrics**

The system's performance was evaluated based on three primary factors: time efficiency, operator workload reduction, and accuracy. The results demonstrated promising improvements in all three areas.

Specifically, using a model trained on approximately 1,000 images, the system achieved an accuracy rate of 98%. This high level of precision was validated through the processing of video data, where the system was tasked with detecting containers entering a gate. The processing time, including both YOLO (You Only Look Once) object detection and Textract-based text extraction, was completed within a total of 10 seconds per truck, with most of the time (3 seconds) spent on the processing pipeline.

This result implies that, under optimal conditions where containers pass through the gate at a consistent and controlled speed, the system can process each truck in real-time without significant delay. The processing time, including detection and text extraction, is well within an acceptable range, ensuring that the workflow remains smooth and uninterrupted. While the accuracy of 98% does not offer a direct comparison to human-performed tasks, it is a meaningful and reliable metric for evaluating the system's potential for automation in this domain.

#### **3.2 Technical Achievements**

The project utilizes the following key technologies:
- **Language**: React, Python
- **Framework**: Next.js
- **SaaS**: Supabase
- **Deployment**: AWS EC2, Vercel
- **Optical Character Recognition**: AWS Textract
- **Machine Learning**: YOLOv5

These technologies were selected to ensure high performance, scalability, and efficiency across all components of the system. As data accumulates, both the accuracy and scalability of the system will continue to improve, making it a highly valuable solution. Therefore, I consider the results to be meaningful and indicative of the system's long-term viability.

---

### **4. Discussion**

#### **4.1 Technical Implications**

The developed system presents significant technical implications for automating manual processes traditionally reliant on human intervention. By leveraging state-of-the-art technologies, including YOLOv5 for object detection, AWS Textract for OCR, and a robust API infrastructure for data integration, the solution achieves high efficiency and scalability.

As the system processes more data, its accuracy and performance are expected to improve, thanks to the continuous learning capability of machine learning models. The real-time processing capabilities demonstrated in this project open up possibilities for deployment in high-throughput environments such as logistics, warehouse management, and supply chain operations. With its near-instantaneous processing times (under 10 seconds per truck), the system could significantly reduce bottlenecks in gate entry systems, enabling smooth and efficient workflows.

#### **4.2 Operational Impact**

The implementation of the automated system brings about several key operational benefits, each of which contributes to improving efficiency and reducing resource constraints in business processes. These improvements can have a profound impact on day-to-day operations, particularly in environments where logistics, transportation, and asset management are central.

**Key Operational Impacts:**
1. **Reduced Gate Congestion**: Traditionally, manual data entry and verification processes at gates often lead to delays, bottlenecks, and longer wait times for vehicles. With real-time processing capabilities, the system allows for faster container identification and verification, significantly reducing the time trucks spend at the gate, improving overall operational efficiency.
   
2. **Better Asset Utilization**: Automating the container identification process optimizes gate throughput, ensuring that assets like trucks, containers, and handling equipment are fully utilized. This improves resource allocation and reduces downtime, boosting productivity.

3. **Improved Data Accuracy**: The system offers high levels of accuracy in data capture and entry, reducing the risk of human error and ensuring that critical details like container numbers and sizes are recorded accurately.

4. **Efficient Resource Allocation**: By automating repetitive and time-consuming tasks, the system enables more efficient deployment of human resources, allowing staff to focus on higher-value activities, while reducing labor costs and increasing operational efficiency.

---

### **5. Conclusion**

The implementation of ML-based systems in Yard Management System (YMS) automation presents a compelling case for the future of labor reduction in logistics. Through the automation of previously manual tasks such as visual data capture, object detection, text extraction, and data entry, the system demonstrates that certain aspects of logistics and supply chain management can indeed be fully automated.

While the automation of gate management processes such as container identification and data entry proves highly effective, the broader application of this technology still presents significant challenges. For example, tasks like parking assignments and container retrieval involve complexities requiring a higher level of decision-making and flexibility.

As technology advances, the automation of more complex processes is likely. However, questions remain about how far automation can go before encountering limitations that are difficult to overcome. The key takeaway is that while full automation of logistics and supply chain management is still a long-term goal, the success of this project demonstrates the potential for substantial improvements in specific areas of the logistics industry.

---

### **Project Links**

- 🚀 [Visit the live site](https://asu-furi-project.vercel.app/)
- 🚀 [GitHub Repository](https://github.com/songjeongjun320/ASU_FURI_Project)
- 📄 [Research Paper (Google Drive)](https://drive.google.com/file/d/1EAijoLLQHSp7TzTMEZxA9vyoFSjiiZjM/view?usp=sharing)
