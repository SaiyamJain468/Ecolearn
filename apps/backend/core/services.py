import os
import uuid
from django.conf import settings

class S3Service:
    @staticmethod
    def upload_file(file_obj, folder='proofs'):
        """
        Mocks a file upload and returns a unique URL.
        In a real scenario, this would use boto3 to upload to AWS S3.
        """
        # For the hackathon, we'll just return a mock URL
        # because we might not have AWS credentials set up yet.
        file_ext = os.path.splitext(file_obj.name)[1]
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        
        # MOCK URL
        mock_url = f"https://ecolearn-s3.s3.amazonaws.com/{folder}/{unique_filename}"
        
        # print(f"Mocked upload of {file_obj.name} to {mock_url}")
        
        return mock_url
