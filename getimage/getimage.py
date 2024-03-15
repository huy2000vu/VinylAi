import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import google.auth
import random
import numpy as np


# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"]


def main():
  """Shows basic usage of the Drive v3 API.
  Prints the names and ids of the first 10 files the user has access to.
  """
  creds = None
  # The file token.json stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  if os.path.exists("token.json"):
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          "credentials.json", SCOPES
      )
      creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open("token.json", "w") as token:
      token.write(creds.to_json())

  try:
    service = build("drive", "v3", credentials=creds)

    # Call the Drive v3 API
    results = (
        service.files()
        .list(pageSize=10, fields="nextPageToken, files(id, name)")
        .execute()
    )
    items = results.get("files", [])

    if not items:
      print("No files found.")
      return
    print("Files:")
    for item in items:
      print(f"{item['name']} ({item['id']})")
  except HttpError as error:
    # TODO(developer) - Handle errors from drive API.
    print(f"An error occurred: {error}")


# will return the id of a certain image within the specified folder
# need to find a way to update folder_id based on the genre that is currently playing
# need to implement randomness without replacement using numpy
def search_file(genre = 'study'):
  """Search file in drive location

  Load pre-authorized user credentials from the environment.
  TODO(developer) - See https://developers.google.com/identity
  for guides on implementing OAuth2 for the application.
  """
  creds = Credentials.from_authorized_user_file("token.json")

  try:
    # create drive api client
    service = build("drive", "v3", credentials=creds)
    # testing, will look in the study folder
    getFolder = (
          service.files()
          .list(
              q=f"name = '{genre}'",
              spaces="drive",
              fields="nextPageToken, files(id, name)",
              #pageToken=page_token,
          )
          .execute()
      )
    folder_id = None
    for folder in getFolder.get("files", []):
      folder_id = folder.get("id")
      print(f"Folder name: {folder.get("name")}, id: {folder.get("id")}")

    files = []
    page_token = None
    while True:
      # pylint: disable=maybe-no-member
      response = (
          service.files()
          .list(
              q=f"'{folder_id}' in parents",
              spaces="drive",
              fields="nextPageToken, files(id, name)",
              pageToken=page_token,
          )
          .execute()
      )
      for file in response.get("files", []):
        # Process change
        print(f'Found file: {file.get("name")}, {file.get("id")}')
      files.extend(response.get("files", []))
      page_token = response.get("nextPageToken", None)
      if page_token is None:
        break

  except HttpError as error:
    print(f"An error occurred: {error}")
    files = None
  # random choice will grab an image randomly without replacement
  # randomFiles = np.random.choice(files, 10, replace=False)
  # print(randomFiles)
  random_file = None
  # this will return a random file within the specified genre
  # note that this will return the image's file id and not the actual link
  # need to manipulate the html and js to make it show the image's actual link/path
  if files:
    random_file = random.choice(files)
    print("the randomly selected file is: ", end=' ')
    print(random_file)
  return random_file.get("id")

if __name__ == "__main__":
  main()
  search_file()