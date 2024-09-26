import google.auth
import os.path
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload


def upload_basic():
  """Insert new file.
  Returns : Id's of the file uploaded

  Load pre-authorized user credentials from the environment.
  TODO(developer) - See https://developers.google.com/identity
  for guides on implementing OAuth2 for the application.
  """
  creds = None
  if os.path.exists("token.json"):
    creds = Credentials.from_authorized_user_file("token.json")

  try:
    # create drive api client
    service = build("drive", "v3", credentials=creds)

    file_metadata = {"name": "image1.png"}
    media = MediaFileUpload("static/image1.png", mimetype="image/jpeg")
    # pylint: disable=maybe-no-member
    file = (
        service.files()
        .create(body=file_metadata, media_body=media, fields="id")
        .execute()
    )
    print(f'File ID: {file.get("id")}')

  except HttpError as error:
    print(f"An error occurred: {error}")
    file = None

  return file.get("id")


if __name__ == "__main__":
  upload_basic()