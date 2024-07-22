from dotenv import load_dotenv
import os
import boto3

def configure():
    load_dotenv()

def get_acct():
    area = os.getenv('textract_area')
    access_id = os.getenv('access_id')
    access_key = os.getenv('access_key')
    return area, access_id, access_key

# Extract the text from the cutted image file
def extract_text():
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
    with open('C:\\Users\\frank\\Desktop\\ASU_FURI_Project\\PHX-CKOUT-122433-122451.jpg', 'rb') as image:
        imageBytes = image.read()

    # Sending img to Textract
    response = textract.detect_document_text(Document={'Bytes': imageBytes})

    # Get the results from here
    if 'Blocks' in response:
        for item in response['Blocks']:
            if item['BlockType'] == 'LINE':
                print(item['Text'])
    else:
        print("No text detected.")
            
    return response

def main():
    configure()
    extract_text()

if __name__ == "__main__":
    main()
