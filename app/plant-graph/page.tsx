import { Card } from "@/components/ui/card";
import Header from "../components/Header";
import { fetchWeatherApi } from "openmeteo";
import Graph from "../components/Graph";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PlantGraph({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const plant = (await searchParams)?.id
    ? await prisma.plant.findFirst({
        where: {
          id: {
            equals: parseInt((await searchParams)?.id as string),
          },
        },
        include: {
          location: true,
        },
      })
    : null;

  const params = {
    latitude: plant?.location.lat,
    longitude: plant?.location.long,
    hourly: "temperature_2m",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  // const timezone = response.timezone();
  // const timezoneAbbreviation = response.timezoneAbbreviation();
  // const latitude = response.latitude();
  // const longitude = response.longitude();

  const hourly = response.hourly()!;
  console.warn(hourly);

  const weatherData = {
    hourly: {
      time: [
        ...Array(
          (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval()
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
    },
  };

  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  const chartData = [];
  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    chartData.push({
      time: weatherData.hourly.time[i].toISOString(),
      temp: weatherData.hourly.temperature2m[i],
    });
    console.log(
      weatherData.hourly.time[i].toISOString(),
      weatherData.hourly.temperature2m[i]
    );
  }

  return (
    <div className="flex flex-col w-full h-full ">
      <Header></Header>
      <Card className="p-8 flex flex-col m-auto">
        <span className="font-bold text-xl">Humidity Graph</span>
        <Graph data={chartData}></Graph>
      </Card>
    </div>
  );
}
