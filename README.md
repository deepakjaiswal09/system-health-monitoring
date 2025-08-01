# 📊 Express.js + Prometheus + Grafana Monitoring Example (Dockerized)

This project demonstrates how to monitor an Express.js application using **Prometheus** for metrics collection and **Grafana** for visualization. The entire monitoring stack (Prometheus + Grafana) is **containerized with Docker** for easy deployment and portability.

<img width="1920" height="1080" alt="Screenshot (805)" src="https://github.com/user-attachments/assets/236b989a-5084-4872-b085-65fa9835b034" />


---

## 📚 Context

This project was developed as part of a group assignment under the **Database Management System (DBMS)** course. The assignment was allotted by the department, and I actively contributed to the design, development, monitoring, and containerization setup.

---

## 🚀 Features

- 🌐 Express server with `/` and `/slow` endpoints  
- 📈 `/metrics` endpoint instrumented with custom Prometheus histogram  
- 📊 Metrics visualized via Grafana dashboards  
- 🐳 Docker container to run Prometheus and Grafana stack locally  
- ⚙️ Default system metrics (CPU, memory, GC, etc.) from `prom-client`

---

## 📦 Installation

```bash
git clone https://github.com/deepakjaiswal09/express-prometheus-metrics.git
cd express-prometheus-metrics
npm install
```

---

## 🐳 Docker Setup

This project includes a `docker-compose.yml` file that provisions:

- **Prometheus** container to scrape metrics from the Express app  
- **Grafana** container to visualize metrics  
- Predefined dashboards and Prometheus config

```bash
docker-compose up -d
```

Access dashboards at:  
🔸 **Grafana**: [http://localhost:3000](http://localhost:3000) (default user/pass: `admin` / `admin`)  
🔸 **Prometheus**: [http://localhost:9090](http://localhost:9090)

---

## 🛠️ Start Express Server

In a separate terminal (after `npm install`):

```bash
node server.js
```

Your Express server will be available at:

```
http://localhost:8000/
```

---

## 🔗 Available Routes

| Route           | Description                         |
|----------------|-------------------------------------|
| `/`            | Simple GET response                 |
| `/slow`        | Simulates a delayed task            |
| `/metrics`     | Prometheus-compatible metrics       |

---

## 📈 Custom Metric: `http_express_req_res_time`

This custom histogram metric tracks request duration:

```text
# HELP http_express_req_res_time Time taken for HTTP requests in seconds
# TYPE http_express_req_res_time histogram
http_express_req_res_time_bucket{method="GET",route="/",status_code="200",le="0.05"} 1
...
```

### Labels:

- `method`: HTTP Method (e.g., GET, POST)
- `route`: Express route (e.g., `/`, `/slow`)
- `status_code`: HTTP response status (e.g., 200)

---

## 📊 Prometheus Configuration

Edit or use the default `prometheus.yml` file:

```yaml
scrape_configs:
  - job_name: 'express_app'
    static_configs:
      - targets: ['host.docker.internal:8000']
```

This config allows Prometheus (running inside Docker) to access the Express app on your host machine.

---

## 📉 Grafana Dashboard

Grafana is preconfigured to:

- Connect to Prometheus as a data source  
- Visualize histogram-based HTTP latency metrics  
- Display system metrics like memory, CPU, and garbage collection

> 📝 You can import custom dashboards or create your own using the Prometheus data source.

---

## 🧰 Built With

- [Express.js](https://expressjs.com/)  
- [prom-client](https://github.com/siimon/prom-client)  
- [Prometheus](https://prometheus.io/)  
- [Grafana](https://grafana.com/)  
- [Docker](https://www.docker.com/)  
- [Node.js](https://nodejs.org/)

---

## 👨‍💻 Author

**Deepak Jaiswal**  
🎓 Developed as part of a group DBMS project  
🔗 [GitHub](https://github.com/deepakjaiswal09)  
💼 [LinkedIn](https://linkedin.com/in/deepakjaiswal09)  
📧 Email: deepakjaiswal9238@gmail.com  

---

## 📄 License

This project is licensed under the MIT License.
