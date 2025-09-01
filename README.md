# cryptoCurrency dashboard

**cryptoCurrency dashboard** is a simple web application build using react vite. This guide will help you set up and run the application locally

---

## 🚀 Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [pnpm](https://pnpm.io) _(optional — alternative to npm)_

---

## 🛠️ Setup

1. **Clone the repository** and navigate into the project directory:
    ```bash
    git clone <repository-url>
    cd Cryptocurrency-Dashboard
    ```
2. Install dependencies using your preferred package manager:

```
npm install
# or
pnpm install
```

# env variable

create a .env file outside the src folder
with in add the following

`VITE_COINGECKO= https://api.coingecko.com/api/v3/`
and as for the `VITE_APIKEY` you will need to get it from [coingeko](https://docs.coingecko.com/reference/setting-up-your-api-key) they will provide you with instruction on how to create an API ket

## ▶️ Running the Application

```bash
npm run dev
# or
pnpm run dev
```
