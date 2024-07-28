import React, { useEffect, useState, useRef } from 'react';

const PlotlyChart = () => {
  const [chartHtml, setChartHtml] = useState('');
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('/file.html')
      .then(response => response.text())
      .then(html => {
        setChartHtml(html);
        // After setting the HTML, we need to execute any scripts
        setTimeout(() => {
          const scripts = chartRef.current.getElementsByTagName('script');
          for (let script of scripts) {
            eval(script.innerHTML);
          }
        }, 0);
      })
      .catch(error => console.error('Error loading chart:', error));
  }, []);

  return (
    <div ref={chartRef} dangerouslySetInnerHTML={{ __html: chartHtml }} />
  );
};

export default PlotlyChart;