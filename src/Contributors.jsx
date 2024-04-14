import { useQuery } from "react-query";
import { object } from "prop-types";
import { useEffect, useRef, useLayoutEffect } from "react";
import * as echarts from "echarts";

const Chart = ({ options = {} }) => {
  const chartRef = useRef();
  const echartRef = useRef();

  useLayoutEffect(() => {
    if (!echartRef.current) {
      echartRef.current = echarts.init(chartRef.current);
    }
  }, []);

  useEffect(() => {
    echartRef.current && echartRef.current.setOption(options);
  }, [options]);

  return (
    <div
      style={{
        width: "90vw",
        height: "90vh",
      }}
      ref={chartRef}
    ></div>
  );
};

Chart.propTypes = {
  options: object,
};

const fetchData = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/apache/echarts/contributors?v=${new Date().toISOString()}`
    );

    const data = await response.json();

    return {
      title: {
        text: "Echart Github contributions",
        subtext: "Data fetched in interval of 5mins",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: data?.map(({ login, contributions }) => ({
            name: login,
            value: contributions,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  } catch (error) {
    console.error(error);
  }
};

export const Contributors = () => {
  const { data } = useQuery({
    queryKey: "fetchContributors",
    queryFn: fetchData,
    refetchInterval: 300000,
  });

  return <Chart options={data} />;
};
