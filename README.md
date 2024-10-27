# AbstractOperatorsInterns

## Dev Setup
Run the following commands to get your local environment setup
```bash
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

Put your API key in a ```.env``` file in the form ```API_KEY = "your-api-key"```

## Install 7-Zip
Visit the [7-Zip official website](https://www.7-zip.org/) and select download for the correct Windows operating system to download the executable file on your computer. Run the executable file and install 7-Zip in the **C:\Program Files\7-Zip\\** folder. Select close once 7-Zip is done installing.
## Install FFmpeg
Visit the [FFmpeg download page](https://www.ffmpeg.org/download.html).
### Windows
Select **Windows builds from gyan.dev** and click on the latest full FFmpeg git master branch build to download FFmpeg. Next, right-click on the file, hover over **7-Zip**, and select extract here. Once the file is done extracting, rename the folder to **ffmpeg** and move the folder to the root of the **C:\\** drive.
#### Add FFmpeg to PATH
In the Windows Search Box, search **Edit the system environment variables** and open the option. Click on the **Advanced** tab and select **Environment Variables...**. Under **User Variables**, select **PATH** and click **Edit...**. In the new window, choose **New**, add **C:\ffmpeg\bin** to the new line and click **OK**.
#### Verify Installation
Open command prompt and run ```ffmpeg``` to confirm the correct version of FFmpeg is installed on your computer.

### Mac
#### Update Homebrew
Prior to installing FFmpeg, it is important to update and upgrade Homebrew on the computer by running
```bash
brew update
brew upgrade
```
#### Install FFmpeg
After Homebrew is ready, open the Terminal and install the latest version of FFmpeg by running ```brew install ffmpeg```.
#### Verify Installation
Verify installation by launching FFmpeg by running ```ffmpeg``` in the Terminal.
