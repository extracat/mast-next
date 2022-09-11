const env = process.env.NODE_ENV

const api = {
    telegram: "https://mast-api.vercel.app/api/telegram",
  }

if (env == "development"){

  api.telegram = "http://localhost:3000/api/telegram"  

} else if (env == "production") {
  
}

export default api