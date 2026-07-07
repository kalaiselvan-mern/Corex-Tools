# CoreX Tools 🚀

CoreX Tools is a high-performance, multi-utility web application crafted by Kalai Creative Studio. It provides seamless tools for everyday digital tasks, built with a modern frontend and a scalable, dual-backend microservice architecture.

## ✨ Features

* **📱 QR Code Generator:** Instantly convert any URL, text, or link into a high-quality, downloadable QR code.
* **✂️ AI Background Remover:** A powerful AI-driven tool to remove backgrounds from images flawlessly in seconds.
* **🎥 Media Downloader:** Extract and download media content quickly and securely.

## 🏗️ Architecture & Tech Stack

To ensure maximum uptime and prevent Out-Of-Memory (OOM) crashes, this project implements a smart microservice architecture, splitting lightweight tasks from heavy AI workloads.

**1. Frontend (Client-Side)**
* **Tech:** React.js (Vite), Tailwind CSS
* **Hosting:** Vercel

**2. Primary Backend (Lightweight Microservice)**
* **Tech:** FastAPI (Python), `qrcode`, `yt-dlp`
* **Hosting:** Render
* **Role:** Handles standard API requests like QR code generation and media fetching.

**3. AI Backend (Heavy Workload Microservice)**
* **Tech:** FastAPI, Docker, `rembg`, `onnxruntime`
* **Hosting:** Hugging Face Spaces (16GB RAM Environment)
* **Role:** Dedicated exclusively to processing the Machine Learning/AI Background Removal tasks to ensure speed and prevent server overload.

## ⚙️ Environment Variables

To run this project locally, create a `.env` file in the root of your frontend directory and add your respective backend URLs:

```env
# Primary backend for standard tools
VITE_API_BASE_URL=[https://corex-tools.onrender.com](https://corex-tools.onrender.com)

# Dedicated AI backend for background removal
VITE_BG_API_URL=[https://kalai-dev-corex-tools.hf.space](https://kalai-dev-corex-tools.hf.space)