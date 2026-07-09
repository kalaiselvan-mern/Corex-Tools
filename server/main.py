from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import Response, FileResponse
from fastapi.middleware.cors import CORSMiddleware 
import qrcode
import io
from rembg import remove
import yt_dlp


app = FastAPI(
    title="All In One Tools",
    description="Kalai Creative studio provides a variety of tools to help you create stunning visuals and designs. Whether you're a beginner or an experienced artist, we have the tools you need to bring your vision to life.",
    version="1.0"
)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. QR Code Generator API
@app.get("/api/qr")
def generate_qr(url: str):
    qr = qrcode.make(url)
    buf = io.BytesIO()
    qr.save(buf, format="PNG")
    return Response(content=buf.getvalue(), media_type="image/png")


# 2. YT Downloader API
@app.get("/api/video-dl")
def download_yt(url: str):
    try:
        file_name = "yt_video.mp4" 
        ydl_opts = {
            'format': 'best',
            'outtmpl': file_name,
            'cookiesfrombrowser': ('chrome',), 
        }   
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.extract_info(url, download=True)         
        
        return FileResponse(path=file_name, filename="corex_video.mp4", media_type='video/mp4')
        
    except Exception as e:
        return {"success": False, "error": str(e)}
  