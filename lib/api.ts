const env = process.env.NODE_ENV

const api = {
    telegram: "https://astro-data-api.vercel.app/api/v1/telegram",
  }

if (env == "development"){

  api.telegram = "http://localhost:3000/api/v1/telegram"  

} else if (env == "production") {
  
}

export default api