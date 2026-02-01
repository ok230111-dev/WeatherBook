from flask import Flask, render_template, request, redirect, url_for
import requests
from datetime import datetime

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # Вимкнення кешу для тестування

# Ваш API-ключ із OpenWeatherMap
API_KEY = "1c022db9e06feb0a70856b7a92165b59"

@app.route('/', methods=['GET', 'POST'])
def find_weather():
    error = None

    if request.method == 'POST':
        city = request.form.get('city', '').strip()

        if not city:
            error = "Please, write the name of the city!"
        elif not city.isalpha():
            error = "City name should contain only letters!"
        else:
            return redirect(url_for('weather', city=city))

    return render_template('find_weather.html', error=error)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/other_sites')
def other_sites():
    return render_template('other_sites.html')

# @app.route('/')
# def index():
#     return render_template('index.html')      

@app.route('/forecast', methods=['GET', 'POST'])
def forecast():
    return render_template('forecast.html')

@app.route('/weather-of-city', methods=['GET', 'POST'])
def weather():
    weather_data = None
    forecast_data = []
    error = None

    if request.method == 'POST':
        city = request.form.get('city', '').strip()
    else:
        city = request.args.get('city', '').strip()

    if not city:
        error = "Please, write the name of the city!"
    else:
        # Поточна погода
        try:
            url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&lang=en&appid={API_KEY}"
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()

            weather_data = {
                "date": datetime.utcfromtimestamp(data["dt"]).strftime('%d.%m.%Y'),
                "city": data["name"],
                "country": data["sys"]["country"],  # Просто код країни
                "temperature": round(data["main"]["temp"]),
                "feels_like": round(data["main"]["feels_like"]),
                "description": data["weather"][0]["description"],
                "humidity": data["main"]["humidity"],
                "wind_speed": round(data["wind"]["speed"])
            }

        except requests.exceptions.RequestException:
            error = f"We didn't find the city: {city}"

        # Прогноз
        try:
            forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&appid={API_KEY}"
            forecast_response = requests.get(forecast_url)
            forecast_response.raise_for_status()
            forecast_json = forecast_response.json()

            forecast_days = set()

            for entry in forecast_json["list"]:
                date_obj = datetime.strptime(entry["dt_txt"], "%Y-%m-%d %H:%M:%S")
                date_str = date_obj.strftime("%d-%m-%Y")
                day_of_week = date_obj.strftime("%A")

                if date_str not in forecast_days:
                    forecast_days.add(date_str)

                    forecast_data.append({
                        "city": forecast_json["city"]["name"],
                        "country": forecast_json["city"]["country"],  # Просто код країни
                        "date": date_str,
                        "day": day_of_week,
                        "temperature": round(entry["main"].get("temp", 0)),
                        "description": entry["weather"][0]["description"] if "weather" in entry and entry["weather"] else "No description",
                        "humidity": entry["main"].get("humidity", 0),
                        "wind_speed": round(entry["wind"].get("speed", 0))
                    })
        except:
            forecast_data = []

    return render_template('weather-of-city.html', weather_data=weather_data, error=error, forecast_data=forecast_data)

if __name__ == '__main__':
    app.run(debug=True)