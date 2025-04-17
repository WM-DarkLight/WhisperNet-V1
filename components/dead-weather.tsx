"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, CloudSnow, CloudLightning, Sun, AlertTriangle, Wind, Thermometer } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

interface WeatherData {
  location: string
  currentTemp: string
  condition: string
  highTemp: string
  lowTemp: string
  precipitation: string
  humidity: string
  windSpeed: string
  airQuality: string
  signalStrength: string
  forecast: WeatherForecast[]
  alerts: WeatherAlert[]
  corrupted: boolean
}

interface WeatherForecast {
  day: string
  condition: string
  highTemp: string
  lowTemp: string
  precipitation: string
  corrupted: boolean
}

interface WeatherAlert {
  type: string
  description: string
  severity: string
  timestamp: string
  signalRelated: boolean
}

export default function DeadWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState("Sector 7")
  const [showAlerts, setShowAlerts] = useState(false)
  const [dataError, setDataError] = useState("")

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(
      () => {
        // Generate weather data
        const data = generateWeatherData()
        setWeatherData(data)
        setLoading(false)
      },
      Math.random() * 2000 + 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  // Generate procedural weather data
  const generateWeatherData = (): WeatherData => {
    // Generate current conditions
    const conditions = [
      "Clear",
      "Cloudy",
      "Rain",
      "Thunderstorm",
      "Snow",
      "Fog",
      "Signal Storm",
      "Data Precipitation",
      "Neural Fog",
    ]
    const condition = conditions[Math.floor(Math.random() * conditions.length)]

    // Generate temperatures
    const currentTemp = `${Math.floor(Math.random() * 40) - 10}°C`
    const highTemp = `${Math.floor(Math.random() * 15) + 15}°C`
    const lowTemp = `${Math.floor(Math.random() * 15) - 5}°C`

    // Generate other metrics
    const precipitation = `${Math.floor(Math.random() * 100)}%`
    const humidity = `${Math.floor(Math.random() * 100)}%`
    const windSpeed = `${Math.floor(Math.random() * 50)} km/h`

    // Generate air quality
    const airQualities = ["Good", "Moderate", "Poor", "Hazardous", "Signal Contaminated"]
    const airQuality = airQualities[Math.floor(Math.random() * airQualities.length)]

    // Generate signal strength
    const signalStrength = `${Math.floor(Math.random() * 100)}%`

    // Generate forecast
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const forecast: WeatherForecast[] = []

    for (let i = 0; i < 7; i++) {
      forecast.push({
        day: days[i],
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        highTemp: `${Math.floor(Math.random() * 15) + 15}°C`,
        lowTemp: `${Math.floor(Math.random() * 15) - 5}°C`,
        precipitation: `${Math.floor(Math.random() * 100)}%`,
        corrupted: Math.random() > 0.8,
      })
    }

    // Generate alerts
    const alertTypes = [
      "Severe Weather Warning",
      "Signal Storm Alert",
      "Neural Interference Warning",
      "Data Precipitation Advisory",
      "Signal Strength Fluctuation",
      "Consciousness Transfer Disruption",
      "Memory Corruption Risk",
      "Signal Tower Malfunction",
      "Analog Weather Anomaly",
    ]

    const alertDescriptions = [
      "Heavy Signal Storm expected in your sector. Neural interference likely. Secure your neural interface.",
      "Data precipitation levels exceeding safe thresholds. Potential for memory corruption during outdoor exposure.",
      "Signal strength fluctuations detected. Consciousness transfers not recommended for the next 48 hours.",
      "Neural fog reducing visibility and Signal clarity. Avoid complex neural operations until conditions improve.",
      "Signal Tower 7-B experiencing maintenance issues. Reduced Signal coverage in eastern quadrant of your sector.",
      "Unusual analog weather patterns detected. Report any unauthorized analog phenomena to Signal Authority.",
      "Memory corruption risk elevated due to atmospheric Signal interference. Backup recommended.",
      "Consciousness transfer disruptions reported due to electromagnetic anomalies. Defer transfers if possible.",
      "Signal Authority weather control systems experiencing temporary malfunction. Expect unpredictable conditions.",
    ]

    const alertSeverities = ["Low", "Moderate", "High", "Critical", "Signal Authority Mandate"]

    const alerts: WeatherAlert[] = []
    const numAlerts = Math.floor(Math.random() * 3) + 1

    for (let i = 0; i < numAlerts; i++) {
      const alertTypeIndex = Math.floor(Math.random() * alertTypes.length)

      alerts.push({
        type: alertTypes[alertTypeIndex],
        description: alertDescriptions[alertTypeIndex],
        severity: alertSeverities[Math.floor(Math.random() * alertSeverities.length)],
        timestamp: "2041-06-30 08:15",
        signalRelated: alertTypes[alertTypeIndex].includes("Signal") || Math.random() > 0.5,
      })
    }

    return {
      location: selectedLocation,
      currentTemp,
      condition,
      highTemp,
      lowTemp,
      precipitation,
      humidity,
      windSpeed,
      airQuality,
      signalStrength,
      forecast,
      alerts,
      corrupted: Math.random() > 0.8,
    }
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value)
    setLoading(true)

    // Simulate loading delay for new location
    setTimeout(
      () => {
        if (Math.random() > 0.7) {
          setDataError("ERROR: Weather data for this sector is corrupted or unavailable.")
          setWeatherData(null)
          setLoading(false)

          // Clear error after some time
          setTimeout(() => setDataError(""), 3000)
        } else {
          const data = generateWeatherData()
          setWeatherData(data)
          setLoading(false)
        }
      },
      Math.random() * 2000 + 1000,
    )
  }

  const toggleAlerts = () => {
    setShowAlerts(!showAlerts)
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun size={24} />
      case "cloudy":
        return <Cloud size={24} />
      case "rain":
      case "data precipitation":
        return <CloudRain size={24} />
      case "snow":
        return <CloudSnow size={24} />
      case "thunderstorm":
      case "signal storm":
        return <CloudLightning size={24} />
      default:
        return <Cloud size={24} />
    }
  }

  if (loading) {
    return (
      <div className="weather-system">
        <GlitchEffect>
          <h2 className="section-title">ATMOSPHERIC CONDITIONS</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">RETRIEVING ATMOSPHERIC DATA...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="weather-system">
      <GlitchEffect>
        <h2 className="section-title">ATMOSPHERIC CONDITIONS</h2>
      </GlitchEffect>

      <div className="weather-interface">
        <div className="weather-controls">
          <div className="location-selector">
            <label htmlFor="location">Location:</label>
            <select id="location" value={selectedLocation} onChange={handleLocationChange}>
              <option value="Sector 7">Sector 7</option>
              <option value="Sector 12">Sector 12</option>
              <option value="Sector 19">Sector 19</option>
              <option value="Central Hub">Central Hub</option>
              <option value="Signal Tower Alpha">Signal Tower Alpha</option>
              <option value="Quarantine Zone">Quarantine Zone</option>
              <option value="Analog Ruins">Analog Ruins</option>
            </select>
          </div>

          <button className={`alerts-toggle ${showAlerts ? "active" : ""}`} onClick={toggleAlerts}>
            <AlertTriangle size={16} />
            <span>Alerts ({weatherData?.alerts.length || 0})</span>
          </button>
        </div>

        {dataError ? (
          <div className="weather-error corrupted">
            <AlertTriangle size={24} />
            <span>{dataError}</span>
          </div>
        ) : weatherData ? (
          <>
            <div className="current-conditions">
              <div className="condition-main">
                <div className="condition-icon">
                  {weatherData.corrupted ? (
                    <AlertTriangle size={48} className="corrupted" />
                  ) : (
                    getWeatherIcon(weatherData.condition)
                  )}
                </div>
                <div className="condition-temp">
                  <span className="current-temp">{weatherData.currentTemp}</span>
                  <span className="condition-name">{weatherData.condition}</span>
                </div>
              </div>

              <div className="condition-details">
                <div className="detail-item">
                  <Thermometer size={16} />
                  <span className="detail-label">High/Low:</span>
                  <span className="detail-value">
                    {weatherData.highTemp} / {weatherData.lowTemp}
                  </span>
                </div>
                <div className="detail-item">
                  <CloudRain size={16} />
                  <span className="detail-label">Precipitation:</span>
                  <span className="detail-value">{weatherData.precipitation}</span>
                </div>
                <div className="detail-item">
                  <Wind size={16} />
                  <span className="detail-label">Wind:</span>
                  <span className="detail-value">{weatherData.windSpeed}</span>
                </div>
                <div className="detail-item signal-detail">
                  <AlertTriangle size={16} />
                  <span className="detail-label">Signal Strength:</span>
                  <span className="detail-value">{weatherData.signalStrength}</span>
                </div>
              </div>
            </div>

            {showAlerts && weatherData.alerts.length > 0 && (
              <div className="weather-alerts">
                <h3 className="alerts-title">Current Alerts</h3>
                <div className="alerts-list">
                  {weatherData.alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`alert-item ${alert.signalRelated ? "signal-related" : ""} severity-${alert.severity.toLowerCase().replace(" ", "-")}`}
                    >
                      <div className="alert-header">
                        <span className="alert-type">{alert.type}</span>
                        <span className="alert-severity">{alert.severity}</span>
                      </div>
                      <p className="alert-description">{alert.description}</p>
                      <span className="alert-timestamp">{alert.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="weather-forecast">
              <h3 className="forecast-title">7-Day Forecast</h3>
              <div className="forecast-items">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className={`forecast-day ${day.corrupted ? "corrupted" : ""}`}>
                    <span className="forecast-day-name">{day.day}</span>
                    <div className="forecast-icon">
                      {day.corrupted ? (
                        <AlertTriangle size={20} className="corrupted" />
                      ) : (
                        getWeatherIcon(day.condition)
                      )}
                    </div>
                    <div className="forecast-temps">
                      <span className="forecast-high">{day.highTemp}</span>
                      <span className="forecast-low">{day.lowTemp}</span>
                    </div>
                    <span className="forecast-condition">{day.condition}</span>
                    <span className="forecast-precip">{day.precipitation}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}

        <div className="weather-footer">
          <p className="data-source">Data Source: Signal Authority Atmospheric Control System</p>
          <p className="data-timestamp">Last Updated: 15,341 days ago</p>
          <p className="signal-notice corrupted">
            Weather conditions are regulated by Signal Authority for optimal Signal transmission.
          </p>
        </div>
      </div>
    </div>
  )
}
