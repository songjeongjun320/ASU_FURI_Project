from dotenv import load_dotenv
import os
import boto3

def configure():
    load_dotenv()

def get_acct():
    area = os.getenv('area')
    access_id = os.getenv('access_id')
    access_key = os.getenv('access_key')
    return area, access_id, access_key

def connect_s3(area, access_id, access_key):
    try:
        s3 = boto3.client(
            service_name="s3",
            region_name=area,
            aws_access_key_id=access_id,
            aws_secret_access_key=access_key,
        )
    except Exception as e:
        print(e)
    else:
        print("s3 bucket connected!")
        return s3
  
  # Extract the text from the cutted image file
def extract_text(client):
    #
    with open('./backend/runsimg_cutted.jpg', 'rb') as image:
        img = bytearray(image.read())

    response = client.detect_document_text(Document={'Bytes': img})
    return response

def main():
    configure()

    # get secured key from .env
    area, access_id, access_key = get_acct()

    # Create S3 Client
    s3_client = connect_s3(area, access_id, access_key)

if __name__ == "__main__":
    main()